import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Platform,
  Image,
} from "react-native";
import { Button, Text, Input, Icon } from "@ui-kitten/components";
import { AppRoute } from "../../navigation/app-routes";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import loginImg from "../../../assets/img/login-welcome.jpg";
import Template from "../template";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
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
    alignItems: "center",
    paddingTop: 10,
  },
  loginContainer: {
    paddingVertical: 15,
  },
});

const LoginScreen = ({ navigation }) => {
  const nextFieldFocus = useRef(null);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [inputEmail, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleSecureEntry = () => setSecureTextEntry(!secureTextEntry);

  const showPasswordIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={!secureTextEntry ? "eye" : "eye-off"} />
    </TouchableWithoutFeedback>
  );

  // Navigations
  const toNextField = () => nextFieldFocus.current.focus();

  const login = () => {
    return navigation.navigate(AppRoute.HOME.name);
  };
  const goToSignUp = () => {};
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
        onSubmitEditing={login}
      />
    </View>
  );

  const signupBtn = (
    <Text
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

  const loginPage = (
    <>
      <Text category="h1" style={{ textAlign: "center" }}>
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
          style={{ textAlign: "right", paddingBottom: 10 }}
        >
          Forgot Password?
        </Text>
        <Button onPress={login}>Login</Button>
        {signupBtn}
      </View>
    </>
  );

  return (
    <Template
      backgroundColor="white"
      contentContainerStyle={styles.container}
      children={loginPage}
    />
  );
};

export default LoginScreen;
