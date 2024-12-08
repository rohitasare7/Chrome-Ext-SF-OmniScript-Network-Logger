// utils/networkUtils.js
import { ref, computed } from "vue";
import { getActionData } from "@/assets/osActionsData";

const DATA_RAPTOR = "Data Raptor";
const INTEGRATION_PROCEDURE = "Integration Procedure";
const REMOTE_ACTION = "Remote Action";
const MATRIX_ACTION = "Matrix Action";
const HTTP_ACTION = "HTTP Action";
const FLEXCARD = 'FlexRuntime';

export const actionList = [DATA_RAPTOR, INTEGRATION_PROCEDURE, REMOTE_ACTION, MATRIX_ACTION, HTTP_ACTION, FLEXCARD];

// Define action types as constants
const ACTION_TYPES = {
    INTEGRATION_PROCEDURE: INTEGRATION_PROCEDURE,
    REMOTE_ACTION: REMOTE_ACTION,
    DATA_RAPTOR: DATA_RAPTOR,
    FLEXCARD: FLEXCARD,
    HTTP_ACTION: HTTP_ACTION
};

// Define DataRaptor types
const DR_TYPES = {
    EXTRACT: "Extract",
    LOAD: "Load",
    TRANSFORM: "Transform",
    TURBO_EXTRACT: "Turbo Extract",
};

// Helper function to parse JSON strings safely
const safeParseJSON = (str) => {
    try {
        return typeof str === "string" ? JSON.parse(str) : str;
    } catch (e) {
        console.error("JSON Parse Error:", e);
        return {};
    }
};

/**
 * Parse the request body to extract relevant details.
 * @param {object} request - Network request object.
 * @returns {object} Extracted values.
 */
export const parseRequestBody = (request) => {
    try {
        const requestBody = request?.request?.postData?.text || null;
        if (!requestBody) return null;
        const messageNode = parseMessageNode(requestBody);
        return extractRequestValues(messageNode);
    } catch (error) {
        console.error("Error extracting request details:", error);
        return {
            input: "Error parsing request",
            sClassName: "N/A",
            sMethodName: "N/A",
        };
    }
};

/**
 * Decode and parse form data payload to extract the `message` node as JSON.
 */
const parseMessageNode = (formData) => {
    try {
        const params = new URLSearchParams(decodeURIComponent(formData));
        const messageNode = params.get("message");

        return messageNode ? JSON?.parse(messageNode) : null;
    } catch (error) {
        console.error("Error parsing message node:", error);
        console.log(
            "Mostly if message item is not JSON then you can expect this, can be ignored."
        );
        return null;
    }
};

/**
 * Extract relevant values from the parsed message node.
 */
const extractRequestValues = (messageNode) => {
    if (!messageNode || !messageNode.actions?.length) {
        return { input: "N/A", sClassName: "N/A", sMethodName: "N/A" };
    }
    const action = messageNode.actions[0];
    const params = action.params?.params || {};
    const data = extractActionDetails(action);
    console.log('data --> ' + JSON.stringify(data));
    console.log('data.inputs --> ' + JSON.stringify(data.inputs));
    //const beautifiedInput = JSON.stringify(JSON.parse(data.inputs), null, 4);
    const beautifiedInput = JSON.stringify((data.inputs), null, 4);
    const beautifiedOptions = JSON.stringify((data.options), null, 4);
    return {
        input: beautifiedInput || "N/A",
        options: beautifiedOptions || "N/A",
        sClassName: data.className || "N/A",
        sMethodName: data.methodName || "N/A",
    };
};

/**
 * Parse the response body and extract values.
 */
export const parseResponseBody = (responseBody, actionStr) => {
    try {
        const parsedResponse = JSON.parse(responseBody);
        const actions = parsedResponse.actions || [];
        if (!actions.length) return { IPResult: "No IPResult found", error: "No error" };

        const returnValue = actions[0].returnValue || {};
        const parsedReturnValue = returnValue.returnValue ? JSON.parse(returnValue.returnValue) : {};
        //get response
        const resp = extractResponse(parsedReturnValue, actionStr);
        console.log('actionStr --> ' + actionStr);
        console.log('parsedReturnValue --> ' + JSON.stringify(parsedReturnValue));
        console.log('new resp --> ' + JSON.stringify(resp));
        return {
            IPResult: JSON.stringify(resp || "No IPResult found", null, 2),
            error: parsedReturnValue.error || "No error",
        };
    } catch (error) {
        console.error("Error parsing response body:", error);
        return { IPResult: "Error parsing response body", error: "No error" };
    }
};


