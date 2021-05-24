import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import AndroidMap from "./AndroidMap.js"
import Clinics from "./Clinics/Clinics.js"
// import WebMap from "./WebMap.js"
import { AppRegistry } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
  fetchOptions: {
    mode: 'no-cors',
  },
});

export default function App() {



  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>

        <StatusBar style="auto" />

        {/* <AndroidMap /> */}
        {/* <WebMap /> */}
        <Text>Hello World</Text>

        <Clinics />

      </View>

    </ApolloProvider>


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
