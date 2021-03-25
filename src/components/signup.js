import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Touchable } from 'react-native';
import { Button, Layout, Text, Input, Icon, Card, Radio, RadioGroup, Datepicker } from '@ui-kitten/components';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    paddingBottom: 50
  },
  radio: {
    margin: 2,
  }
});

const SignupScreen = () => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const showPasswordIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={!secureTextEntry ? "eye" : "eye-off"} />
    </TouchableWithoutFeedback>
  )
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [date, setDate] = React.useState(new Date());

  return (
    <Layout style={styles.container}>
      <View>
        <Text category="h2" style={styles.title}> {'\n \n WhatsAppDoc'}</Text>
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
        <Text>{'\nPersonal Info'}</Text>

        <Input
          label='First Name'
          placeholder="Enter First Name"
        /> 
        <Input
          label='Last Name'
          placeholder="Enter Last Name"
        /> 
      <Text>Sex:</Text>

      <RadioGroup
        selectedIndex={selectedIndex}
        onChange={index => setSelectedIndex(index)}>
        <Radio style={styles.radio}>Male</Radio>
        <Radio style={styles.radio}>Female</Radio>
      </RadioGroup>

      <Text>Birthdate:</Text>

      <Datepicker
        date={date}
        onSelect={nextDate => setDate(nextDate)}
      />

        <Button>Signup</Button>

      </View>
    </Layout>
  )
};

export default SignupScreen;