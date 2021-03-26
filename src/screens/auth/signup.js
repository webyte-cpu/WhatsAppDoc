import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  ImageBackground,
  Platform,
} from 'react-native';
import {
  Button,
  Text,
  Input,
  Icon,
  Radio,
  RadioGroup,
  Datepicker,
} from '@ui-kitten/components';
import SignUpDoctor from '../../components/signUpDoctor';
import { TopHeaderView } from '../../components/common';
import Template from '../template';

const styles = StyleSheet.create({
  subtitle: {
    paddingLeft: 30,
    paddingBottom: 5,
    color: 'white',
  },
  radio: {
    margin: 2,
  },
  buttonContainer: {
    paddingVertical: 15,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 150,
    height: 150,
    margin: 5,
    ...Platform.select({
      web: {
        width: 200,
        height: 200,
      },
    }),
  },
  form: {
    flex: 1,
    width: '100%',
    padding: 50,
    backgroundColor: 'white',
    borderTopLeftRadius: 70,
  },
  image: {
    width: 110,
    height: 110,
    ...Platform.select({
      web: {
        width: 170,
        height: 170,
      },
    }),
  },
});

const SignupScreen = ({ navigation }) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [birthdate, setBirthdate] = React.useState(new Date());
  const [isDoctor, setIsDoctor] = useState(false);
  const [signUpForm, setSignUpForm] = useState({
    email: '',
    password: '',
    fname: '',
    lname: '',
    city: '',
    province: '',
    zipCode: '',
    country: '',
  });
  const [doctorDetails, setDoctorDetails] = useState({
    specialization: '',
    licenseNum: '',
  });

  const editForm = (e) =>
    setSignUpForm({ ...signUpForm, [e.target.id]: e.target.value });
  const editDoctorDetails = (e) =>
    setDoctorDetails({ ...doctorDetails, [e.target.id]: e.target.value });

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const showPasswordIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={!secureTextEntry ? 'eye' : 'eye-off'} />
    </TouchableWithoutFeedback>
  );

  const signUp = () => {
    const verificationDetails = isDoctor ? doctorDetails : {}
    console.log({ ...signUpForm, selectedIndex, birthdate, ...verificationDetails})
  
  };

  const roleButton = (
    <View style={styles.buttonContainer}>
      <Button
        testID="patientRole"
        style={styles.button}
        disabled={!isDoctor}
        onPress={() => setIsDoctor(false)}
      >
        <ImageBackground
          source={require('../../../assets/role-patient.png')}
          style={styles.image}
        />
      </Button>
      <Button
        testID="doctorRole"
        style={styles.button}
        disabled={isDoctor}
        onPress={() => setIsDoctor(true)}
      >
        <ImageBackground
          source={require('../../../assets/role-doctor.png')}
          style={styles.image}
        />
      </Button>
    </View>
  );

  const signUpContent = (
    <>
      <TopHeaderView
        title="Sign Up"
        titleColor="white"
        btnColor="white"
        component={signUpContent}
        backTo={() => navigation.goBack()}
      />

      <Text style={styles.subtitle}>Choose Account Type</Text>
      {roleButton}

      <View style={styles.form}>
        <Input
          testID="email"
          nativeID="email"
          label="Email"
          placeholder="Enter email"
          value={signUpForm.email}
          onChange={(e) => editForm(e)}
        />
        <Input
          testID="password"
          nativeID="password"
          label="Password"
          placeholder="Enter Password"
          accessoryRight={showPasswordIcon}
          secureTextEntry={secureTextEntry}
          onChange={(e) => editForm(e)}
        />

        <Text category="h6" style={{ marginBottom: 20, marginTop: 20 }}>
          Personal Information
        </Text>

        <Input
          testID="fname"
          nativeID="fname"
          label="First Name"
          placeholder="Enter First Name"
          onChange={(e) => editForm(e)}
        />
        <Input
          testID="lname"
          nativeID="lname"
          label="Last Name"
          placeholder="Enter Last Name"
          onChange={(e) => editForm(e)}
        />
        <Text>Sex:</Text>

        <RadioGroup
          testID="sex"
          nativeID="sex"
          selectedIndex={selectedIndex}
          onChange={(e) => setSelectedIndex(e)}
        >
          <Radio style={styles.radio}>Male</Radio>
          <Radio style={styles.radio}>Female</Radio>
        </RadioGroup>

        <Datepicker
          testID="birthdate"
          min={new Date('1700-01-01')}
          nativeID="birthdate"
          label="Birthdate"
          date={birthdate}
          onSelect={setBirthdate}
        />

        <Text category="h6" style={{ marginBottom: 20, marginTop: 20 }}>
          Address Information
        </Text>

        <Input
          testID="city"
          nativeID="city"
          label="City"
          placeholder="Enter City"
          onChange={(e) => editForm(e)}
        />
        <Input
          testID="province"
          nativeID="province"
          label="Province"
          placeholder="Enter Province"
          onChange={(e) => editForm(e)}
        />
        <Input
          testID="zipCode"
          nativeID="zipCode"
          label="Zip Code"
          placeholder="Enter Zip Code"
          onChange={(e) => editForm(e)}
        />
        <Input
          testID="country"
          nativeID="country"
          label="Country"
          placeholder="Enter Country"
          onChange={(e) => editForm(e)}
        />

        {isDoctor ? (
          <SignUpDoctor
            specialization={doctorDetails.specialization}
            licenseNum={doctorDetails.licenseNum}
            editDoctorDetails={editDoctorDetails}
          />
        ) : (
          <></>
        )}

        <Button testID='finishSignup' style={{ marginTop: 15 }} onPress={signUp}>
          Signup
        </Button>
      </View>
    </>
  );

  return (
    <Template isScrollable={true} children={signUpContent} bgColor="#4A40D5" />
  );
};

export default SignupScreen;
