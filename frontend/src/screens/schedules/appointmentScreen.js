import React from "react";
import { ScrollView, View } from "react-native";
import { Text } from "@ui-kitten/components";
import customStyle from "../../../themes/styles";

const AppointmentScreen = () => {
  return (
    <ScrollView style={customStyle.listBackground}>
      <View>
      <Text>Appointment</Text>
      </View>
    </ScrollView>
  );
};

export default AppointmentScreen;
