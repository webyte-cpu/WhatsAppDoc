import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { View, StyleSheet, ImageBackground, Platform } from "react-native";
import { Button, Text, useTheme } from "@ui-kitten/components";
import LoadingScreen from "../../components/loadingScreen";
import { SIGNUP_MUTATION } from "./utils/queries";
import customStyle from "../../../themes/styles";
import { formatDate } from "./utils/formatters";
import { useAuth } from "./utils/authProvider";
import { useMutation } from "@apollo/client";
import enums from "../../../helpers/enums";
import SignUpDoctor from "./signUpDoctor";
import React, { useState } from "react";
import { ErrorMessage, Formik } from "formik";
import {
  userSignUpSchema,
  doctorSignUpSchema,
} from "../../../helpers/validationType";
import {
  EmailField,
  PasswordField,
  DateField,
  NameFields,
  SexField,
} from "../../components/fields";

const ROLE = enums.role;

const SignupScreen = ({ navigation }) => {
  const theme = useTheme();
  const auth = useAuth();
  const [emailErr, setEmailErr] = useState(false)
  const doctorDetails = {
    specialization: "",
    licenseNum: "",
    licenseImg: "",
    expirationDate: "",
    verificationStatus: enums.verificationStatus.PENDING, //default
  };
  const userDetails = {
    email: "",
    password: "",
    fname: "",
    lname: "",
    midName: "", //optional
    role: ROLE.PATIENT,
    sex: "",
    birthdate: "",
  };

  const mutationOptions = {
    onCompleted({ signUp: token }) {
      if (token) {
        console.log(token);
        auth.login(token);
      }
    },
    onError: (error) => {
      if (error) {
        const { extensions } = error.graphQLErrors[0];
        if (extensions.code === "ALREADY_EXIST_EMAIL") {
          setEmailErr(true)
        }
      }
    },
  };

  const [signUpDetails, setSignUpDetails] = useState(userDetails);
  const signUpSchema =
    signUpDetails.role === ROLE.PATIENT
      ? userSignUpSchema
      : userSignUpSchema.concat(doctorSignUpSchema);

  const [signUpUser, { loading, error }] = useMutation(
    SIGNUP_MUTATION,
    mutationOptions
  );

  const signup = (values) => {
    setSignUpDetails(values);
    const doctor =
      values.role === ROLE.DOCTOR
        ? {
            doctor: {
              licenceNum: values.licenseNum,
              licenceImg: values.licenseImg,
              licenceExp: formatDate(values.expirationDate),
              specialization: values.specialization,
              verificationStatus: values.verificationStatus,
            },
          }
        : {};

    return signUpUser({
      variables: {
        firstName: values.fname,
        middleName: values.midName,
        lastName: values.lname,
        email: values.email,
        password: values.password,
        role: values.role,
        sex: values.sex,
        birthdate: formatDate(values.birthdate),
        ...doctor,
      },
    });
  };

  const changeRole = (role) => {
    switch (role) {
      case ROLE.PATIENT:
        return setSignUpDetails({ ...userDetails, role });
      case ROLE.DOCTOR:
        return setSignUpDetails({
          ...userDetails,
          ...doctorDetails,
          role,
        });
      default:
        throw new Error("Role is invalid");
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
            source={require("../../../assets/role-patient.png")}
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
            source={require("../../../assets/role-doctor.png")}
            style={styles.image}
          />
        </Button>
      </View>
    );
  };

  const SignUpForm = () => (
    <View>
      <View style={customStyle.content}>
        <Text style={styles.subtitle} category="h4">
          Choose Account Type
        </Text>
      </View>

      <Formik
        initialValues={signUpDetails}
        validationSchema={signUpSchema}
        onSubmit={signup}
      >
        {(props) => (
          <>
            <RoleButtons {...props} />
            <View style={styles.form}>
              <EmailField emailErr={emailErr} onFocus={() => setEmailErr(false)} />
              <PasswordField />
              <Text category="h6" style={customStyle.formTitle}>
                Personal Information
              </Text>
              <NameFields />
              <SexField {...props} />
              <DateField
                {...props}
                name="birthdate"
                label="Birthdate"
                testID="birthdate"
                max={new Date()}
              />
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
    </View>
  );

  if (loading) {
    return <LoadingScreen />;
  }

  // if (error) {
  //   console.log(error);
  //   return <Text>Error!</Text>;
  // }

  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: theme["color-primary-500"] }}
    >
      <SignUpForm />
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    textAlign: "center",
    paddingBottom: 5,
    color: "white",
  },
  buttonContainer: {
    paddingVertical: 15,
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
    padding: 30,
    backgroundColor: "white",
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
