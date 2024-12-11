import { NetworkParser } from "./parser";
import { ACTION_TYPES, DR_TYPES, ACTION_SOURCE_RULES } from "./constants";
import { ActionMatcher } from "./actionMatcher";

export class ActionExtractor {
  static identifyActionSource(action) {
    const params = action?.params || {};
    const innerParams = params?.params || {};
    const options = NetworkParser.safeParseJSON(innerParams?.options || '{}');
    const vlcClass = options?.vlcClass || '';
    const className = params?.classname || '';

    // Try className based rules first
    for (const rule of ACTION_SOURCE_RULES.CLASSNAME_RULES) {
      if (ActionMatcher.matchesClassName(className, rule.matcher)) {
        return rule.type;
      }
    }

    // Try VLC class based rules
    for (const rule of ACTION_SOURCE_RULES.VLC_CLASS_RULES) {
      if (ActionMatcher.matchesVlcClass(vlcClass, rule.matchers)) {
        return rule.type;
      }
    }

    // Try custom rules
    for (const rule of ACTION_SOURCE_RULES.CUSTOM_RULES) {
      if (ActionMatcher.matchesCustomRule(vlcClass, rule.matcher)) {
        return rule.type;
      }
    }

    return 'Unknown';
  }

  static identifyDRType(methodName) {
    const drTypeMap = {
      invokeOutboundDR: DR_TYPES.EXTRACT,
      invokeInboundDR: DR_TYPES.LOAD,
      invokeDRTransform: DR_TYPES.TRANSFORM,
      invokeTurboExtractAction: DR_TYPES.TURBO_EXTRACT
    };
    return drTypeMap[methodName] || 'Unknown DR Type';
  }

  static extractActionDetails(action) {
    const params = action?.params || {};
    const innerParams = params?.params || {};
    const actionSource = this.identifyActionSource(action);

    const baseDetails = {
      actionType: actionSource,
      className: actionSource,
      methodName: params.method || innerParams.sMethodName || '',
      inputs: {},
      options: {}
    };

    const extractors = {
      [ACTION_TYPES.DATA_RAPTOR]: () => {
        const drInput = NetworkParser.safeParseJSON(innerParams.input);
        return {
          ...baseDetails,
          drType: this.identifyDRType(innerParams.sMethodName),
          methodName: drInput?.Bundle || drInput?.bundleName,
          inputs: drInput?.DRParams || drInput?.objectList || {},
          options: NetworkParser.safeParseJSON(innerParams.options)
        };
      },
      [ACTION_TYPES.FLEXCARD]: () => {
        const dsMap = NetworkParser.safeParseJSON(innerParams.dataSourceMap || '{}');
        console.log('dsMap --> ' + JSON.stringify(dsMap));
        if (dsMap.type === 'IntegrationProcedures') {
          return {
            ...baseDetails,
            actionType: ACTION_TYPES.INTEGRATION_PROCEDURE,
            className: ACTION_TYPES.INTEGRATION_PROCEDURE,
            methodName: dsMap.value.ipMethod,
            inputs: NetworkParser.safeParseJSON(dsMap.value.inputMap),
            options: NetworkParser.safeParseJSON(dsMap.value.optionsMap),
            additional: {
              vlocityAsync: dsMap.value.vlocityAsync,
              dsDelay: dsMap.value.dsDelay,
              resultVar: dsMap.value.resultVar,
              orderBy: dsMap.value.orderBy,
              contextVariables: dsMap.value.contextVariables
            }
          };
        }
        return baseDetails;
      },
      [ACTION_TYPES.INTEGRATION_PROCEDURE]: () => ({
        ...baseDetails,
        inputs: NetworkParser.safeParseJSON(innerParams.input),
        options: NetworkParser.safeParseJSON(innerParams.options),
        methodName: innerParams.sMethodName
      }),
      [ACTION_TYPES.REMOTE_ACTION]: () => ({
        ...baseDetails,
        inputs: NetworkParser.safeParseJSON(innerParams.input),
        options: NetworkParser.safeParseJSON(innerParams.options),
        methodName: `${innerParams.sClassName}.${innerParams.sMethodName}`
      })
    };
    console.log('extractors --> ' + JSON.stringify(extractors));
    return (extractors[actionSource] || (() => ({
      ...baseDetails,
      inputs: NetworkParser.safeParseJSON(innerParams.input),
      options: NetworkParser.safeParseJSON(innerParams.options),
      methodName: innerParams.sMethodName
    })))();
  }
}