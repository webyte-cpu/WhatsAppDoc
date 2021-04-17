import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from 'expo-document-picker';

/**
 * @returns {string} localUri
 */
const openImagePickerAsync = async () => {
  try {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled) {
      return;
    }

    return pickerResult.uri;
  } catch (e) {
    throw new Error(e)
  }
};

/**
 * @param {string} type - see expo documentPicker for info
 * @returns {object} { type: 'success' | 'cancel', uri, name, size }
 */
const documentPicker = async (type = "*/*") => {
  try {
    const imgFile = await DocumentPicker.getDocumentAsync({ type: type })

    if(imgFile.type === 'cancel') {
      return null
    }

    return imgFile
  } catch (error) {
    throw new Error(e)
  }
}

export { openImagePickerAsync, documentPicker }