import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_CLINICS } from './queries'
import { useEffect, useState } from 'react';



export default function Clinics() {

  const { loading, error, data } = useQuery(GET_CLINICS, { pollInterval: 500 });
  const [ clinics, setClinics] = useState([{hello:"hello"}])

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const dataClinics = data.getAllClinic
  console.log(dataClinics)
  


  return (
      <View>
        <Text>Test Component</Text>
        <Text>Check Console log</Text>
      </View>

  );
}
