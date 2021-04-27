import React, { useState } from 'react';
import { View, StyleSheet, Platform, Image } from 'react-native';
import { Button, Text, Spinner } from '../profile/node_modules/@ui-kitten/components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AppRoute } from '../../navigation/app-routes';
import { useAuth } from './utils/authProvider';
import loginImg from '../../../assets/img/login-welcome.jpg';
import customStyle from '../../../themes/styles';
import { EmailField, PasswordField } from '../../components/fields';
import { Formik } from 'formik';
import { loginSchema } from '../../../helpers/validationType';
import { gql, useMutation } from "@apollo/client"
import { LOGIN_MUTATION } from "../auth/utils/queries"

// const LOGIN_MUTATION = gql`
//   mutation LoginMutation(
//     $userEmail: EmailAddress!
//     $userPassword: Password!
//   ){
//     login(
//       email: $userEmail
//       password: $userPassword
//     )
//   }
// `

const LoginScreen = ({ navigation }) => {

  const loginDetails = useState({
    email: '',
    password: '',
  });
  const [loginErr, setLoginErr] = useState('');
  const auth = useAuth();

  const [logindata] = useMutation(LOGIN_MUTATION,{
    variables:{
      userEmail: loginDetails.email,
      userPassword: loginDetails.password
    }
  });

  const login = ({ email, password}) => {
    email = logindata.userEmail
    password = logindata.userPassword 
  }

  // const login = async ({ email, password }) => {
  //   const result = await auth.login(email, password);
  //   if (!result.success) {
  //     return setLoginErr(result.error);
  //   }
  // };  

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
      {loginErr}
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
            <Button testID="loginBtn" onPress={props.handleSubmit} style={{ marginTop: 10 }}>
              Login
            </Button>
            {signupBtn}
          </>
        )}
      </Formik>
    </View>
  );

  const loginPage = (
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

  if (auth.state.isLoading) {
    return <Spinner testID="spinner" status="primary" size="giant" />;
  }

  return (
    <KeyboardAwareScrollView contentContainerStyle={customStyle.contentFill}>
      {loginPage}
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

export default LoginScreen;
