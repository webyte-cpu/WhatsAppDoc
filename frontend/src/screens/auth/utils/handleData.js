import AsyncStorage from "@react-native-community/async-storage";

/**
 * @param {string} key
 * @param {string} value
 */
export const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * @param {string} key
 * @returns {(string|object)}
 */
export const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    console.log(jsonValue);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * @param {string} key
 */
export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    throw new Error(e);
  }
};
