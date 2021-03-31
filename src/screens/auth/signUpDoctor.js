import React, { useState } from 'react';
import { Input, Text } from '@ui-kitten/components';
import { View } from 'react-native';

const SignUpDoctor = ({ specialization, licenseNum, editDoctorDetails }) => {
  return (
    <>
      <View testID="doctorVerification">
        <Text category="h6" style={{ marginBottom: 20, marginTop: 20 }}>
          Practitioner Information
        </Text>
        <Input
          testID="specialization"
          label="Specialization"
          placeholder="Enter Specialization"
          value={specialization}
          onChangeText={(value) => editDoctorDetails('specialization', value)}
        />
        <Input
          testID="licenseNum"
          label="License Number"
          placeholder="Enter License Number"
          value={licenseNum}
          onChangeText={(value) => editDoctorDetails('licenseNum', value)}
        />
      </View>
    </>
  );
};

export default SignUpDoctor;
