import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  ImageBackground,
  Platform,
  ScrollView
} from 'react-native';
import {
  Button,
  Text,
  Input,
  Icon,
  Radio,
  RadioGroup,
  IndexPath,
  useTheme
} from '@ui-kitten/components';
import SignUpDoctor from './signUpDoctor';
import customStyle from '../../../themes/styles';
import { useAuth } from './utils/authProvider';
import { CIVIL_STATUS, ROLE, SEX } from '../../utils/constants';
import { AddressFields, PatientFields, PersonalFields } from './utils/fields';
import { StatusBar } from 'expo-status-bar';

const SignupScreen = ({ navigation }) => {
  const theme = useTheme();
  const auth = useAuth();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [userDetails, setUserDetails] = useState({
    email: '',
    password: '',
    fname: '',
    lname: '',
    midName: '',
    role: ROLE.PATIENT,
  });
  const [addressDetails, setAddressDetails] = useState({
    address: '',
    city: '',
    province: '',
    zipCode: '',
    country: new IndexPath(174),
  })
  const [patientDetails, setPatientDetails] = useState({
    sex: 0,
    birthdate: new Date(),
    contactNum: '',
    civilStatus: new IndexPath(0),
    nationality: new IndexPath(174),
  })
  const [doctorDetails, setDoctorDetails] = useState({
    specialization: '',
    licenseNum: '',
    licenseImg: '',
    verificationStatus: ''
  });

  const editForm = (formType, formSetter, key, value) => formSetter({ ...formType, [key]: value });
  const editUserDetails = (key, value) => editForm(userDetails, setUserDetails, key, value)
  const editPatientDetails = (key, value) => editForm(patientDetails, setPatientDetails, key, value)
  const editAddressDetails = (key, value) => editForm(addressDetails, setAddressDetails, key, value)
  const editDoctorDetails = (key, value) => editForm(doctorDetails, setDoctorDetails, key, value)

  const toggleSecureEntry = () => setSecureTextEntry(!secureTextEntry);

  const showPasswordIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={!secureTextEntry ? 'eye' : 'eye-off'} />
    </TouchableWithoutFeedback>
  );

  const signup = () => {
    const additionalDetails = userDetails.role === ROLE.DOCTOR ? doctorDetails : {};
    const user = { ...userDetails, sex: SEX[userDetails.sex] }
    const patient = { ...patientDetails, civilStatus: CIVIL_STATUS[patientDetails.civilStatus.row] }
    const body = {
      ...user,
      ...addressDetails,
      ...patient,
      ...additionalDetails,
    };
    console.log(body)
    // return auth.signup(body);
  };

  // Components
  const roleButtons = (
    <View style={styles.buttonContainer}>
      <Button
        testID="patientRole"
        style={styles.button}
        disabled={userDetails.role === ROLE.PATIENT}
        onPress={() => editUserDetails('role', ROLE.PATIENT)}
      >
        <ImageBackground
          source={require('../../../assets/role-patient.png')}
          style={styles.image}
        />
      </Button>
      <Button
        testID="doctorRole"
        style={styles.button}
        disabled={userDetails.role === ROLE.DOCTOR}
        onPress={() => editUserDetails('role', ROLE.DOCTOR)}
      >
        <ImageBackground
          source={require('../../../assets/role-doctor.png')}
          style={styles.image}
        />
      </Button>
    </View>
  );

  const sexField = (
    <>
      <Text category='label' style={{ color: theme['text-hint-color'] }}>Sex:</Text>
      <RadioGroup
        selectedIndex={patientDetails.sex}
        onChange={(index) => editPatientDetails('sex', index)}
        style={{ flexDirection: 'row' }}
      >
        <Radio testID="sex-male" style={styles.radio}>
          Male
      </Radio>
        <Radio testID="sex-female" style={styles.radio}>
          Female
      </Radio>
      </RadioGroup>
    </>
  )

  const signUpContent = (
    <>
      
      <View style={customStyle.content}>
        <Text style={styles.subtitle} category='h4'>Choose Account Type</Text>
        {roleButtons}
      </View>

      <View style={styles.form}>
        <Input
          testID="email"
          label="Email"
          value={userDetails.email}
          onChangeText={(value) => editUserDetails('email', value)}
          placeholder="Enter Email Address"
          textContentType="emailAddress"
          keyboardType='email-address'
          returnKeyType="next"
        />
        <Input
          testID="password"
          label="Password"
          accessoryRight={showPasswordIcon}
          secureTextEntry={secureTextEntry}
          value={userDetails.password}
          onChangeText={(value) => editUserDetails('password', value)}
          placeholder="Enter Password"
          textContentType="password"
          returnKeyType="next"
        />

        <Text category="h6" style={customStyle.formTitle}>
          Personal Information
        </Text>
        <PersonalFields userDetails={userDetails} editUserDetails={editUserDetails} />
        {sexField}

        <PatientFields patientDetails={patientDetails} editPatientDetails={editPatientDetails} />

        <Text category="h6" style={customStyle.formTitle}>
          Address Information
        </Text>
        <AddressFields addressDetails={addressDetails} editAddressDetails={editAddressDetails} />

        {userDetails.role === ROLE.DOCTOR ? (
          <SignUpDoctor
            specialization={doctorDetails.specialization}
            licenseNum={doctorDetails.licenseNum}
            editDoctorDetails={editDoctorDetails}
          />
        ) : (
          <></>
        )}

        <Button
          testID="signUpBtn"
          style={{ marginTop: 15 }}
          onPress={signup}
        >
          Sign up
        </Button>
      </View>
    </>
  );

  return (
    <>
    <ScrollView style={{backgroundColor: theme['color-primary-500']}}>
      {signUpContent}
    </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    textAlign: 'center',
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
    })
  }
});

export default SignupScreen;
