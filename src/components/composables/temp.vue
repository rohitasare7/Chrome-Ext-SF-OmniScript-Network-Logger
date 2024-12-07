<template>
    <div class="p-4">
      <h2 class="text-xl font-bold mb-4">Identify Action Type</h2>
      <textarea
        v-model="responseInput"
        placeholder="Paste your response JSON here..."
        class="w-4/5 h-40 p-2 border rounded mb-4"
      ></textarea>
      <button
        @click="identifyAction"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Identify Action
      </button>
  
      <div v-if="actionDetail" class="mt-4">
        <strong>Action Source:</strong> {{ actionDetail.actionSource }} <br />
        <strong>Item:</strong> {{ actionDetail.item }}
      </div>
      <div v-else-if="error" class="mt-4 text-red-500">
        {{ error }}
      </div>
      <div v-else class="mt-4">
        No action identified.
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const responseInput = ref('');
  const actionDetail = ref(null);
  const error = ref(null);
  
  // Function to identify the action source and item
  const identifyAction = () => {
    try {
      error.value = null;
      actionDetail.value = null;
  
      if (!responseInput.value) {
        error.value = 'Please enter a valid response.';
        return;
      }
  
      const response = JSON.parse(responseInput.value);
      const action = response.actions?.[0];
  
      if (!action) {
        error.value = 'No actions found in the response.';
        return;
      }
  
      const { classname, params } = action.params;
      const { dataSourceMap, sClassName, sMethodName } = params;
  
      if (classname === 'FlexRuntime' && dataSourceMap) {
        const dataSource = JSON.parse(dataSourceMap);
        if (dataSource.type === 'IntegrationProcedures') {
          actionDetail.value = {
            actionSource: 'FlexCard IP Call',
            item: `IP Method: ${dataSource.value.ipMethod}`,
          };
        }
      } else if (sClassName && sMethodName) {
        if (sClassName.includes('IntegrationProcedureService')) {
          actionDetail.value = {
            actionSource: 'OmniScript IP Call',
            item: `IP Method: ${sMethodName}`,
          };
        } else if (sClassName.includes('DefaultDROmniScriptIntegration')) {
          actionDetail.value = {
            actionSource: 'OmniScript DataRaptor Call',
            item: `DataRaptor Method: ${sMethodName}`,
          };
        } else {
          actionDetail.value = {
            actionSource: 'OmniScript Remote Action',
            item: `Apex Class: ${sClassName}, Method: ${sMethodName}`,
          };
        }
      } else {
        error.value = 'Unrecognized action type.';
      }
    } catch (e) {
      error.value = 'Invalid JSON format.';
    }
  };
  </script>
  
  <style scoped>
  h2 {
    color: #2c3e50;
  }
  textarea {
    resize: vertical;
  }
  </style>
  