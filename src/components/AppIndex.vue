<script setup>
import { ref, shallowRef, watch, computed } from 'vue';
import SVGIconButton from './elements/SVGIconButton.vue';
import delete_icon from './elements/icons/delete_icon.vue';
import InputLabel from './elements/InputLabel.vue';
import TextInput from './elements/TextInput.vue';
import { parseRequestBody, parseResponseBody } from '@/assets/osUtility';
import {  actionList } from '@/assets/osActionsData';
import ToggleLightDarkMode from './elements/ToggleLightDarkMode.vue';
// Codemirror imports
import { Codemirror } from 'vue-codemirror';
import { json } from '@codemirror/lang-json';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorView } from 'codemirror';

const extensions = [json(), oneDark, EditorView.lineWrapping];

// Codemirror EditorView instance ref
const view = shallowRef();
const handleReady = (payload) => {
    view.value = payload.view;
};

const displayDetails = ref(false);
const requests = ref([]);
const selectedRequestDetails = ref({
    input: "No Input",
    IPResult: "No IPResult",
});

watch(requests, (newRequests) => {
    if (newRequests.length === 1) {
        showRequestDetails(newRequests[0].id);
    }
}, { deep: true });

const selectedRequestId = ref(null);

const addRequestToList = (request) => {
    try {
        const extractedRequestValues = parseRequestBody(request);
        if (!extractedRequestValues) return;

        const isAllowedAction = actionList.some(allowedAction =>
            extractedRequestValues.sClassName.includes(allowedAction)
        );

        if (isAllowedAction) {
            const requestId = requests.value.length;
            requests.value.push({
                id: requestId,
                details: {
                    ...extractedRequestValues,
                    extractedResponseValues: {},
                },
                rawRequest: request,
            });
        }
    } catch (err) {
        alert(JSON.stringify(err));
    }
};

const showRequestDetails = (requestId) => {
    selectedRequestId.value = requestId;
    const request = requests.value.find((req) => req.id === requestId);
    if (!request) return;

    try {
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
};

const searchQuery = ref('');
const selectedFilterAction = ref('All');

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

const clearRequests = () => {
    displayDetails.value = false;
    requests.value = [];
    selectedRequestDetails.value = {
        input: "No Input",
        IPResult: "No IPResult",
    };
};

// Listen to Chrome DevTools Network events
/* eslint-disable */
chrome.devtools.network.onRequestFinished.addListener(addRequestToList);
</script>

<template>
    <!-- <ToggleLightDarkMode /> -->
    <div class="h-screen flex flex-col dark:bg-gray-800">
        <div class="p-2 bg-gray-100 border-b dark:border-gray-700 flex space-x-4 items-center dark:bg-gray-800">
            <TextInput v-model="searchQuery" placeholder="Search by Action or Element"
                class="text-xs w-48 !py-1.5 text-gray-700 ml-2" />
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
