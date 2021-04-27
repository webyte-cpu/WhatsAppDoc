import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Platform,
  ScrollView,
} from 'react-native';
import { Button, Text, useTheme } from '@ui-kitten/components';
import SignUpDoctor from './signUpDoctor';
import customStyle from '../../../themes/styles';
import { useAuth } from './utils/authProvider';
import enums from '../../../helpers/enums';
import { Formik } from 'formik';
import {
  userSignUpSchema,
  doctorSignUpSchema,
} from '../../../helpers/validationType';
import {
  EmailField,
  PasswordField,
  DateField,
  NameFields,
  SexField,
} from '../../components/fields';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SIGNUP_MUTATION , SIGNUP_DOCTOR } from "../auth/utils/queries"


const ROLE = enums.role;

const SignupScreen = ({ navigation }) => {
  const theme = useTheme();
  const auth = useAuth();
  const doctorDetails = {
    specialization: '',
    licenseNum: '',
    licenseImg: '',
    expirationDate: '',
    verificationStatus: enums.verificationStatus.PENDING, //default
  };
  const userDetails = {
    email: '',
    password: '',
    fname: '',
    lname: '',
    midName: '', //optional
    role: '',
    sex: '',
    birthdate: '',
  };

  const [signUpDetails, setSignUpDetails] = useState(userDetails);
  
  const [signupData] = useMutation(SIGNUP_MUTATION,{
    variables:{
      email: signUpDetails.email,
      password: signUpDetails.password,
      firstName: signUpDetails.fname,
      lastName: signUpDetails.lname,
      middleName: signUpDetails.midName,
      role: signUpDetails.role,
      sex: signUpDetails.sex,
      birthdate: signUpDetails.birthdate
    }
  });
  
  const signUpSchema =
    signUpData.role === "PATIENT"
    // signUpDetails.role === ROLE.PATIENT 
      ? userSignUpSchema
      : userSignUpSchema.concat(doctorSignUpSchema);

  
  const signup = (values) => {
    console.log(values);
    // return auth.signup(values);
    return signupData.signup(values)
  };

  const changeRole = (role) => {
    switch (role) {
      case "PATIENT":
        return setSignUpDetails({ ...userDetails, role });
      case "DOCTOR":
        return setSignUpDetails({
          ...userDetails,
          ...doctorDetails,
          role,
        });
      default:
        throw new Error('Role is invalid');
    }
  };

  // Components
  const RoleButtons = () => {
    return (
      <View style={styles.buttonContainer}>
        <Button
          testID="patientRole"
          style={styles.button}
          disabled={signUpDetails.role === ROLE.PATIENT}
          onPress={() => changeRole(ROLE.PATIENT)}
        >
          <ImageBackground
            source={require('../../../assets/role-patient.png')}
            style={styles.image}
          />
        </Button>
        <Button
          testID="doctorRole"
          style={styles.button}
          disabled={signUpDetails.role === ROLE.DOCTOR}
          onPress={() => changeRole(ROLE.DOCTOR)}
        >
          <ImageBackground
            source={require('../../../assets/role-doctor.png')}
            style={styles.image}
          />
        </Button>
      </View>
    );
  };

  const SignUpForm = () => (
    <>
      <View style={customStyle.content}>
        <Text style={styles.subtitle} category="h4">
          Choose Account Type
        </Text>
      </View>

      <Formik
        initialValues={signUpDetails}
        validationSchema={signUpSchema}
        onSubmit={(values) => signup(values)}
      >
        {(props) => (
          <>
            <RoleButtons {...props} />
            <View style={styles.form}>
              <EmailField />
              <PasswordField />

              <Text category="h6" style={customStyle.formTitle}>
                Personal Information
              </Text>

              <NameFields />
              <SexField {...props} />
              <DateField {...props} name="birthdate" label="Birthdate" testID="birthdate" max={new Date()} />

              {props.values.role === ROLE.DOCTOR ? (
                <SignUpDoctor {...props} />
              ) : (
                <></>
              )}
              <Button
                testID="signUpBtn"
                style={{ marginTop: 15 }}
                onPress={props.handleSubmit}
              >
                Sign up
              </Button>
            </View>
          </>
        )}
      </Formik>
    </>
  );

  return (
    <>
      <KeyboardAwareScrollView style={{ backgroundColor: theme['color-primary-500'] }}>
        <SignUpForm />
      </KeyboardAwareScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    textAlign: 'center',
    paddingBottom: 5,
    color: 'white',
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

export default SignupScreen;
