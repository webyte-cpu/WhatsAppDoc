import React from 'react';
import {View, Text, Button, TextInput, SafeAreaView} from 'react-native'

const Login = () => {
  return (
    <SafeAreaView>
      <View>
        <TextInput placeholder="Email" />
        <Button title='Login'/>
      </View>
    </SafeAreaView>
  )
}
export default Login;