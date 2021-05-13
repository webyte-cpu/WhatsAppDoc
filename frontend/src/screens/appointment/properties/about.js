import React from "react";
import { Text, Divider, Input, IndexPath } from "@ui-kitten/components";
import { View, StyleSheet, Image, Platform, ScrollView } from "react-native";
import { Formik, Field } from "formik";
import {
  addressSchema,
  clinicAboutSchema,
} from "../../../../helpers/validationType";
import { AddressFields } from "../../../components/fields";
import { CustomInput } from "../../../components/customInput";
import { AppRoute } from "../../../navigation/app-routes";

const prefix = (prefix) => {
  return <Text category="s1">{prefix}</Text>;
};

const LocationMap = () => {
  return (
    <View>
      <Text category="h6" style={{ marginVertical: 10 }}>
        Location
      </Text>
      <Image
        style={styles.locationImg}
        source={{
          uri: "http://www.destination360.com/asia/philippines/iloilo/days-hotel-ilo-ilo-city-map.gif",
        }}
      />
    </View>
  );
};

const About = ({ route, navigation }) => {
  const initialValues = {
    consultationFee: "",
    roomNumber: "",
    streetAddress: "",
    city: "",
    province: "",
    country: "",
    zipCode: "",
  };

  const clinicSchema = clinicAboutSchema.concat(addressSchema);

  const submitForm = (values) => {
    navigation.navigate({
      name: AppRoute.APPOINTMENT_PROPERTIES,
      params: { values },
      merge: true,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Formik initialValues={initialValues} validationSchema={clinicSchema}>
        {() => (
          <>
            <Text category="h6">Consultation Fee</Text>
            <Field
              name="consultationFee"
              component={CustomInput}
              accessoryLeft={() => prefix("PHP")}
              caption="Displayed as an information only."
              submitOnChange={(values) => submitForm(values)}
            />

            <Divider style={{ marginTop: 20 }} />

            <LocationMap />

            <View style={{ marginTop: 20 }}>
              <Field
                submitOnChange={(values) => submitForm(values)}
                testID="roomNumber"
                name="roomNumber"
                label="Room Number"
                component={CustomInput}
                placeholder="Room Number"
              />
              <AddressFields submitForm={submitForm} />
            </View>
          </>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
  },
  locationImg: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    ...Platform.select({
      web: {
        width: "100%",
        height: 400,
      },
    }),
  },
});

export default About;
