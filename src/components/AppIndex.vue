<script setup>
import { ref, shallowRef, watch, computed } from 'vue';
import SVGIconButton from './elements/SVGIconButton.vue';
import delete_icon from './elements/icons/delete_icon.vue';
import InputLabel from './elements/InputLabel.vue';
import TextInput from './elements/TextInput.vue';
import { getActionData, actionList } from '@/assets/osActionsData';
import ToggleLightDarkMode from './elements/ToggleLightDarkMode.vue';
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

//vars
const selectedRequestId = ref(null);

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
    selectedRequestId.value = requestId; // Set the selected request ID
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
                    elementName: request.details.sMethodName,
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

// Search and filter state
const searchQuery = ref('');
const selectedFilterAction = ref('All');

// Filtered and searched requests
const filteredRequests = computed(() => {
    return requests.value.filter(request => {
        const matchesSearch =
            request.details.sClassName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            request.details.sMethodName.toLowerCase().includes(searchQuery.value.toLowerCase());
        const matchesFilter =
            selectedFilterAction.value === 'All' ||
            request.details.sClassName === selectedFilterAction.value;

        return matchesSearch && matchesFilter;
    });
});

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
    const beautifiedInput = JSON.stringify(JSON.parse(params.input), null, 4);
    return {
        input: beautifiedInput || "N/A",
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
            IPResult: JSON.stringify(parsedReturnValue.IPResult || "No IPResult found", null, 2), // do this only for IP
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
    <!-- <ToggleLightDarkMode /> -->
    <div class="h-screen flex flex-col dark:bg-gray-800">
        <div class="p-2 bg-gray-100 border-b dark:border-gray-700 flex space-x-4 items-center dark:bg-gray-800">
            <TextInput v-model="searchQuery" placeholder="Search by Action or Element"
                class="text-xs w-48 !py-1.5 text-gray-700" />
            <select v-model="selectedFilterAction"
                class="text-xs py-1.5 px-2 block w-48 text-gray-700 border border-gray-300 shadow-sm rounded-md focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400 dark:placeholder-gray-500 dark:focus:ring-gray-600 outline-indigo-500 dark:outline-none">
                <option value="All">All Actions</option>
                <option v-for="action in [...new Set(requests.map(req => req.details.sClassName))]" :key="action"
                    :value="action">
                    {{ action }}
                </option>
            </select>
            <SVGIconButton @click="clearRequests" :icon="delete_icon" :isSquare="false" color="red"
                title="Clear All Requests" class="mr-2" />
        </div>

        <!-- Main Content -->
        <div class="flex flex-grow overflow-hidden dark:bg-gray-800" v-if="requests.length > 0">
            <!-- Request List -->
            <div class="w-1/4 border-r dark:border-gray-700 bg-gray-50 overflow-auto dark:bg-gray-800">
                <ul class="p-4 space-y-2">
                    <li v-for="request in filteredRequests" :key="request.id"
                        class="p-2 border rounded shadow-sm cursor-pointer text-gray-800 dark:text-gray-400 dark:border-gray-700 "
                        :class="{ 'bg-blue-300 dark:bg-gray-900 dark:border-gray-700 dark:shadow-lg': selectedRequestId === request.id, 'bg-white dark:bg-gray-700 dark:border-gray-600': selectedRequestId != request.id }"
                        @click="showRequestDetails(request.id)">
                        Action : {{ request.details.sClassName || "N/A" }} <br>
                        Element : {{ request.details.sMethodName || "N/A" }}
                    </li>
                </ul>
            </div>

            <!-- Details Section -->
            <div class="w-3/4 p-4 overflow-auto" v-if="displayDetails">
                <InputLabel>Element : {{ selectedRequestDetails.elementName }}</InputLabel>
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
            <InputLabel>No requests found.</InputLabel>
        </div>
    </div>
</template>
