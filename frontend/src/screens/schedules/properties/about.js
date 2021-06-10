import React from "react";
import { Text, Divider } from "@ui-kitten/components";
import { View, StyleSheet, Image, Platform, ScrollView } from "react-native";
import { Formik, Field } from "formik";
import { addressSchema, clinicAboutSchema, clinicNameSchema } from "../../../../helpers/validationType";
import { AddressFields } from "../../../components/fields";
import { CustomInput } from "../../../components/customInput";
import { usePropertiesForm } from "./formProvider";
import WebMap from "../../../components/maps/WebMap";
import AndroidMap from "../../../components/maps/AndroidMap";
import * as R from 'ramda';

const prefix = (prefix) => {
  return <Text category="s1">{prefix}</Text>;
};

const LocationMap = ({submitForm, locationCoords}) => {
  return (
    <View>
      <Text category="h6" style={{ marginTop: 20 }}>
        Location
      </Text>
      <View style={{ marginTop: 10 }}>
        { Platform.OS === 'web' ? (<WebMap setLocationCoords={submitForm} locationCoords={locationCoords} />) : 
        (<AndroidMap setLocationCoords={submitForm} locationCoords={locationCoords} />)}
      </View>
    </View>
  );
};

const About = ({ route, navigation }) => {
  const form = usePropertiesForm();
  const initial = form.initialValues;
  const initialValues = {
    clinicName: initial.clinicName,
    consultationFee: initial.consultationFee.toString(),
    roomNumber: initial.roomNumber,
    streetAddress: initial.address.streetAddress,
    city: initial.address.city,
    province: initial.address.province,
    country: initial.address.country,
    zipCode: initial.address.zipCode
  };

  const clinicSchema = clinicAboutSchema.concat(addressSchema).concat(clinicNameSchema);

  const submitForm = (data) => {
    console.log(data, 'DATA')
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
      <Formik testID="formik" initialValues={initialValues} validationSchema={clinicSchema}>
        {({values: formValues}) => (
          <>
            <Text category="h6">Clinic Name</Text>
            <Field
              testID="clinic-name"
              name="clinicName"
              component={CustomInput}
              submitOnChange={(values) => submitForm(values)}
              autoCapitalize="sentences"
            />

            <Text category="h6">Consultation Fee</Text>
            <Field
              testID="consultation-fee"
              name="consultationFee"
              component={CustomInput}
              accessoryLeft={() => prefix("PHP")}
              caption="Displayed as an information only."
              submitOnChange={(values) => submitForm(values)}
              keyboardType='numeric'
            />

            <Divider style={{ marginTop: 20 }} />
            <LocationMap
              locationCoords={initial.address.coordinates}
              submitForm={(values) => {
              const clone = R.clone(formValues)
              const data = R.mergeDeepRight(clone, {coordinates: values})
              console.log(data)
              console.log(formValues, "FORM")
              form.setValues({address: {coordinates: values}})
              }} />
              
            <View>
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
