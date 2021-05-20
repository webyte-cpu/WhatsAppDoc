import { StyleSheet, TextInput, View, Text, Button } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { WebView } from 'react-native-web-webview';



export default function WebMap() {

    const [location, setLocation] = useState({ "coords": { "latitude": 0, "longitude": 0 } });
    const [queryLocation, setQueryLocation] = useState({ "lang": 0, "lat": 0 })
    const [errorMsg, setErrorMsg] = useState(null);
    const [query, setQuery] = useState("CPU Iloilo City")
    const [placeId, setPlaceId] = useState("")

    const fetchLocation = async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }


        let location = await Location.getCurrentPositionAsync({ accuracy: 6 });
        console.log(location["coords"]["latitude"])
        setLocation(location);
    }

    const fetchPlaceId = async () => {

        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${query.replace(" ", "+")}&key=AIzaSyD6jR5RvAaq4VaRSDCd9jrdh9U8j6ErKkg`)
        const parseRes = await response.json()
        console.log(parseRes.results[0]["geometry"]["location"]["lat"])
        console.log(parseRes.results[0])
        setQueryLocation(parseRes.results[0]["geometry"]["location"])
        setPlaceId(parseRes.results[0]["place_id"])
        console.log(queryLocation)
    }

    useEffect(() => {
        fetchLocation();
        fetchPlaceId();
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }

    return (
        <SafeAreaProvider>

            <TextInput
                style={styles.input}
                placeholder='e.g iloilo city'
                onChangeText={(val) => {
                    setQuery(val)
             
                }}
            />
            <Button title="Search" onPress={() => fetchPlaceId()}/>

            <WebView
                originWhitelist={['*']}
                source={{
                    html: `
            <iframe
            width="50%"
            height="50%"
            style="border:0"
            loading="lazy"
            allowfullscreen
            src="https://www.google.com/maps/embed/v1/directions?key=AIzaSyD6jR5RvAaq4VaRSDCd9jrdh9U8j6ErKkg&origin=place_id:${placeId}&destination=place_id:${placeId}&zoom=15 ">
          </iframe>
            ` }} />


            <View style={styles.container}>
                <Text style={styles.paragraph}>{text}</Text>
            </View>


        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: "black",
        padding: 8,
        margin: 10
    }
});




