export class ActionMatcher {
  static matchesVlcClass(vlcClass, matchers) {
    return matchers.some(matcher => vlcClass.includes(matcher));
  }

  static matchesClassName(className, matcher) {
    return matcher(className);
  }

  static matchesCustomRule(value, matcher) {
    return matcher(value);
  }
}