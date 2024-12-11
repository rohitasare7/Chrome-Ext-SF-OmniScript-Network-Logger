<script setup>
import { ref, shallowRef, watch, computed } from 'vue';
import SVGIconButton from './elements/SVGIconButton.vue';
import delete_icon from './elements/icons/delete_icon.vue';
import InputLabel from './elements/InputLabel.vue';
import TextInput from './elements/TextInput.vue';
import CopyButton from './elements/CopyButton.vue';
import ToastList from './elements/ToastList.vue';
import { NetworkParser } from '@/assets/util/parser';
import { ActionExtractor } from '@/assets/util/actionExtractor';
import { ACTION_TYPES, IGNORED_ACTIONS } from '@/assets/util/constants';
import ToggleLightDarkMode from './elements/ToggleLightDarkMode.vue';
// Codemirror imports
import { Codemirror } from 'vue-codemirror';
import { json } from '@codemirror/lang-json';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorView } from 'codemirror';

const extensions = [json(), oneDark, EditorView.lineWrapping];

// Codemirror EditorView instance ref
const view = shallowRef();
const requests = ref([]);
const selectedRequestId = ref(null);
const displayDetails = ref(false);
const searchQuery = ref('');
const selectedFilterAction = ref('All');

const selectedRequestDetails = ref({
  input: "No Input",
  IPResult: "No IPResult"
});

const handleReady = (payload) => {
  view.value = payload.view;
};

watch(requests, (newRequests) => {
  if (newRequests.length === 1) {
    showRequestDetails(newRequests[0].id);
  }
}, { deep: true });

const addRequestToList = (request) => {
  try {
    const requestBody = request?.request?.postData?.text;
    if (!requestBody) return;

    const messageNode = NetworkParser.parseMessageNode(requestBody);
    if (!messageNode?.actions?.length) return;

    messageNode.actions.forEach((action, index) => {
      const extractedValues = ActionExtractor.extractActionDetails(action);
      
      // Allow only specific actions
      if (!extractedValues || !extractedValues?.className) return;
      if (!Object.values(ACTION_TYPES).includes(extractedValues?.className)) return;
      
      console.log(`extractedValues [${index}] --> ` + JSON.stringify(extractedValues));
      
      const requestId = requests.value.length;
      requests.value.push({
        id: requestId,
        details: {
          ...extractedValues,
          extractedResponseValues: {}
        },
        rawRequest: request
      });
    });
  } catch (error) {
    console.error('Failed to add request:', error);
  }
};


const showRequestDetails = async (requestId) => {
  selectedRequestId.value = requestId;
  const request = requests.value.find(req => req.id === requestId);
  if (!request) return;

  try {
    const responseBody = await new Promise((resolve) => {
      request.rawRequest.getContent(resolve);
    });
    
    if (responseBody) {
      const parsedResponse = NetworkParser.safeParseJSON(responseBody);
      console.log('parsedResponse.actions --> '+JSON.stringify(parsedResponse.actions));
      const returnValue = parsedResponse.actions?.[0]?.returnValue;
      const parsedReturnValue = returnValue?.returnValue ?
      NetworkParser.safeParseJSON(returnValue.returnValue) : {};
      
      const IPResult = request.details.className === ACTION_TYPES.INTEGRATION_PROCEDURE || request.details.className === ACTION_TYPES.FLEXCARD_RUNTIME ?
        parsedReturnValue.IPResult : parsedReturnValue;

      displayDetails.value = true;
      selectedRequestDetails.value = {
        input: NetworkParser.beautifyJSON(request.details.inputs) || "No Input",
        IPResult: NetworkParser.beautifyJSON(IPResult) || "No IPResult",
        options: NetworkParser.beautifyJSON(request.details.options) || "No Options",
        elementName: request.details.methodName,
        actionType: request.details.actionType,
      };

      console.log('selectedRequestDetails.value --> ' + JSON.stringify(selectedRequestDetails.value));
    }
  } catch (error) {
    console.error('Failed to show request details:', error);
    selectedRequestDetails.value = {
      input: "Error loading details",
      IPResult: error.message || "No IPResult"
    };
  }
};

const filteredRequests = computed(() => {
  const searchLower = searchQuery.value.toLowerCase();
  return requests.value.filter(request => {
    const matchesSearch =
      request.details.className.toLowerCase().includes(searchLower) ||
      request.details.methodName.toLowerCase().includes(searchLower);
    const matchesFilter =
      selectedFilterAction.value === 'All' ||
      request.details.className === selectedFilterAction.value;

    return matchesSearch && matchesFilter;
  });
});

const clearRequests = () => {
  displayDetails.value = false;
  requests.value = [];
  selectedRequestDetails.value = {
    input: "No Input",
    IPResult: "No IPResult"
  };
};
// Listen to Chrome DevTools Network events
/* eslint-disable */
chrome.devtools.network.onRequestFinished.addListener(addRequestToList);
</script>

