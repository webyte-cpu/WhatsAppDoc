import React from "react";
import { Text, Divider } from "@ui-kitten/components";
import { View, StyleSheet, Image, Platform, ScrollView } from "react-native";
import { Formik, Field } from "formik";
import { addressSchema, clinicAboutSchema, clinicNameSchema } from "../../../../helpers/validationType";
import { AddressFields } from "../../../components/fields";
import { CustomInput } from "../../../components/customInput";
import { usePropertiesForm } from "./formProvider";

const prefix = (prefix) => {
  return <Text category="s1">{prefix}</Text>;
};

const LocationMap = () => {
  return (
    <View>
      <Text category="h6" style={{ marginVertical: 10 }}>
        Location
      </Text>
      <Text>
      { Platform.OS === 'web' ? 'Map function is not yet supported': 'There is a map function.'}
      </Text>
      {/* <Image
        style={styles.locationImg}
        source={{
          uri: "http://www.destination360.com/asia/philippines/iloilo/days-hotel-ilo-ilo-city-map.gif",
        }}
      /> */}
    </View>
  );
};

const About = ({ route, navigation }) => {
  const form = usePropertiesForm();
  const initial = form.initialValues;

  const initialValues = {
    clinicName: initial.clinicName,
    consultationFee: initial.consultationFee,
    roomNumber: initial.roomNumber,
    streetAddress: initial.address.streetAddress,
    city: initial.address.city,
    province: initial.address.province,
    country: initial.address.country,
    zipCode: initial.address.zipCode,
  };

  const clinicSchema = clinicAboutSchema.concat(addressSchema).concat(clinicNameSchema);

  const submitForm = (data) => {
    const newData = {
      clinicName: data.clinicName,
      consultationFee: Number(data.consultationFee),
      roomNumber: data.roomNumber,
      address: {
        streetAddress: data.streetAddress,
        city: data.city,
        province: data.province,
        country: data.country,
        zipCode: data.zipCode
      },
    };
    form.setValues(newData)
  };

  return (
    <ScrollView style={styles.container}>
      <Formik initialValues={initialValues} validationSchema={clinicSchema}>
        {() => (
          <>
            <Text category="h6">Clinic Name</Text>
            <Field
              name="clinicName"
              component={CustomInput}
              submitOnChange={(values) => submitForm(values)}
              autoCapitalize="sentences"
            />

            <Text category="h6">Consultation Fee</Text>
            <Field
              name="consultationFee"
              component={CustomInput}
              accessoryLeft={() => prefix("PHP")}
              caption="Displayed as an information only."
              submitOnChange={(values) => submitForm(values)}
              keyboardType='numeric'
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
