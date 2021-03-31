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
import SignUpDoctor from './signUpDoctor';
import { TopHeaderView } from '../../components/common';
import Template from '../../components/template';
import { AppRoute } from '../../navigation/app-routes';
import { customStyle } from '../../../themes/styles';
import { useAuth } from './utils/authProvider';

const styles = StyleSheet.create({
  subtitle: {
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
    padding: 30,
    backgroundColor: 'white',
    borderTopLeftRadius: 50,
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
  const auth = useAuth();
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

  const editForm = (key, value) => {
    setSignUpForm({ ...signUpForm, [key]: value });
  };
  const editDoctorDetails = (key, value) => {
    setDoctorDetails({ ...doctorDetails, [key]: value });
  };

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const showPasswordIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={!secureTextEntry ? 'eye' : 'eye-off'} />
    </TouchableWithoutFeedback>
  );

  const signup = () => {
    const verificationDetails = isDoctor ? doctorDetails : {};
    const body = {
      ...signUpForm,
      selectedIndex,
      birthdate,
      ...verificationDetails,
    };

    return auth.signup(body);
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
        backTo={() => navigation.goBack()}
      />

      <View style={customStyle.content}>
        <Text style={styles.subtitle}>Choose Account Type</Text>
        {roleButton}
      </View>

      <View style={styles.form}>
        <Input
          testID="email"
          label="Email"
          placeholder="Enter email"
          value={signUpForm.email}
          onChangeText={(value) => editForm('email', value)}
        />
        <Input
          testID="password"
          label="Password"
          placeholder="Enter Password"
          accessoryRight={showPasswordIcon}
          secureTextEntry={secureTextEntry}
          value={signUpForm.password}
          onChangeText={(value) => editForm('password', value)}
        />

        <Text category="h6" style={{ marginBottom: 20, marginTop: 20 }}>
          Personal Information
        </Text>

        <Input
          testID="fname"
          label="First Name"
          placeholder="Enter First Name"
          onChangeText={(value) => editForm('fname', value)}
        />
        <Input
          testID="lname"
          label="Last Name"
          placeholder="Enter Last Name"
          onChangeText={(value) => editForm('lname', value)}
        />
        <Text>Sex:</Text>

        <RadioGroup
          selectedIndex={selectedIndex}
          onChange={(index) => setSelectedIndex(index)}
        >
          <Radio testID="sex-male" style={styles.radio}>
            Male
          </Radio>
          <Radio testID="sex-female" style={styles.radio}>
            Female
          </Radio>
        </RadioGroup>

        <Datepicker
          testID="birthdate"
          min={new Date('1700-01-01')}
          label="Birthdate"
          date={birthdate}
          onSelect={setBirthdate}
        />

        <Text category="h6" style={{ marginBottom: 20, marginTop: 20 }}>
          Address Information
        </Text>

        <Input
          testID="city"
          label="City"
          placeholder="Enter City"
          onChangeText={(value) => editForm('city', value)}
        />
        <Input
          testID="province"
          label="Province"
          placeholder="Enter Province"
          onChangeText={(value) => editForm('province', value)}
        />
        <Input
          testID="zipCode"
          label="Zip Code"
          placeholder="Enter Zip Code"
          onChangeText={(value) => editForm('zipCode', value)}
        />
        <Input
          testID="country"
          label="Country"
          placeholder="Enter Country"
          onChangeText={(value) => editForm('country', value)}
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

        <Button
          testID="finishSignup"
          style={{ marginTop: 15 }}
          onPress={signup}
        >
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
