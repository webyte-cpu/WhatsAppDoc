import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Image, ScrollView} from 'react-native';
import { Button, Layout, Text, Input, Icon, Radio, RadioGroup, Datepicker } from '@ui-kitten/components';
import {SignUpDoctor,SignUpPatient} from './signUpRoles'

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
    width: 150,
    height: 150,
    borderWidth: 3,
    backgroundColor: 'transparent',
    margin: 5,
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
    width: 100,
    height: 100,
    resizeMode:'contain',
    
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
    <Layout style={styles.container}>
      <Text category="h2" style={styles.title}> {'\n \n WhatsAppDoc'}</Text>
      <Text style={styles.title}>Choose Account Type</Text>
      <View style={styles.buttonContainer}>

        <Button style={styles.button} disabled={selectedRole === 'Patient'} onPress={() => setSelectedRole('Patient')}>
          <Image style={styles.image} source={require('../../assets/role-patient.png')} />
          <Text style={{ color: 'white' }}>Patient</Text>
        </Button>

        <Button style={styles.button} disabled={selectedRole === 'Doctor'} onPress={() => setSelectedRole('Doctor')}>
          <Image style={styles.image} source={require('../../assets/role-doctor.png')} />  
          <Text style={{ color: 'white'}}>{'\n\n\n\nDoctor'}</Text>
        </Button>

      </View>

      <View style={styles.form}>
        <ScrollView>
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
        <Text category="h6" style={{marginBottom:20,marginTop:20}}>Personal Information</Text>

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
        {selectedRole === 'Patient' ? <SignUpPatient /> : <SignUpDoctor />}

        <Button>Signup</Button>
        </ScrollView>
      </View>
      
    </Layout>
  )
};

export default SignupScreen;