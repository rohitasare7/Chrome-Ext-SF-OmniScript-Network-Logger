// Vars

const DATA_MAPPER = "Data Mapper";
const INTEGRATION_PROCEDURE = "Integration Procedure";
const REMOTE_ACTION = "Remote Action";
const MATRIX_ACTION = "Matrix Action";
const HTTP_ACTION = "HTTP Action";
//Array
export const actionList = [DATA_MAPPER,INTEGRATION_PROCEDURE,REMOTE_ACTION,MATRIX_ACTION,HTTP_ACTION];
//Get Action Type label
const actionLabels = [
  {
    actionType: "vlocity_cmt.IntegrationProcedureService",
    actionLabel: INTEGRATION_PROCEDURE,
    elementLabel: "IP",
  },
  {
    actionType: "vlocity_cmt.DefaultDROmniScriptIntegration",
    actionLabel: DATA_MAPPER, // sMethodName : invokeOutboundDR , invokeInboundDR, invokeTransformDR
    elementLabel: DATA_MAPPER,
  },
  {
    actionType: "vlocity_cmt.DefaultOmniscriptApexRestService",
    actionLabel: HTTP_ACTION, // sMethodName : generateApexRestRequest
    elementLabel: "API",
  },
  {
    actionType: "vlocity_cmt.DefaultOmniScriptMatrix",
    actionLabel: MATRIX_ACTION,
    elementLabel: "Matrix Name",
  },
  {
    actionType: "ApexRemoteClass",
    actionLabel: REMOTE_ACTION,
    elementLabel: "Apex Class",
  },
  //Std Runtime
  {
    actionType: "omnistudiocore.IPService",
    actionLabel: INTEGRATION_PROCEDURE,
    elementLabel: "IP",
  },
  {
    actionType: "omnistudiocore.DefaultDROmniScriptIntegration",
    actionLabel: DATA_MAPPER, // sMethodName : invokeOutboundDR , invokeInboundDR, invokeTransformDR
    elementLabel: DATA_MAPPER,
  },
  {
    actionType: "omnistudiocore.DefaultOmniscriptApexRestService",
    actionLabel: HTTP_ACTION, // sMethodName : generateApexRestRequest
    elementLabel: "API",
  },
];

// Method to get the action label based on the actionType
const getActionData = (actionType) => {
  const action = actionLabels.find((item) => item.actionType === actionType);
  return action ? action : "Action type not found";
};

export { getActionData };