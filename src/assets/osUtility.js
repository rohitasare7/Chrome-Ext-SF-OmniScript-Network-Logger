// utils/networkUtils.js

import { getActionData } from '@/assets/osActionsData';

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
        return { input: "Error parsing request", sClassName: "N/A", sMethodName: "N/A" };
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
        console.log('Mostly if message item is not JSON then you can expect this, can be ignored.');
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
    const actionItem = getActionData(params.sClassName);
    const beautifiedInput = JSON.stringify(JSON.parse(params.input), null, 4);
    return {
        input: beautifiedInput || "N/A",
        sClassName: actionItem.actionLabel || "N/A",
        sMethodName: params.sMethodName || "N/A",
    };
};

/**
 * Parse the response body and extract values.
 */
export const parseResponseBody = (responseBody) => {
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
};
