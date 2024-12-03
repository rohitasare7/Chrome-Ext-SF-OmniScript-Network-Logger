<script setup>
import { ref } from 'vue';
import TextDesc from './elements/TextDesc.vue';

const requests = ref([]); // Reactive state for requests
const selectedRequestDetails = ref({
    input: "No Input",
    IPResult: "No IPResult",
}); // Reactive state for details view

/**
 * Add a new request to the list.
 * @param {object} request - Network request object.
 */
function addRequestToList(request) {
    const requestId = requests.value.length; // Use index as ID
    const extractedRequestValues = parseRequestBody(request);
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

/**
 * Display details for a selected request.
 * @param {number} requestId - Index of the selected request.
 */
function showRequestDetails(requestId) {
    const request = requests.value.find((req) => req.id === requestId);
    if (!request) return;

    try {
        // Parse response body asynchronously
        request.rawRequest.getContent((responseBody) => {
            if (responseBody) {
                const responseValues = parseResponseBody(responseBody);
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
function clearRequests() {
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
function parseRequestBody(request) {
    try {
        const requestBody = request.request?.postData?.text || null;
        if (!requestBody) return { input: "No Body", sClassName: "N/A", sMethodName: "N/A" };

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
function parseMessageNode(formData) {
    try {
        const params = new URLSearchParams(decodeURIComponent(formData));
        const messageNode = params.get("message");
        return messageNode ? JSON.parse(messageNode) : null;
    } catch (error) {
        console.error("Error parsing message node:", error);
        return null;
    }
}

/**
 * Extract relevant values from the parsed message node.
 */
function extractRequestValues(messageNode) {
    if (!messageNode || !messageNode.actions?.length) {
        return { input: "N/A", sClassName: "N/A", sMethodName: "N/A" };
    }

    const action = messageNode.actions[0];
    const params = action.params?.params || {};
    return {
        input: params.input || "N/A",
        sClassName: params.sClassName || "N/A",
        sMethodName: params.sMethodName || "N/A",
    };
}

/**
 * Parse the response body and extract values.
 */
function parseResponseBody(responseBody) {
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
        <div class="p-4 bg-gray-100 border-b">
            <button @click="clearRequests" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                Clear Requests
            </button>
        </div>

        <!-- Main Content -->
        <div class="flex flex-grow overflow-hidden">
            <!-- Request List -->
            <div class="w-1/3 border-r bg-gray-50 overflow-auto">
                <ul class="p-4 space-y-2">
                    <li v-for="request in requests" :key="request.id"
                        class="p-2 border bg-white rounded shadow-sm hover:bg-gray-100 cursor-pointer"
                        @click="showRequestDetails(request.id)">
                        sClassName: {{ request.details.sClassName || "N/A" }} <br>
                        sMethodName: {{ request.details.sMethodName || "N/A" }}
                    </li>
                </ul>
            </div>

            <!-- Details Section -->
            <div class="w-2/3 p-4 overflow-auto">
                <div class="mb-4">
                    <h3 class="font-bold text-xl mb-2">Input:</h3>
                    <textarea class="w-full border p-2 rounded resize-none bg-gray-100" rows="6" readonly>
  {{ selectedRequestDetails.input }}
            </textarea>
                </div>
                <div>
                    <h3 class="font-bold text-xl mb-2">IPResult:</h3>
                    <textarea class="w-full border p-2 rounded resize-none bg-gray-100" rows="6" readonly>
  {{ selectedRequestDetails.IPResult }}
            </textarea>
                </div>
            </div>
        </div>
    </div>
</template>
