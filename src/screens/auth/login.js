import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Platform,
  Image,
} from 'react-native';
import { Button, Text, Input, Icon } from '@ui-kitten/components';
import { AppRoute } from '../../navigation/app-routes';
import loginImg from '../../../assets/img/login-welcome.jpg';
import Template from '../template';
import { AuthContext } from './context';
import Users from './dummyDataUsers'

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
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


const LoginScreen = ({ navigation }) => {
  const nextFieldFocus = useRef(null);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [inputEmail, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const toggleSecureEntry = () => setSecureTextEntry(!secureTextEntry);

  const showPasswordIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={!secureTextEntry ? 'eye' : 'eye-off'} />
    </TouchableWithoutFeedback>
  );

  // Navigations
  const toNextField = () => nextFieldFocus.current.focus();

  // const login = () => {
  //   return navigation.navigate(AppRoute.HOME.name);
  // };

  const { signIn } = React.useContext(AuthContext);

  const loginHandle = () => {

    const foundUser = Users.filter(item => {
      return inputEmail == item.email && password == item.password;
    });

    if (inputEmail.length == 0 || password.length == 0) {
      alert('Username or password field cannot be empty.')
      return;
    }

    if (foundUser.length == 0) {
      alert('Username or password is incorrect.')
      return;
    }
    signIn(foundUser);
    // login();
  }

  const goToSignUp = () => navigation.navigate(AppRoute.SIGNUP.name);
  const forgotPassword = () => navigation.navigate(AppRoute.FORGOT_PASS.name);

  const inputFields = (
    <View>
      <Input
        testID="email"
        label="Email"
        selectTextOnFocus
        placeholder="Enter email"
        value={inputEmail}
        onChangeText={setEmail}
        returnKeyType="next"
        onSubmitEditing={toNextField}
      />
      <Input
        testID="password"
        label="Password"
        placeholder="Enter Password"
        accessoryRight={showPasswordIcon}
        secureTextEntry={secureTextEntry}
        value={password}
        onChangeText={setPassword}
        returnKeyType="go"
        ref={nextFieldFocus}
        onSubmitEditing={loginHandle}
      />
    </View>
  );

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

  const loginPage = (
    <View>
      <Text category="h1" style={{ textAlign: 'center' }}>
        WhatsAppDoc
      </Text>
      <View style={styles.imgContainer}>
        <Image source={loginImg} style={styles.img} />
      </View>
      <View style={styles.loginContainer}>
        {inputFields}
        <Text
          category="c1"
          status="primary"
          accessibilityRole="button"
          onPress={forgotPassword}
          style={{ textAlign: 'right', paddingBottom: 10 }}
        >
          Forgot Password?
        </Text>
        <Button onPress={loginHandle}>Login</Button>
        {signupBtn}
      </View>
    </View>
  );

  return (
    <Template children={loginPage} contentContainerStyle={styles.container} />
  );
};

export default LoginScreen;
