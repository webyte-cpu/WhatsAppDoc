import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { EmailField, PasswordField } from "../../components/fields";
import { View, StyleSheet, Platform, Image } from "react-native";
import { loginSchema } from "../../../helpers/validationType";
import { Button, Text } from "@ui-kitten/components";
import loginImg from "../../../assets/img/login-welcome.jpg";
import LoadingScreen from "../../components/loadingScreen";
import { AppRoute } from "../../navigation/app-routes";
import { SIGNIN_MUTATION } from "./utils/queries";
import { useMutation } from "@apollo/client";
import customStyle from "../../../themes/styles";
import { useAuth } from "./utils/authProvider";
import React, { useState } from "react";
import { Formik } from "formik";

const SignInScreen = ({ navigation }) => {
  const auth = useAuth();

  const loginDetails = {
    email: "",
    password: "",
  };

  const mutationOptions = {
    onCompleted: ({ signIn: token }) => {
      if (token) {
        auth.login(token);
      }
    },
    onError: (error) => {
      if (error) {
        const { extensions } = error.graphQLErrors[0];
        if (extensions.code === "VALIDATION_ERROR") {
          setLoginErr("Invalid Email/Password");
        }
      }
    },
  };

  const [loginErr, setLoginErr] = useState("");
  const [savedLoginDetails, setLoginDetails] = useState(loginDetails);

  const [signInUser, { loading }] = useMutation(
    SIGNIN_MUTATION,
    mutationOptions
  );

  const goToSignUp = () => navigation.navigate(AppRoute.SIGNUP);
  const forgotPassword = () => navigation.navigate(AppRoute.FORGOT_PASS);
  const login = async (variables) => {
    setLoginDetails(variables);
    const queryResponse = await signInUser({ variables });
    return queryResponse.signIn;
  };

  const signupBtn = (
    <Text
      testID="signupBtn"
      accessibilityRole="button"
      onPress={goToSignUp}
      style={{ textAlign: "center", paddingTop: 10 }}
    >
      Don't have an account yet?
      <Text status="primary" category="s1">
        {" "}
        Sign Up
      </Text>
    </Text>
  );

  const ErrorText = ({ errMsg }) => (
    <Text
      testID="errText"
      status="danger"
      category="s1"
      style={{ textAlign: "center" }}
    >
      {errMsg}
    </Text>
  );

  const LoginForm = () => {
    return (
      <View>
        <Formik
          initialValues={savedLoginDetails}
          validationSchema={loginSchema}
          onSubmit={login}
        >
          {(props) => (
            <>
              <EmailField />
              <PasswordField />
              <Text
                testID="forgotPassBtn"
                category="c2"
                status="primary"
                accessibilityRole="button"
                onPress={forgotPassword}
                style={{ textAlign: "right", paddingBottom: 10 }}
              >
                Forgot Password?
              </Text>
              <ErrorText errMsg={loginErr} />
              <Button
                testID="loginBtn"
                onPress={props.handleSubmit}
                style={{ marginTop: 10 }}
              >
                Sign In
              </Button>
              {signupBtn}
            </>
          )}
        </Formik>
      </View>
    );
  };

  const signInPage = (
    <View style={(customStyle.content, customStyle.container)}>
      <Text category="h1" style={{ textAlign: "center" }}>
        WhatsAppDoc
      </Text>
      <View style={styles.imgContainer}>
        <Image source={loginImg} style={styles.img} />
      </View>
      <View style={styles.loginContainer}>
        <LoginForm />
      </View>
    </View>
  );

  if (loading) { // temporary comment
    return <LoadingScreen />;
  }

  return (
    <KeyboardAwareScrollView contentContainerStyle={customStyle.contentFill}>
      {signInPage}
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  img: {
    height: 200,
    width: 300,
    ...Platform.select({
      web: {
        height: 280,
        width: 350,
      },
    }),
  },
  imgContainer: {
    alignItems: "center",
    paddingTop: 10,
  },
  loginContainer: {
    paddingVertical: 15,
  },
});

export default SignInScreen;
