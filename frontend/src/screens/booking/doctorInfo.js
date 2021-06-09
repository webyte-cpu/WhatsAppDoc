import React, { useState, useEffect } from "react";
import {
  View,
  Platform,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Divider, Button, Text } from "@ui-kitten/components";
import { RenderDoctor } from "../search/doctors/doctorsList";
import customStyle from "../../../themes/styles";
import AndroidMap from "../../components/maps/AndroidMap";
import WebMap from "../../components/maps/WebMap";
import { AppRoute } from "../../navigation/app-routes";
import BookingScreen from "./bookAppointment";

// const defaultSampleText = `Sample text only for content. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi consequat eros in sem sollicitudin, nec ultricies nibh ullamcorper. Pellentesque hendrerit libero lorem. In id metus lacinia, varius turpis nec, venenatis orci. Sed id nibh quis tortor iaculis congue ac ornare mauris. Sed iaculis, elit in porta consequat, ante dui dictum`;

// const AboutDoctor = () => {
//   return (
//     <View>
//       <Text category="h6" style={{ marginTop: 20 }}>
//         About
//       </Text>
//       <Text style={{ marginTop: 10 }}>{doctor.about ?? defaultSampleText}</Text>
//       <Text category="h6" style={{ marginTop: 20 }}>
//         Education Background
//       </Text>
//       <Text style={{ marginTop: 10 }}>
//         {doctor.educational ?? defaultSampleText}
//       </Text>
//     </View>
//   );
// };

const DoctorInfo = ({ route, navigation }) => {
  const doctor = route.params.doctorData;

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      navigation.setOptions({
        title: `${doctor.firstName} ${doctor.middleName[0].toUpperCase()}. ${
          doctor.lastName
        }`,
      });
    });

    return unsubscribe;
  }, [navigation]);

  const [selectedClinic, setSelectedClinic] = useState(doctor.clinic[0]);

  const RenderMap = () => {
    return Platform.OS === "web" ? (
      <WebMap
        isViewMode={true}
        locationCoords={selectedClinic.address.coordinates}
      />
    ) : (
      <AndroidMap
        isViewMode={true}
        locationCoords={selectedClinic.address.coordinates}
      />
    );
  };

  const RenderClinics = ({ clinics }) => {
    const clinicNames = ({ item: clinic }) => (
      <TouchableOpacity
        key={clinic.uid}
        activeOpacity={0.6}
        onPress={() => setSelectedClinic(clinic)}
      >
        <View
          style={
            selectedClinic.uid === clinic.uid
              ? customStyle.clinicBtn
              : [customStyle.clinicBtn, { backgroundColor: "#f0f2f4" }]
          }
        >
          <Text
            category="s2"
            style={{
              color: selectedClinic.uid === clinic.uid ? "#4a40d5" : "#c0c2c8",
            }}
          >
            {clinic.name}
          </Text>
        </View>
      </TouchableOpacity>
    );

    return (
      <FlatList
        horizontal="true"
        data={clinics}
        renderItem={clinicNames}
        style={{ marginVertical: 10 }}
      />
    );
  };

  return (
    <ScrollView style={customStyle.contentFill}>
      <RenderDoctor disable={true} item={doctor} />
      <Divider />
      <Text category="h6" style={{ marginTop: 20 }}>
        Clinics
      </Text>
      <RenderClinics clinics={doctor.clinic} />
      <RenderMap />
      <BookingScreen clinic={selectedClinic} />
      {/* <Button
        appearance="filled"
        style={{ marginVertical: 10 }}
        onPress={() => console.log(selectedClinic)}
      >
        Create Appointment
      </Button> */}
    </ScrollView>
  );
};

export default DoctorInfo;
