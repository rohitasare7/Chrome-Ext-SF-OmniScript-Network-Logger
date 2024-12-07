<script setup>
import { ref, computed } from 'vue'

// Define action types as constants
const ACTION_TYPES = {
  INTEGRATION_PROCEDURE: 'IntegrationProcedure',
  REMOTE_ACTION: 'RemoteAction',
  DATA_RAPTOR: 'DataRaptor',
  FLEXCARD: 'FlexCard'
}

// Define DataRaptor types
const DR_TYPES = {
  EXTRACT: 'Extract',
  LOAD: 'Load',
  TRANSFORM: 'Transform',
  TURBO_EXTRACT: 'Turbo Extract'
}

const jsonInput = ref('')
const errorMessage = ref('')
const parsedResponse = ref(null)

// Function to validate and parse JSON input
const parseJsonInput = () => {
  try {
    errorMessage.value = ''
    parsedResponse.value = JSON.parse(jsonInput.value)
  } catch (e) {
    errorMessage.value = 'Invalid JSON format. Please check your input.'
    parsedResponse.value = null
  }
}

// Helper function to parse JSON strings safely
const safeParseJSON = (str) => {
  try {
    return typeof str === 'string' ? JSON.parse(str) : str
  } catch (e) {
    console.error('JSON Parse Error:', e)
    return {}
  }
}

// Function to identify DataRaptor type based on method name
const identifyDRType = (methodName) => {
  switch (methodName) {
    case 'invokeOutboundDR':
      return DR_TYPES.EXTRACT
    case 'invokeInboundDR':
      return DR_TYPES.LOAD
    case 'invokeDRTransform':
      return DR_TYPES.TRANSFORM
    case 'invokeTurboExtractAction':
      return DR_TYPES.TURBO_EXTRACT
    default:
      return 'Unknown DR Type'
  }
}

// Function to identify the source of the action
const identifyActionSource = (action) => {
  const params = action?.params || {}
  const innerParams = params?.params || {}
  const options = safeParseJSON(innerParams?.options || '{}')
  const vlcClass = options?.vlcClass || ''
  const className = params?.classname || ''
  
  if (className === 'FlexRuntime') {
    return ACTION_TYPES.FLEXCARD
  }
  else if (vlcClass.includes('DefaultDROmniScriptIntegration') || vlcClass.includes('vlocity_cmt.DefaultDROmniScriptIntegration')) {
    return ACTION_TYPES.DATA_RAPTOR
  }
  else if (vlcClass.includes('IntegrationProcedureService')) {
    return ACTION_TYPES.INTEGRATION_PROCEDURE
  }
  else if (vlcClass && !vlcClass.includes('vlocity_cmt')) {
    return ACTION_TYPES.REMOTE_ACTION
  }
  
  return 'Unknown'
}

// Function to extract action details based on source
const extractActionDetails = (action) => {
  // Initialize params and innerParams based on action
  const params = action?.params || {};
  const innerParams = params?.params || {};
  const actionSource = identifyActionSource(action); // Function that identifies the source of the action
console.log('actionSource --> '+actionSource);
  // Initialize the details object to store parsed action details
  let details = {
    actionType: actionSource,
    className: params.classname || '', // Default to empty string if classname is not provided
    methodName: params.method || innerParams.sMethodName || '', // Determine methodName based on params
    inputs: {},
    options: {}
  };
  details.className = actionSource;
  // Switch based on the identified action source
  switch (actionSource) {
    
    case ACTION_TYPES.DATA_RAPTOR: {
      // Parse the input for DataRaptor and handle it
      const drInput = safeParseJSON(innerParams.input); // Safe parse JSON input for DataRaptor
      details.drType = identifyDRType(innerParams.sMethodName); // Identify DataRaptor type
      details.methodName = drInput?.Bundle || drInput?.bundleName; // Set the method name based on the DR Bundle
      details.inputs = drInput?.DRParams || drInput?.objectList || {}; // Default DRParams if undefined
      details.options = safeParseJSON(innerParams.options); // Safe parse options
      break;
    }

    case ACTION_TYPES.FLEXCARD: {
      // Parse the dataSourceMap for FlexCard and handle it
      const dsMap = safeParseJSON(innerParams.dataSourceMap || '{}'); // Parse DataSource Map
      if (dsMap.type === 'IntegrationProcedures') {
        // If type is IntegrationProcedures, extract values
        details.methodName = dsMap.value.ipMethod;
        details.inputs = safeParseJSON(dsMap.value.inputMap);
        details.options = safeParseJSON(dsMap.value.optionsMap);
        details.additional = {
          vlocityAsync: dsMap.value.vlocityAsync,
          dsDelay: dsMap.value.dsDelay,
          resultVar: dsMap.value.resultVar,
          orderBy: dsMap.value.orderBy,
          contextVariables: dsMap.value.contextVariables
        };
      }
      break;
    }

    case ACTION_TYPES.INTEGRATION_PROCEDURE:
      // For IntegrationProcedure, extract inputs and options
      details.inputs = safeParseJSON(innerParams.input);
      details.options = safeParseJSON(innerParams.options);
      details.methodName = innerParams.sMethodName;
      break;

    case ACTION_TYPES.REMOTE_ACTION:
      // For RemoteAction, extract inputs and options
      details.inputs = safeParseJSON(innerParams.input);
      details.options = safeParseJSON(innerParams.options);
      details.methodName = `${innerParams.sClassName}.${innerParams.sMethodName}`;
      break;

    // You can add more cases if necessary
    default:
      // Handle any unknown action types if needed
      break;
  }
  console.log('details --> '+JSON.stringify(details));
  // Return the collected details
  return details;
};
// Computed property to process all actions in the response
const processedActions = computed(() => {
  if (!parsedResponse.value) return []
  
  const actions = parsedResponse.value?.actions || []
  return actions.map(action => extractActionDetails(action))
})

