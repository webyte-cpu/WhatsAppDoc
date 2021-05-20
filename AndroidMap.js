import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';



export default function AndroidMap() {

  const [location, setLocation] = useState({ "coords": { "latitude": 10.7184083, "longitude": 122.5485867 } });

  const fetchLocation = async () => {
    let { status } = await Location.requestBackgroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }


    let location = await Location.getCurrentPositionAsync({ accuracy: 6 });
    console.log(location["coords"]["latitude"])
    console.log(location["coords"]["longitude"])
    setLocation(location);
  }


  useEffect(() => { 
    fetchLocation();
},[]);

  return (
    <View style={styles.container}>


      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location["coords"]["latitude"],
          longitude: location["coords"]["longitude"],
          latitudeDelta: 0.03358723958820065,
          longitudeDelta: 0.04250270688370961,
        }}>
        <MapView.Marker draggable
          coordinate={{
            latitude: 10.7184083,
            longitude: 122.5485867 ,
          }}
          onDragEnd={(e) => { console.log('dragEnd', e.nativeEvent.coordinate) }}
        />
      </MapView>

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
