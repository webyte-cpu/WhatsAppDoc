import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import { Input, Text, Button, Icon} from "@ui-kitten/components";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import { WebView } from "react-native-web-webview";
import { Field } from 'formik';
import { CustomInput } from "../customInput";

const GOOGLE_API_KEY = 'AIzaSyD6jR5RvAaq4VaRSDCd9jrdh9U8j6ErKkg';
const defaultLocation = "CPU Iloilo";

export default function WebMap({isViewMode = false, locationCoords, setLocationCoords}) {
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  // const [queryLocation, setQueryLocation] = useState({ lang: 0, lat: 0 });
  // const [errorMsg, setErrorMsg] = useState(null);
  const [query, setQuery] = useState("");
  // const [placeId, setPlaceId] = useState("");
  const geoDecode = async (query) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?${query.replace(" ","+")}&key=${GOOGLE_API_KEY}`
    );
    const parseRes = await response.json();
    return parseRes
  }
  
  const setCoordinates = (locationCoords) => {
    const [lat, lng] = locationCoords.split(',').map((e) => Number(e))
    return setLocation({lat, lng});
  }


  const fetchLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      fetchPlaceId(defaultLocation)
      return
    }

    let {coords} = await Location.getCurrentPositionAsync({ accuracy: 6 });
    setLocation({lat: coords.latitude, lng: coords.longitude});
  };

  const fetchPlaceId = async (query) => {
    const placeID = await geoDecode(`address=${query}`)
    setLocation(placeID.results[0].geometry.location);
  };

  useEffect(() => {
    if(!isViewMode && !locationCoords) { // if edit mode and no provided lcato
      fetchLocation()
    }

    if(locationCoords) {
      setCoordinates(locationCoords)
    }
  }, []);

  useEffect(() => {
    setLocationCoords(`${location.lat},${location.lng}`)
  }, [location])

  console.log(location, 'Location')
  const SearchBtn = (props) => (
    <TouchableWithoutFeedback onPress={() => {
      fetchPlaceId(query)
      }}>
        <View style={{borderLeftWidth: 1, borderLeftColor: '#e4e9f2', paddingLeft: 5}}>
            <Icon {...props} name="search"/>
        </View>
    </TouchableWithoutFeedback>
  );
  
  const GmapsLink = () => (
    <Text
      testID="toGoogleMapsBtn"
      accessibilityRole="button"
      appearance="hint"
      category="c1"
      onPress={() => window.open("https://www.google.com/maps/@11.6978351,122.6217542,6z/data=!10m2!1e2!2e13")}
      style={{marginLeft: 6}}
    >
      Can't find your location?{" "}
      <Text status="primary" category="c2" style={{textDecorationLine: 'underline'}}>
        add here.
      </Text>
    </Text>
  );


  return (
    <View>
      {isViewMode ? <></> : (
        <>
          <View style={{ flex: 0.6, flexDirection: "row", alignItems: "center", marginBottom: 10, width: 410}}>
          <Input
            placeholder="Search clinic location"
            value={query}
            onChangeText={(val) => setQuery(val)}
            style={{flex: 1, marginLeft: 7}}
            accessoryRight={(props) => SearchBtn(props)}
          />
          </View>
          <GmapsLink />
        </>
      )}
      <View>
        <WebView
          style={{width: 450, height: 350}}
          originWhitelist={["*"]}
          source={{
            html: `
              <iframe
              width="400"
              height="300"
              style="border:0"
              loading="lazy"
              allowfullscreen
              src="https://www.google.com/maps/embed/v1/view?key=${GOOGLE_API_KEY}&center=${location.lat},${location.lng}&zoom=16 ">
          </iframe>
              `,
          }}
        />
      </View>
    </View>
  );
}