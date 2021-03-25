import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, ImageBackground, ScrollView, Platform } from 'react-native';
import { Button, Layout, Text, Input, Icon, Radio, RadioGroup, Datepicker } from '@ui-kitten/components';
import SignUpDoctor from './signUpDoctor'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#4A40D5",
  },
  title: {
    paddingBottom: 10,
    color: 'white'
  },
  radio: {
    margin: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
    textAlign: 'center',
  },
  button: {
    width: 160,
    height: 160,
    margin: 5,
    borderWidth: 3,
    backgroundColor: 'transparent',
    ...Platform.select({
      web: {
        width:200,
        height:200
      }
    })
  },
  form: {
    flex: 1,
    width: '100%',
    padding: 50,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    borderTopLeftRadius: 70,
  },
  image: {
    width: 110,
    height: 110,
    ...Platform.select({
      web: {
        width:170,
        height:170
      }
    })
  },
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
  const [selectedRole, setSelectedRole] = useState('Patient');

  return (
    <ScrollView>
      <Layout style={styles.container}>
        <Text category="h2" style={styles.title}> {'\n \n WhatsAppDoc'}</Text>
        <Text style={styles.title}>Choose Account Type</Text>

        <View style={styles.buttonContainer}>
          <Button style={styles.button} disabled={selectedRole === 'Patient'} onPress={() => setSelectedRole('Patient')}>
            <ImageBackground source={require('../../assets/role-patient.png')} style={styles.image} />
          </Button>
          <Button style={styles.button} disabled={selectedRole === 'Doctor'} onPress={() => setSelectedRole('Doctor')}>
            <ImageBackground source={require('../../assets/role-doctor.png')} style={styles.image} />
          </Button>
        </View>

        <View style={styles.form}>

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
          <Text category="h6" style={{ marginBottom: 20, marginTop: 20 }}>Personal Information</Text>

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

          <Datepicker
            label='Birthdate'
            date={date}
            onSelect={nextDate => setDate(nextDate)}
          />

          <Text category="h6" style={{ marginBottom: 20, marginTop: 20 }}>Address Information</Text>
          <Input
            label='City'
            placeholder="Enter City"
          />
          <Input
            label='Province'
            placeholder="Enter Province"
          />
          <Input
            label='Zip Code'
            placeholder="Enter Zip Code"
          />
          <Input
            label='Country'
            placeholder="Enter Country"
          />
          
          {selectedRole === 'Doctor' ? (<SignUpDoctor />) : (<></>)}

          <Button>Signup</Button>
        </View>
      </Layout>
    </ScrollView>
  )
};

export default SignupScreen;