import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Platform, Image, SafeAreaView } from 'react-native';
import { Button, Layout, Text, Input, Icon, Card } from '@ui-kitten/components';
import loginImg from '../../../assets/img/login-welcome.jpg';
import { AppRoute } from '../../navigation/app-routes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30
  },
  img: {
    height: 200,
    width: 300,
    ...Platform.select({
      web: {
        height: 280,
        width: 350,
      }
    })
  },
  imgContainer: {
    alignItems: 'center',
    paddingTop: 10,
  },
  loginContainer: {
    paddingVertical: 15,
  }
});

const LoginScreen = ({ navigation }) => { // navigation props for navigating
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const toggleSecureEntry = () => setSecureTextEntry(!secureTextEntry);

  const showPasswordIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={!secureTextEntry ? "eye" : "eye-off"} />
    </TouchableWithoutFeedback>
  )

  const signupBtn = (
    <Text
      accessibilityRole="button"
      onPress={goToSignUp}
      style={{ textAlign: 'center', paddingTop: 10 }}
    >
      Don't have an account yet? 
      <Text status="primary" category="s1"> Sign Up</Text>
    </Text>
  )

  const inputFields = (
    <>
      <Input
        label='Email'
        placeholder='Enter email'
      />
      <Input
        label='Password'
        placeholder='Enter Password'
        accessoryRight={showPasswordIcon}
        secureTextEntry={secureTextEntry}
      />
    </>
  )

  // Navigations
  const login = () => {
    return navigation.navigate(AppRoute.HOME.name)
  }
  const goToSignUp = () => {}
  const forgotPassword = () => navigation.navigate(AppRoute.FORGOT_PASS.name)

  return (
    <SafeAreaView style={{ flex: 1}}>
      <Layout style={styles.container}>
        <Text category="h1" style={{ textAlign: 'center' }}>WhatsAppDoc</Text>
        <View style={styles.imgContainer}>
          <Image source={loginImg} style={styles.img}/>
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
          <Button onPress={login}>Login</Button>
          {signupBtn}
        </View>
      </Layout>
    </SafeAreaView>
  )
};

export default LoginScreen;