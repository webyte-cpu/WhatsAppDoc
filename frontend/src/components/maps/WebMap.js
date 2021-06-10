import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import { Input, Text, Button, Icon} from "@ui-kitten/components";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import { WebView } from "react-native-web-webview";
import { Field } from 'formik';
import { CustomInput } from "../customInput";
import { fetchLocation } from "./mapUtils";

const defaultLocation = "CPU Iloilo";

export default function WebMap({isViewMode = false, locationCoords, setLocationCoords}) {
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [query, setQuery] = useState("");

  const setCoordinates = (locationCoords) => {
    const [lat, lng] = locationCoords.split(',').map((e) => Number(e))
    return setLocation({lat, lng});
  }

  const fetchPlaceId = async (query) => {
    const [latLng] = await Location.geocodeAsync(query.replace(" ","+"), { useGoogleMaps: true })
    setLocation({lat: latLng.latitude, lng: latLng.longitude});
  };

  const getLocation = async () => {
    if(!isViewMode && !locationCoords) { // if edit mode and no provided location
      const location = await fetchLocation()
      if(!location) {
        return fetchPlaceId(defaultLocation)
      }

      const {coords} = location
      return setLocation({lat: coords.latitude, lng: coords.longitude});
    }
  }

  useEffect(() => {
    getLocation()

    if(locationCoords) {
      setCoordinates(locationCoords)
    }
  }, []);

  useEffect(() => {
    if(setLocationCoords) {
      setLocationCoords(`${location.lat},${location.lng}`)
    }
  }, [location])

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
      <View style={{border: '1px solid #d8d8d8', width: 450, height: 322}}>
        <WebView
          style={{width: '100%', height: '100%'}}
          originWhitelist={["*"]}
          source={{
            html: `
              <iframe
              width="100%"
              height="300"
              style="border:0"
              loading="lazy"
              allowfullscreen
              src="https://www.google.com/maps/embed/v1/view?key=${process.env.GOOGLE_API_KEY}&center=${location.lat},${location.lng}&zoom=16 ">
          </iframe>
              `,
          }}
        />
      </View>
    </View>
  );
}