import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import { fetchLocation } from './mapUtils';

export default function AndroidMap({ isViewMode = false, locationCoords, setLocationCoords }) {

  const [location, setLocation] = useState({ latitude: 10.731395, longitude: 122.5469074 });

  const setCoordinates = (locationCoords) => {
    const [latitude, longitude] = locationCoords.split(',').map((e) => Number(e))
    return setLocation({latitude, longitude});
  }

  const getLocation = async () => {
    if(!isViewMode && !locationCoords) { // if edit mode and no provided location
      const location = await fetchLocation()
  
      if(location) {
        const {coords} = location
        setLocation({ latitude: coords.latitude, longitude: coords.longitude })
      }
    }  
  }

  useEffect( () => {
    getLocation()
    
    if(locationCoords) {
      setCoordinates(locationCoords)
    }
  },[]);

  useEffect(() => {
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
