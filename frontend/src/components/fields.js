import React, { useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
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
} from '@ui-kitten/components';
import { Field } from 'formik';
import { CustomInput } from './customInput';
import enums from '../../../shared/helpers/enums';
import countryList from '../utils/countries.json';

// const editForm = (formType, formSetter, key, value) => formSetter({ ...formType, [key]: value });

const CIVIL_STATUS = Object.keys(enums.civilStatus);
const SEX = Object.keys(enums.sex);

const EmailField = () => {
  return (
    <Field
      component={CustomInput}
      label="Email"
      name="email"
      placeholder="Enter Email Address"
      textContentType="emailAddress"
      keyboardType="email-address"
    />
  );
};

const PasswordField = () => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const toggleSecureEntry = () => setSecureTextEntry(!secureTextEntry);

  const showPasswordIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={!secureTextEntry ? 'eye' : 'eye-off'} />
    </TouchableWithoutFeedback>
  );

  return (
    <Field
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
const NameFields = () => {
  return (
    <>
      <Field
        component={CustomInput}
        testID="fname"
        label="First Name"
        name="fname"
        placeholder="Enter First Name"
        textContentType="givenName"
      />

      <Field
        component={CustomInput}
        testID="midName"
        label="Middle Name"
        name="midName"
        placeholder="Enter Middle Name"
        textContentType="middleName"
      />

      <Field
        component={CustomInput}
        testID="lname"
        label="Last Name"
        name="lname"
        placeholder="Enter Last Name"
        textContentType="familyName"
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

  const hasError = errors['sex'] && touched['sex'];
  const dynamicStatus = hasError ? 'danger' : 'basic';
  return (
    <>
      <Text category="label" style={{ color: theme['text-hint-color'] }}>
        Sex:
      </Text>
      <RadioGroup
        selectedIndex={SEX.indexOf(values.sex)}
        onChange={(index) => {
          setFieldTouched('sex');
          setValues({ ...values, sex: SEX[index] });
        }}
        style={{ flexDirection: 'row' }}
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
          {errors['sex']}
        </Text>
      ) : (
        <></>
      )}
    </>
  );
};

const BirthdateField = (props) => {
  const { setValues, values, touched, setFieldTouched, errors } = props;
  const hasError = errors['birthdate'] && touched['birthdate'];

  return (
    <>
      <Datepicker
        status={hasError ? 'danger' : 'basic'}
        testID="birthdate"
        min={new Date('1700-01-01')}
        max={new Date()}
        label="Birthdate"
        date={values.birthdate}
        onSelect={(date) => {
          setFieldTouched('birthdate');
          setValues({ ...values, birthdate: date });
        }}
        caption={hasError ? errors['birthdate'] : ''}
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
      onSelect={(value) => editForm('nationality', value)}
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
      onSelect={(value) => editForm('civilStatus', value)}
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
      onChangeText={(value) => editForm('contactNum', value)}
      placeholder="Enter Contact Number"
      textContentType="telephoneNumber"
      keyboardType="number-pad"
    />
  );
};

const AddressFields = ({ form, editForm }) => {
  const countriesData = countryList.map((data) => data.country);

  return (
    <>
      <Input
        testID="address"
        label="Address"
        caption="House Number, Street Name, Barangay"
        value={form.address}
        onChangeText={(value) => editForm('address', value)}
        placeholder="Enter Address"
        returnKeyType="next"
        multiline
        style={{ marginBottom: 10 }}
      />

      <Input
        testID="city"
        label="City"
        value={form.city}
        onChangeText={(value) => editForm('city', value)}
        placeholder="City"
        returnKeyType="next"
      />

      <Input
        testID="province"
        label="State/Province"
        value={form.province}
        placeholder="Enter State/Province"
        onChangeText={(value) => editForm('province', value)}
        returnKeyType="next"
      />

      <Input
        testID="zipCode"
        label="Zip/Postal Code"
        value={form.zipCode}
        placeholder="Enter Zip/Postal Code"
        onChangeText={(value) => editForm('zipCode', value)}
        returnKeyType="next"
        style={{ flex: 0.4, marginRight: 10 }}
      />

      <Select
        testID="country"
        label="Country"
        placeholder="Select your Country"
        value={countriesData[form.country.row]}
        selectedIndex={form.country}
        onSelect={(value) => editForm('country', value)}
        style={{ flex: 0.6 }}
      >
        {countriesData.map((country, index) => (
          <SelectItem key={index} title={country} />
        ))}
      </Select>
    </>
  );
};

export { EmailField, PasswordField, NameFields, SexField, BirthdateField };
