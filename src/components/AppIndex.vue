<script setup>
import { ref, shallowRef, watch } from 'vue';
import SVGIconButton from './elements/SVGIconButton.vue';
import delete_icon from './elements/icons/delete_icon.vue';
import InputLabel from './elements/InputLabel.vue';
import { getActionData, actionList } from '@/assets/osActionsData';
//codemirror start
import { Codemirror } from 'vue-codemirror';
import { json } from '@codemirror/lang-json';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorView } from 'codemirror';
const extensions = [json(), oneDark, EditorView.lineWrapping];
// Codemirror EditorView instance ref
const view = shallowRef()
const handleReady = (payload) => {
    view.value = payload.view
}
//codemirror end
const displayDetails = ref(false);
const requests = ref([]); // Reactive state for requests
const selectedRequestDetails = ref({
    input: "No Input",
    IPResult: "No IPResult",
}); // Reactive state for details view

// Watch for changes in requests array
watch(requests, (newRequests) => {
    // If this is the first request being added, show its details
    if (newRequests.length === 1) {
        showRequestDetails(newRequests[0].id);
    }
}, { deep: true });

/**
 * Add a new request to the list.
 * @param {object} request - Network request object.
 */
const addRequestToList = (request) => {
    try {
        const extractedRequestValues = parseRequestBody(request);
        if (!extractedRequestValues) {
            return;
        }
        // Check if the request's sClassName is in the actionList
        const isAllowedAction = actionList.some(allowedAction =>
            extractedRequestValues.sClassName.includes(allowedAction)
        );
        // Only add the request if it matches an allowed action
        if (isAllowedAction) {
            const requestId = requests.value.length; // Use index as ID
            const extractedResponseValues = {};

            requests.value.push({
                id: requestId,
                details: {
                    ...extractedRequestValues,
                    extractedResponseValues,
                },
                rawRequest: request,
            });
        }
    }
    catch (err) {
        alert(JSON.stringify(err));
    }
}

/**
 * Display details for a selected request.
 * @param {number} requestId - Index of the selected request.
 */
const showRequestDetails = (requestId) => {
    const request = requests.value.find((req) => req.id === requestId);
    if (!request) return;

    try {
        // Parse response body asynchronously
        request.rawRequest.getContent((responseBody) => {
            if (responseBody) {
                const responseValues = parseResponseBody(responseBody);
                displayDetails.value = true;
                selectedRequestDetails.value = {
                    input: request.details.input || "No Input",
                    IPResult: responseValues.IPResult || "No IPResult",
                };
            }
        });
    } catch (error) {
        selectedRequestDetails.value = {
            input: "Error loading details",
            IPResult: error.message || "No IPResult",
        };
    }
}

/**
 * Clear all requests and reset the details view.
 */
const clearRequests = () => {
    displayDetails.value = false;
    requests.value = [];
    selectedRequestDetails.value = {
        input: "No Input",
        IPResult: "No IPResult",
    };
}

/**
 * Parse the request body to extract relevant details.
 * @param {object} request - Network request object.
 * @returns {object} Extracted values.
 */
const parseRequestBody = (request) => {
    try {
        const requestBody = request?.request?.postData?.text || null;
        if (!requestBody) return null;

        const messageNode = parseMessageNode(requestBody);
        return extractRequestValues(messageNode);
    } catch (error) {
        console.error("Error extracting request details:", error);
        return { input: "Error parsing request", sClassName: "N/A", sMethodName: "N/A" };
    }
}

/**
 * Decode and parse form data payload to extract the `message` node as JSON.
 */
const parseMessageNode = (formData) => {
    try {
        const params = new URLSearchParams(decodeURIComponent(formData));

        const messageNode = params.get("message");

        if (!messageNode) {
            return;
        }
        return messageNode ? JSON?.parse(messageNode) : null;
    } catch (error) {
        console.error("Error parsing message node:", error);
        console.log('Mostly if message item is not JSON then you can expect this, can be ignord.');
        return null;
    }
}

/**
 * Extract relevant values from the parsed message node.
 */
const extractRequestValues = (messageNode) => {
    if (!messageNode || !messageNode.actions?.length) {
        return { input: "N/A", sClassName: "N/A", sMethodName: "N/A" };
    }

    const action = messageNode.actions[0];
    const params = action.params?.params || {};
    const actionItem = getActionData(params.sClassName);
    return {
        input: params.input || "N/A",
        sClassName: actionItem.actionLabel || "N/A",
        sMethodName: params.sMethodName || "N/A",
    };
}

/**
 * Parse the response body and extract values.
 */
const parseResponseBody = (responseBody) => {
    try {
        const parsedResponse = JSON.parse(responseBody);
        const actions = parsedResponse.actions || [];
        if (!actions.length) return { IPResult: "No IPResult found", error: "No error" };

        const returnValue = actions[0].returnValue || {};
        const parsedReturnValue = returnValue.returnValue
            ? JSON.parse(returnValue.returnValue)
            : {};
        return {
            IPResult: JSON.stringify(parsedReturnValue.IPResult || "No IPResult found", null, 2),
            error: parsedReturnValue.error || "No error",
        };
    } catch (error) {
        console.error("Error parsing response body:", error);
        return { IPResult: "Error parsing response body", error: "No error" };
    }
}

// Listen to Chrome DevTools Network events
/* eslint-disable */
chrome.devtools.network.onRequestFinished.addListener(addRequestToList);
</script>

<template>

    <div class="h-screen flex flex-col">
        <!-- Clear Requests Button -->
        <div class="p-1 bg-gray-100 border-b">
            <SVGIconButton @click="clearRequests" :icon="delete_icon" :isSquare="false" color="red"
                title="Clear All Requests" class="mr-2" />
        </div>

        <!-- Main Content -->
        <div class="flex flex-grow overflow-hidden" v-if="requests.length > 0">
            <!-- Request List -->
            <div class="w-1/4 border-r bg-gray-50 overflow-auto">
                <ul class="p-4 space-y-2">
                    <li v-for="request in requests" :key="request.id"
                        class="p-2 border bg-white rounded shadow-sm hover:bg-gray-100 cursor-pointer"
                        @click="showRequestDetails(request.id)">
                        Action : {{ request.details.sClassName || "N/A" }} <br>
                        Element : {{ request.details.sMethodName || "N/A" }}
                    </li>
                </ul>
            </div>

            <!-- Details Section -->
            <div class="w-3/4 p-4 overflow-auto" v-if="displayDetails">
                <div class="mb-4">
                    <InputLabel>Input :</InputLabel>
                    <codemirror v-model="selectedRequestDetails.input" placeholder="Your data will appear here"
                        :style="{ height: '100px', borderRadius: '5px', overflow: 'hidden', marginTop: '7px' }"
                        :autofocus="true" :indent-with-tab="true" :tab-size="2" :extensions="extensions"
                        @ready="handleReady" />
                </div>
                <div>
                    <InputLabel>Output :</InputLabel>
                    <codemirror v-model="selectedRequestDetails.IPResult" placeholder="Your data will appear here"
                        :style="{ height: '100px', borderRadius: '5px', overflow: 'hidden', marginTop: '7px' }"
                        :autofocus="true" :indent-with-tab="true" :tab-size="2" :extensions="extensions"
                        @ready="handleReady" />
                </div>
            </div>
        </div>
        <div class="p-4 space-y-2" v-else>
            <p>No requests found.</p>
        </div>
    </div>
</template>