// Function to clear the input and results
const clearAll = () => {
  jsonInput.value = ''
  parsedResponse.value = null
  errorMessage.value = ''
}

// Function to format JSON for display
const formatJson = (obj) => {
  return JSON.stringify(obj, null, 2)
}

// Function to get badge color based on action type
const getBadgeColor = (actionType, drType) => {
  if (actionType === ACTION_TYPES.DATA_RAPTOR) {
    switch (drType) {
      case DR_TYPES.EXTRACT: return 'bg-green-500'
      case DR_TYPES.LOAD: return 'bg-yellow-500'
      case DR_TYPES.TRANSFORM: return 'bg-purple-500'
      case DR_TYPES.TURBO_EXTRACT: return 'bg-emerald-500'
      default: return 'bg-gray-500'
    }
  }
  
  switch (actionType) {
    case ACTION_TYPES.INTEGRATION_PROCEDURE: return 'bg-blue-500'
    case ACTION_TYPES.REMOTE_ACTION: return 'bg-orange-500'
    case ACTION_TYPES.FLEXCARD: return 'bg-indigo-500'
    default: return 'bg-gray-500'
  }
}
</script>

<template>
  <div class="omnistudio-action-parser">
    <div class="input-section">
      <h2 class="text-xl font-bold mb-4">OmniStudio Action Parser</h2>
      
      <textarea
        v-model="jsonInput"
        placeholder="Paste your JSON here..."
        class="w-full h-48 p-2 border rounded-md font-mono text-sm mb-4"
      ></textarea>
      
      <div class="flex gap-4 mb-4">
        <button
          @click="parseJsonInput"
          class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Parse JSON
        </button>
        
        <button
          @click="clearAll"
          class="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
        >
          Clear
        </button>
      </div>
      
      <div v-if="errorMessage" class="text-red-500 mb-4">
        {{ errorMessage }}
      </div>
    </div>

    <div v-if="processedActions.length" class="results-section">
      <h3 class="text-lg font-bold mb-4">Parsed Results:</h3>
      
      <div v-for="(action, index) in processedActions" :key="index" class="action-item">
        <div class="action-header">
          <div class="flex gap-2 items-center">
            <span :class="['action-type-badge', getBadgeColor(action.actionType, action.drType)]">
              {{ action.actionType }}
            </span>
            <span v-if="action.drType" :class="['action-type-badge', getBadgeColor(action.actionType, action.drType)]">
              {{ action.drType }}
            </span>
          </div>
        </div>
        
        <div class="action-details">
          <div class="detail-row">
            <strong>Action:</strong> {{ action.className }}
          </div>
          <div class="detail-row">
            <strong>Element:</strong> 
            {{ action.methodName }}
          </div>
          
          <div class="detail-section">
            <h4 class="detail-title">
              {{ action.actionType === ACTION_TYPES.DATA_RAPTOR ? 'DR Params' : 'Inputs' }}:
            </h4>
            <pre class="json-display">{{ formatJson(action.inputs) }}</pre>
          </div>
          
          <div class="detail-section">
            <h4 class="detail-title">Options:</h4>
            <pre class="json-display">{{ formatJson(action.options) }}</pre>
          </div>

          <div v-if="action.additional" class="detail-section">
            <h4 class="detail-title">Additional Settings:</h4>
            <pre class="json-display">{{ formatJson(action.additional) }}</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.omnistudio-action-parser {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.action-item {
  margin-bottom: 1.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  overflow: hidden;
}

.action-header {
  background-color: #f8fafc;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e2e8f0;
}

.action-type-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  color: white;
}

.action-details {
  padding: 1rem;
}

.detail-row {
  margin-bottom: 0.5rem;
}

.detail-section {
  margin-top: 1rem;
}

.detail-title {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.json-display {
  background-color: #f8fafc;
  padding: 0.75rem;
  border-radius: 0.375rem;
  font-family: monospace;
  font-size: 0.875rem;
  white-space: pre-wrap;
  overflow-x: auto;
}

textarea {
  font-family: monospace;
  resize: vertical;
}
</style>