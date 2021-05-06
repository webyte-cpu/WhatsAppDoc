import { StyleSheet,TextInput} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { WebView } from 'react-native-webview';



export default function AndroidWebView() {

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
        //const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location["coords"]["latitude"]},${location["coords"]["longitude"]}&key=AIzaSyD6jR5RvAaq4VaRSDCd9jrdh9U8j6ErKkg`)
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
                    fetchPlaceId()
                }}


            />

            <WebView
                originWhitelist={['*']}
                source={{
                    html: `
            <iframe
            width="100%"
            height="100%"
            style="border:0"
            loading="lazy"
            allowfullscreen
            src="https://www.google.com/maps/embed/v1/directions?key=AIzaSyD6jR5RvAaq4VaRSDCd9jrdh9U8j6ErKkg&origin=place_id:${placeId}&destination=place_id:${placeId}&zoom=50">
          </iframe>
            ` }} />



            {/* <Image source={{ uri: `https://maps.googleapis.com/maps/api/staticmap?center=${query.replace(" ", "+")}&zoom=100&size=600x300&maptype=roadmap&markers=color:red%7Clabel:A%7C${query.replace(" ", "+")}&key=AIzaSyD6jR5RvAaq4VaRSDCd9jrdh9U8j6ErKkg` }} style={{  width: '100%', height: '50%' }} /> */}



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


