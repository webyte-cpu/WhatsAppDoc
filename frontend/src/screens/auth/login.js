import React, { useState } from 'react';
import { View, StyleSheet, Platform, Image } from 'react-native';
import { Button, Text, Spinner } from '@ui-kitten/components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AppRoute } from '../../navigation/app-routes';
import { useAuth } from './utils/authProvider';
import loginImg from '../../../assets/img/login-welcome.jpg';
import customStyle from '../../../themes/styles';
import { EmailField, PasswordField } from '../../components/fields';
import { Formik } from 'formik';
import { loginSchema } from '../../../helpers/validationType';
import { gql, useMutation } from '@apollo/client';
import LoadingScreen from '../../components/loadingScreen';
import { SIGNIN_MUTATION } from './utils/queries';

const SignInScreen = ({ navigation }) => {
  const auth = useAuth(); 
  const loginDetails = {
    email: '',
    password: '',
  };

  const [loginErr, setLoginErr] = useState('');
  const [signInUser, { loading, error, data }] = useMutation(SIGNIN_MUTATION, {
    ignoreResults: false,
    onCompleted({ signIn: token }) {
      if (token) {
        console.log(token);
        auth.login(token);
      }
    },
    onError(error) { // TODO: fix error handling
      if(error){
      setLoginErr('User not found')
      }
    }
  });

  const login = ({ email, password }) => {
    console.log(email, password);
    return signInUser({
      variables: {
        email: email,
        password: password,
      },
    });
  };

  const goToSignUp = () => navigation.navigate(AppRoute.SIGNUP);
  const forgotPassword = () => navigation.navigate(AppRoute.FORGOT_PASS);

  const signupBtn = (
    <Text
      testID="signupBtn"
      accessibilityRole="button"
      onPress={goToSignUp}
      style={{ textAlign: 'center', paddingTop: 10 }}
    >
      Don't have an account yet?
      <Text status="primary" category="s1">
        {' '}
        Sign Up
      </Text>
    </Text>
  );

  const ErrorText = ({ errMsg }) => (
    <Text testID="errText" status="danger" category="s1" style={{ textAlign: 'center' }}>
      {errMsg}
    </Text>
  );

  const LoginForm = () => (
    <View>
      <Formik
        initialValues={loginDetails}
        validationSchema={loginSchema}
        onSubmit={(values) => login(values)}
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
              style={{ textAlign: 'right', paddingBottom: 10 }}
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

  const signInPage = (
    <View style={(customStyle.content, customStyle.container)}>
      <Text category="h1" style={{ textAlign: 'center' }}>
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

  if (loading) { // TODO: create global loading component
    return <LoadingScreen />
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
    alignItems: 'center',
    paddingTop: 10,
  },
  loginContainer: {
    paddingVertical: 15,
  },
});

export default SignInScreen;
