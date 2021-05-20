import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import AndroidMap from "./AndroidMap.js"
// import WebMap from "./WebMap.js"



export default function App() {



  return (
    <View style={styles.container}>

      <StatusBar style="auto" />

      <AndroidMap />
      {/* <WebMap /> */}


    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
