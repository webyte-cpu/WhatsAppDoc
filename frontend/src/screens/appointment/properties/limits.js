import React, { useState, useEffect } from "react";
import { Text, Input } from "@ui-kitten/components";
import { View, StyleSheet, Platform } from "react-native";
import { Formik, Field } from "formik";
import { usePropertiesForm } from "./formProvider";
import { CustomInput } from "../../../components/customInput";
import { schedulingNoticeSchema } from "../../../../helpers/validationType";

const suffix = (suffix) => {
  return <Text category="s1">{suffix}</Text>;
};

const Limits = ({ route, navigation }) => {
  const form = usePropertiesForm();
  const data = {
    schedulingNotice: form.initialValues.schedulingNotice
  }
  
  const submitForm = (data) => {
    form.setValues(data)
  };
  
  return (
    <View style={styles.container}>
      <Text category="h6">Minimum Scheduling Notice</Text>
      <Formik initialValues={data} validationSchema={schedulingNoticeSchema}>
        {() => (
          <Field
            name='schedulingNotice' 
            testID='schedulingNotice'
            component={CustomInput}
            accessoryRight={() => suffix("HOURS")}
            style={{ marginVertical: 10 }}
            caption="Use this settings to prevent last-minute meetings. Set the minimum amount of notice required before appointments."
            submitOnChange={(values) => submitForm(values)}
          />
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
    height: "100%",
  },
});

export default Limits;
