import * as Location from 'expo-location';
/**
 * 
 * @returns {coords: {latitude: Number, longitude: Number }} | null
 */
export const fetchLocation = async () => {
  try {
    let { status } = await Location.requestPermissionsAsync();
  
    if (status !== 'granted') {
      return null
    }

    let location = await Location.getCurrentPositionAsync({ accuracy: 6 });
    return location
  } catch (error) {
    console.error(error)
    throw new Error(error)
  }
}

// export const webGeoDecode = async (query) => {
//   const response = await fetch(
//     `https://maps.googleapis.com/maps/api/geocode/json?${query}&key=${process.env.GOOGLE_API_KEY}`
//   );
//   const parseRes = await response.json();
//   return parseRes
// }

