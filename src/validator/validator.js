import validator from 'validator';

const RULE_REQUIRED = 'required';
const RULE_EMAIL = 'email';

function validate(values, rules, messages = {}, externalErrors = {}) {
  const result = {};
  const keys = Object.keys(rules);
  for (let j = 0; j < keys.length; j++) {
    const key = keys[j];
    const value = values[key] || '';
    const keyRules = rules[key];
    for (let i = 0; i < keyRules.length; i++) {
      const rule = keyRules[i];
      let valid;
      switch (rule) {
        case RULE_REQUIRED:
          valid = !validator.isEmpty(value);
          break;
        case RULE_EMAIL:
          valid = validator.isEmail(value);
          break;
        default:
          valid = true;
      }
      const errors = result[key] || [];
      if (!valid) {
        const message = (messages[key] || {})[rule];
        errors.push(message || rule);
      }
      if (errors.length > 0) {
        result[key] = errors;
      }
    }
  }
  return result;
}

export default validate;
