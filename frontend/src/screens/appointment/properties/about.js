import React from 'react';
import { Text, Divider, Input } from '@ui-kitten/components';
import { View, StyleSheet, Image, Platform, ScrollView } from 'react-native';

const prefix = (prefix) => {
  return <Text category='s1'>{prefix}</Text>
}

const LocationForm = () => {
  return(
    <View style={{marginTop:20}}>
      <Input style={{width:'80%', alignSelf:'center', marginVertical:10}} placeholder="Street Address" />
      <View style={{ flexDirection: 'row',  justifyContent: 'center', marginVertical:10 }}>
        <Input style={{marginHorizontal:10, width:'35%'}} placeholder="City" />
        <Input style={{marginHorizontal:10, width:'35%'}} placeholder="Province" />
      </View>
      <View style={{ flexDirection: 'row',  justifyContent: 'center', marginVertical:10 }}>
        <Input style={{marginHorizontal:10, width:'35%'}} placeholder="Zip Code" />
        <Input style={{marginHorizontal:10, width:'35%'}} placeholder="Country" />
      </View>
    </View>
  )
}

const About = () => {
  return (
    <View style={styles.container}>
      <Text category='h6'>Consultation Fee</Text>
      <Input accessoryLeft={ () => prefix('PHP')} caption='Display as an information only' />
      <Divider style={{marginTop:20}} />
      <Text category='h6' style={{ marginVertical:10}}>Location</Text>
      <Image style={styles.locationImg} source={{uri:'http://www.destination360.com/asia/philippines/iloilo/days-hotel-ilo-ilo-city-map.gif'}} />
      <LocationForm />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding:20,
    backgroundColor:'white',
    height:'100%'
  },
  locationImg:{
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    ...Platform.select({
        web: {
            width: '100%',
            height: 400,
        },
    }),
  },
})

export default About 

