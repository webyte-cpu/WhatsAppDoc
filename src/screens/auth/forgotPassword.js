import React, { useState } from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import {
  Button,
  Text,
  Input,
  Icon,
  TopNavigation,
  TopNavigationAction,
  Divider,
} from "@ui-kitten/components";
import { AppRoute } from "../../navigation/app-routes";
import Template from "../template";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const ForgotPassword = ({ navigation }) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [inputEmail, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleSecureEntry = () => setSecureTextEntry(!secureTextEntry);

  const showPasswordIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={!secureTextEntry ? "eye" : "eye-off"} />
    </TouchableWithoutFeedback>
  );

  const backBtn = (props) => <Icon {...props} name="arrow-back" />;

  const backAction = () => (
    <TopNavigationAction icon={backBtn} onPress={() => navigation.goBack()} />
  );

  const sendLink = () => navigation.navigate(AppRoute.LOGIN.name);

  const forgotPassPage = (
    <>
      <TopNavigation accessoryLeft={backAction} title="Forgot Password" />
      <Divider />
      <View style={{ padding: 30 }}>
        <Input
          testID="email"
          label="Email"
          selectTextOnFocus
          placeholder="Enter email"
          value={inputEmail}
          onChangeText={setEmail}
          style={{ paddingBottom: 10 }}
        />
        <Button onPress={sendLink}>Send Link</Button>
      </View>
    </>
  );
  return (
    <>
      <Template
        backgroundColor="white"
        contentContainerStyle={styles.container}
        children={forgotPassPage}
      />
    </>
  );
};

export default ForgotPassword;
