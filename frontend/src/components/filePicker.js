import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import * as ImageManipulator from 'expo-image-manipulator';

const compressImg = async (uri) => {
  const manipulatedResult = await ImageManipulator.manipulateAsync(
    uri,
    [{ rotate: 0 }],
    { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
  );
  console.log('compressed',manipulatedResult.uri)
  return manipulatedResult.uri;
};

/**
 * @returns {string} localUri
 */
const openImagePickerAsync = async () => {
  try {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert('Permission to access camera roll is required!');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.8,
      base64: true
    });
    
    if (pickerResult.cancelled) {
      return;
    }
    // console.log('uri',pickerResult.uri)
    // console.log( 'base64',pickerResult.base64)


    return compressImg(pickerResult.uri)
  } catch (e) {
    throw new Error(e);
  }
};

/**
 * @param {string} type - see expo documentPicker for info
 * @returns {object} { type: 'success' | 'cancel', uri, name, size }
 */
const documentPicker = async (type = '*/*') => {
  try {
    const imgFile = await DocumentPicker.getDocumentAsync({ type: type });

    if (imgFile.type === 'cancel') {
      return null;
    }

    return imgFile;
  } catch (error) {
    throw new Error(e);
  }
};

export { openImagePickerAsync, documentPicker };
