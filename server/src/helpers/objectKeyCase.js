import Case from "case";
const { camel } = Case;

const objectKeysToCamelCase = (object, baseString, replaceWith = "") => {
  const result = {};
  for (const key in object) {
    if (Object.hasOwnProperty.call(object, key)) {
      const newKey = camel(key.replace(baseString, replaceWith));
      result[newKey] = object[key];
    }
  }
  return result;
};

export default objectKeysToCamelCase;
