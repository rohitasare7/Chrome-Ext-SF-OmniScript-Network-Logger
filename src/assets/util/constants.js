export const ACTION_TYPES = {
  DATA_RAPTOR: 'Data Raptor',
  INTEGRATION_PROCEDURE: 'Integration Procedure',
  REMOTE_ACTION: 'Remote Action',
  MATRIX_ACTION: 'Matrix Action',
  HTTP_ACTION: 'HTTP Action',
  FLEXCARD: 'FlexRuntime',
  FLEXCARD_RUNTIME: 'FlexCardRuntime',
  // Easy to add new action types here
};

export const DR_TYPES = {
  EXTRACT: 'Extract',
  LOAD: 'Load',
  TRANSFORM: 'Transform',
  TURBO_EXTRACT: 'Turbo Extract'
};

// Configuration object for action source identification rules
export const ACTION_SOURCE_RULES = {
  CLASSNAME_RULES: [
    {
      type: ACTION_TYPES.FLEXCARD,
      matcher: (className) => className === ACTION_TYPES.FLEXCARD
    }
    // Add more className based rules here
  ],

  VLC_CLASS_RULES: [
    {
      type: ACTION_TYPES.DATA_RAPTOR,
      matchers: [
        'DefaultDROmniScriptIntegration',
        'vlocity_cmt.DefaultDROmniScriptIntegration',
        'omnistudiocore.DefaultDROmniScriptIntegration'
      ]
    },
    {
      type: ACTION_TYPES.INTEGRATION_PROCEDURE,
      matchers: [
        'IntegrationProcedureService',
        'vlocity_cmt.IntegrationProcedureService',
        'omnistudiocore.IPService'
      ]
    },
    {
      type: ACTION_TYPES.HTTP_ACTION,
      matchers: [
        'DefaultOmniscriptApexRestService',
        'vlocity_cmt.DefaultOmniscriptApexRestService',
        'omnistudiocore.DefaultOmniscriptApexRestService'
      ]
    },
    // Add more VLC class based rules here
  ],

  CUSTOM_RULES: [
    {
      type: ACTION_TYPES.REMOTE_ACTION,
      matcher: (vlcClass) => vlcClass && !vlcClass.includes('vlocity_cmt')
    }
    // Add more custom rules here
  ]
};

export const IGNORED_ACTIONS = {
  UNDEFINED: 'undefined.undefined'
  // Easy to add new action types here
};