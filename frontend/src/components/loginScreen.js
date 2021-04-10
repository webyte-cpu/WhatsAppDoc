import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Touchable } from 'react-native';
import { Button, Layout, Text, Input, Icon, Card } from '@ui-kitten/components';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // padding: 30
  },
  title: {
    paddingBottom: 50
  }
});

const LoginScreen = () => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const showPasswordIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={!secureTextEntry ? "eye" : "eye-off"} />
    </TouchableWithoutFeedback>
  )

  return (
    <Layout style={styles.container}>
      <View>
      <Text category="h2" style={styles.title}>WhatsAppDoc</Text>
      {/* <Card> */}
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
        <Button >Login</Button>
      {/* </Card> */}
      </View>
    </Layout>
  )
};

export default LoginScreen;