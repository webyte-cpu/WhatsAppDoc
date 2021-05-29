import React, { useState } from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import {
  Input,
  Select,
  SelectItem,
  Datepicker,
  Radio,
  Text,
  RadioGroup,
  Icon,
  useTheme,
} from "@ui-kitten/components";
import { Field } from "formik";
import { CustomInput, CustomSelectField } from "./customInput";
import enums from "../../helpers/enums";
import countryList from "../utils/countries.json";

// const editForm = (formType, formSetter, key, value) => formSetter({ ...formType, [key]: value });

const CIVIL_STATUS = Object.keys(enums.civilStatus);
const SEX = Object.keys(enums.sex);

const InputLabelOptional = (props) => {
  const theme = useTheme();

  return (
    <Text {...props}>
      {props.label}
      <Text style={{ color: theme["text-hint-color"], fontSize: 11 }}>
        {" (optional)"}
      </Text>
    </Text>
  );
};

const EmailField = (props) => {
  return (
    <Field
      {...props}
      testID="email"
      component={CustomInput}
      label="Email"
      name="email"
      placeholder="Enter Email Address"
      textContentType="emailAddress"
      keyboardType="email-address"
      caption={props.emailErr ? "Email already in use" : ""}
      status={props.emailErr ? "danger" : "basic"}
    />
  );
};

const PasswordField = (props) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const toggleSecureEntry = () => setSecureTextEntry(!secureTextEntry);

  const showPasswordIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={!secureTextEntry ? "eye" : "eye-off"} />
    </TouchableWithoutFeedback>
  );

  return (
    <Field
      {...props}
      testID="password"
      component={CustomInput}
      label="Password"
      name="password"
      placeholder="Enter Password"
      accessoryRight={showPasswordIcon}
      secureTextEntry={secureTextEntry}
      textContentType="password"
    />
  );
};
const NameFields = (props) => {
  return (
    <>
      <Field
        testID="fname"
        component={CustomInput}
        label="First Name"
        name="fname"
        placeholder="Enter First Name"
        textContentType="givenName"
        autoCapitalize='words'
      />
      <Field
        testID="midname"
        component={CustomInput}
        label={(props) => <InputLabelOptional label="Middle Name" {...props} />}
        name="midName"
        placeholder="Enter Middle Name"
        textContentType="middleName"
        autoCapitalize='words'
      />
      <Field
        testID="lname"
        component={CustomInput}
        label="Last Name"
        name="lname"
        placeholder="Enter Last Name"
        textContentType="familyName"
        autoCapitalize='words'
      />
    </>
  );
};

const SexField = ({ setValues, values, touched, setFieldTouched, errors }) => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    radio: {
      margin: 2,
    },
  });

  const hasError = errors["sex"] && touched["sex"];
  const dynamicStatus = hasError ? "danger" : "basic";
  return (
    <>
      <Text category="label" style={{ color: theme["text-hint-color"] }}>
        Sex:
      </Text>
      <RadioGroup
        selectedIndex={SEX.indexOf(values.sex)}
        onChange={(index) => {
          setFieldTouched("sex");
          setValues({ ...values, sex: SEX[index] });
        }}
        style={{ flexDirection: "row" }}
      >
        <Radio testID="sex-male" style={styles.radio} status={dynamicStatus}>
          Male
        </Radio>
        <Radio testID="sex-female" style={styles.radio} status={dynamicStatus}>
          Female
        </Radio>
      </RadioGroup>
      {hasError ? (
        <Text category="c1" status="danger">
          {errors["sex"]}
        </Text>
      ) : (
        <></>
      )}
    </>
  );
};

const DateField = (props) => {
  const {
    setValues,
    values,
    touched,
    setFieldTouched,
    errors,
    name,
    onChange,
  } = props;
  const hasError = errors[name] && touched[name];

  return (
    <>
      <Datepicker
        {...props}
        status={hasError ? "danger" : "basic"}
        min={new Date("1905-01-01")}
        date={values[name]}
        onSelect={(date) => {
          setFieldTouched(name);
          setValues({ ...values, [name]: date });
        }}
        caption={hasError ? errors[name] : ""}
        placement="bottom start"
      />
    </>
  );
};

const NationalityField = ({ form, editForm }) => {
  const nationalitiesData = countryList.map((data) => data.nationality);
  return (
    <Select
      testID="nationality"
      label="Nationality"
      placeholder="Select your Nationality"
      value={nationalitiesData[form.nationality.row]}
      selectedIndex={form.nationality}
      onSelect={(value) => editForm("nationality", value)}
    >
      {nationalitiesData.map((nationality, index) => (
        <SelectItem key={index} title={nationality} />
      ))}
    </Select>
  );
};

const CivilStatusField = ({ form, editForm }) => {
  return (
    <Select
      testID="civilStatus"
      label="Civil Status"
      placeholder="Select Civil Status"
      value={CIVIL_STATUS[form.civilStatus.row]}
      selectedIndex={form.civilStatus}
      onSelect={(value) => editForm("civilStatus", value)}
    >
      {CIVIL_STATUS.map((status) => (
        <SelectItem key={status} title={status}></SelectItem>
      ))}
    </Select>
  );
};

const ContactNumberField = ({ form, editForm }) => {
  return (
    <Input
      testID="contactNum"
      label="Contact Number"
      value={form.contactNum}
      onChangeText={(value) => editForm("contactNum", value)}
      placeholder="Enter Contact Number"
      textContentType="telephoneNumber"
      keyboardType="phone-pad"
    />
  );
};

const AddressFields = ({submitForm}) => {
  const countriesData = countryList.map((data) => data.country);

  return (
    <>
      <Field
        testID="streetAddress"
        label="Street Address"
        component={CustomInput}
        name="streetAddress"
        placeholder="Street Address"
        caption="House Number, Street Name, Barangay"
        submitOnChange={(values) => submitForm(values)}
        multiline
        autoCapitalize='sentences'
      />
      <View
        style={{
          flexDirection: "row",
          // justifyContent: "center",
          // marginVertical: 10,
        }}
      >
        <Field
          testID="city"
          label="City"
          component={CustomInput}
          name="city"
          placeholder="City"
          style={{ flex: 0.4 }}
          submitOnChange={(values) => submitForm(values)}
          autoCapitalize='sentences'
        />
        <Field
          testID="province"
          label="State/Province"
          component={CustomInput}
          name="province"
          placeholder="State/Province"
          style={{ flex: 0.6, marginLeft: 10 }}
          submitOnChange={(values) => submitForm(values)}
          autoCapitalize='sentences'
        />
      </View>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <Field
          testID="zipCode"
          label="Zip/Postal Code"
          component={CustomInput}
          name="zipCode"
          placeholder="Zip/Postal Code"
          style={{ flex: 0.3 }}
          submitOnChange={(values) => submitForm(values)}

        />
        <Field
          testID="country"
          label="Country"
          placeholder="Country"
          name="country"
          component={CustomInput}
          style={{ flex: 0.7, marginLeft: 10 }}
          submitOnChange={(values) => submitForm(values)}
          autoCapitalize='sentences'
        />
      </View>
      {/* <Select
        testID="country"
        label="Country"
        placeholder="Select your Country"
        value={countriesData[form.country.row]}
        selectedIndex={form.country}
        onSelect={(value) => editForm("country", value)}
        style={{ flex: 0.6 }}
      >
        {countriesData.map((country, index) => (
          <SelectItem key={index} title={country} />
        ))}
      </Select> */}
    </>
  );
};

export {
  EmailField,
  PasswordField,
  NameFields,
  SexField,
  DateField,
  AddressFields,
};