<template>
  <!-- <ToggleLightDarkMode /> -->
  <ToastList />

  <div class="h-screen flex flex-col dark:bg-gray-800 z-10">
    <div class="p-2 bg-gray-100 border-b dark:border-gray-700 flex space-x-4 items-center dark:bg-gray-800">
      <TextInput v-model="searchQuery" placeholder="Search by Action or Element"
        class="text-xs w-48 !py-1.5 text-gray-700 ml-2" />
      <select v-model="selectedFilterAction"
        class="text-xs py-1.5 px-2 block w-48 text-gray-700 border border-gray-300 shadow-sm rounded-md focus:border-indigo-500 focus:ring-indigo-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-gray-900 dark:border-gray-700 dark:text-gray-400 dark:placeholder-gray-500 dark:focus:ring-gray-600 outline-indigo-500 dark:outline-none">
        <option value="All">All Actions</option>
        <option v-for="action in [...new Set(requests.map(req => req.details.actionType))]" :key="action"
          :value="action">
          {{ action }}
        </option>
      </select>
      <SVGIconButton @click="clearRequests" :icon="delete_icon" :isSquare="false" color="red" title="Clear All Requests"
        class="mr-2" />
    </div>

    <!-- Main Content -->
    <div class="flex flex-grow overflow-hidden dark:bg-gray-800" v-if="requests.length > 0">
      <!-- Request List -->
      <div class="w-1/4 border-r dark:border-gray-700 bg-gray-50 overflow-auto dark:bg-gray-800">
        <ul class="p-4 space-y-2">
          <li v-for="request in filteredRequests" :key="request.id"
            class="p-2 border rounded-md cursor-pointer text-gray-800 dark:text-gray-400 dark:border-gray-700 "
            :class="{ 'bg-blue-700 text-white dark:bg-gray-900 dark:border-gray-700 shadow-xl': selectedRequestId === request.id, 'bg-white dark:bg-gray-700 dark:border-gray-600 shadow-sm': selectedRequestId != request.id }"
            @click="showRequestDetails(request.id)">
            Action : {{ request.details.actionType || "N/A" }} <br>
            Element : {{ request.details.methodName || "N/A" }}
          </li>
        </ul>
      </div>

      <!-- Details Section -->
      <div class="w-3/4 p-4 overflow-auto" v-if="displayDetails">
        <InputLabel>Element : {{ selectedRequestDetails.elementName }}</InputLabel>
        <div class="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 mt-2">
          <!-- Input Editor -->
          <div class="w-full mr-3 lg:w-1/2">
            <div class="flex justify-between items-center">
              <InputLabel>Input :</InputLabel>
              <CopyButton :copyValue="selectedRequestDetails.input" class="mr-1" />
            </div>
            <div class="dark:border dark:border-gray-600 rounded-md mt-2">
              <codemirror v-model="selectedRequestDetails.input" placeholder="Your data will appear here"
                :style="{ height: '100px', borderRadius: '5px', overflow: 'hidden' }" :autofocus="true"
                :indent-with-tab="true" :tab-size="2" :extensions="extensions" @ready="handleReady" />
            </div>

          </div>
          <!-- Output Editor -->
          <div class="w-full mr-3 lg:w-1/2">
            <div class="flex justify-between items-center">
              <InputLabel>Output :</InputLabel>
              <CopyButton :copyValue="selectedRequestDetails.IPResult" class="mr-2" />
            </div>
            <div class="dark:border dark:border-gray-600 rounded-md mt-2">
              <codemirror v-model="selectedRequestDetails.IPResult" placeholder="Your data will appear here"
                :style="{ height: '100px', borderRadius: '5px', overflow: 'hidden' }" :autofocus="true"
                :indent-with-tab="true" :tab-size="2" :extensions="extensions" @ready="handleReady" />
            </div>
          </div>
        </div>
        <!-- Options Editor -->
        <div class="mt-4">
          <div class="flex justify-between items-center">
            <InputLabel>Options :</InputLabel>
            <CopyButton :copyValue="selectedRequestDetails.options" class="mr-2" />
          </div>
          <div class="dark:border dark:border-gray-600 rounded-md mt-2">
            <codemirror v-model="selectedRequestDetails.options" placeholder="Your data will appear here"
              :style="{ height: '100px', borderRadius: '5px', overflow: 'hidden' }" :autofocus="true"
              :indent-with-tab="true" :tab-size="2" :extensions="extensions" @ready="handleReady" />
          </div>
        </div>
      </div>
    </div>
    <div class="p-4 space-y-2" v-else>
      <InputLabel>No requests found.</InputLabel>
    </div>
  </div>
</template>