// Function to identify DataRaptor type based on method name
const identifyDRType = (methodName) => {
    switch (methodName) {
        case "invokeOutboundDR":
            return DR_TYPES.EXTRACT;
        case "invokeInboundDR":
            return DR_TYPES.LOAD;
        case "invokeDRTransform":
            return DR_TYPES.TRANSFORM;
        case "invokeTurboExtractAction":
            return DR_TYPES.TURBO_EXTRACT;
        default:
            return "Unknown DR Type";
    }
};

// Function to identify the source of the action
const identifyActionSource = (action) => {
    const params = action?.params || {};
    const innerParams = params?.params || {};
    const options = safeParseJSON(innerParams?.options || "{}");
    const vlcClass = options?.vlcClass || "";
    const className = params?.classname || "";

    if (className === "FlexRuntime") {
        return ACTION_TYPES.FLEXCARD;
    } else if (vlcClass.includes("DefaultDROmniScriptIntegration") || vlcClass.includes("vlocity_cmt.DefaultDROmniScriptIntegration")) {
        return ACTION_TYPES.DATA_RAPTOR;
    } else if (vlcClass.includes("IntegrationProcedureService")) {
        return ACTION_TYPES.INTEGRATION_PROCEDURE;
    } else if (vlcClass && !vlcClass.includes("vlocity_cmt")) {
        return ACTION_TYPES.REMOTE_ACTION;
    }
    else if (vlcClass.includes("DefaultOmniscriptApexRestService")) {
        return ACTION_TYPES.HTTP_ACTION;
    }

    return "Unknown";
};

// Function to extract action details based on source
const extractActionDetails = (action) => {
    // Initialize params and innerParams based on action
    const params = action?.params || {};
    const innerParams = params?.params || {};
    const actionSource = identifyActionSource(action); // Function that identifies the source of the action
    console.log("actionSource --> " + actionSource);
    // Initialize the details object to store parsed action details
    let details = {
        actionType: actionSource,
        className: params.classname || "", // Default to empty string if classname is not provided
        methodName: params.method || innerParams.sMethodName || "", // Determine methodName based on params
        inputs: {},
        options: {},
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
            const dsMap = safeParseJSON(innerParams.dataSourceMap || "{}"); // Parse DataSource Map
            console.log('dsMap.type --> ' + dsMap.type);
            if (dsMap.type === "IntegrationProcedures") {
                // If type is IntegrationProcedures, extract values
                details.className = ACTION_TYPES.INTEGRATION_PROCEDURE;
                details.methodName = dsMap.value.ipMethod;
                details.inputs = safeParseJSON(dsMap.value.inputMap);
                details.options = safeParseJSON(dsMap.value.optionsMap);
                details.additional = {
                    vlocityAsync: dsMap.value.vlocityAsync,
                    dsDelay: dsMap.value.dsDelay,
                    resultVar: dsMap.value.resultVar,
                    orderBy: dsMap.value.orderBy,
                    contextVariables: dsMap.value.contextVariables,
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
            details.inputs = safeParseJSON(innerParams.input);
            details.options = safeParseJSON(innerParams.options);
            details.methodName = innerParams.sMethodName;
            break;
    }
    console.log("details --> " + JSON.stringify(details));
    // Return the collected details
    return details;
};

const extractResponse = (response, action) => {
    let output = {};
    switch (action) {
        case ACTION_TYPES.DATA_RAPTOR:
        case ACTION_TYPES.REMOTE_ACTION: {
            output = response;
            break;
        }
        case ACTION_TYPES.INTEGRATION_PROCEDURE: {
            output = response.IPResult;
            break;
        }
        default:
            output = response;
            break;
    }
    return output;
}