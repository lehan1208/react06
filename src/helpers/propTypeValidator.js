/**
 * Validate number is between min and max
 * @param {number} min  - Lower bound value, inclusive
 * @param {number} max  - Upper bound value, inclusive
 * @param {boolean} [isRequired=false] - Optional. Field is required or not.
 * @returns {(Error|ErrorType|String)} return Error no null
 */

const numberBetween = (min, max, isRequired) => {
  return (props, propName, componentName) => {
    const propValue = props[propName];
    if (isRequired) {
      if (!propValue) {
        return new Error(`${propName} is required on ${componentName}`);
      }
    }
    if (propValue) {
      if (typeof propValue !== "number") {
        return new Error(`${propName} must be a number on ${componentName}`);
      }
      if (propValue < min || propValue > max) {
        return new Error(
          `${propName} must be between ${min} and ${max} on ${componentName}`
        );
      }
    }
  };
};

const Validator = {
  numberBetween,
};
export default Validator;
