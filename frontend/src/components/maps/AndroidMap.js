import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';

export default function AndroidMap({ isViewMode = false, locationCoords, setLocationCoords }) {

  const [location, setLocation] = useState({ latitude: 10.7184083, longitude: 122.5485867 });

  const fetchLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }


    let location = await Location.getCurrentPositionAsync({ accuracy: 6 });
    console.log(location["latitude"])
    console.log(location["longitude"])
    setLocation(location);
  }


  const setCoordinates = (locationCoords) => {
    const [latitude, longitude] = locationCoords.split(',').map((e) => Number(e))
    return setLocation({latitude, longitude});
  }

  useEffect(() => {
    if(!isViewMode && !locationCoords) { // if edit mode and no provided lcato
      fetchLocation()
    }

    if(locationCoords) {
      setCoordinates(locationCoords)
    }
  },[]);

  useEffect(() => {
    console.log(location, 'LOCATION')
    setLocationCoords(`${location.latitude},${location.longitude}`)
  }, [location])

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        loadingEnabled={true}
        region={{
          latitude: location["latitude"],
          longitude: location["longitude"],
          latitudeDelta: 0.03358723958820065,
          longitudeDelta: 0.04250270688370961,
        }}
        // onMarkerDragEnd={(coords) => console.log(coords)}
        >
        <MapView.Marker draggable
          coordinate={{
            latitude: location["latitude"],
            longitude: location["longitude"],
          }}
          onDragEnd={(e) => setLocation(e.nativeEvent.coordinate)}
        />
      </MapView>

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    height: 350,
    marginVertical: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
