import React, { useState } from 'react';
import { Input, Text } from '@ui-kitten/components';
import { View } from 'react-native';

const SignUpDoctor = ({specialization, licenseNum, editDoctorDetails }) => {
  return (
    <>
    <View testID="doctorVerification">
      <Text category="h6" style={{ marginBottom: 20, marginTop: 20 }}>
        Practitioner Information
      </Text>
      <Input
        testID="specialization"
        nativeID="specialization"
        label="Specialization"
        placeholder="Enter Specialization"
        value={specialization}
        onChange={(e) => editDoctorDetails(e)}
      />
      <Input
        testID="licenseNum"
        nativeID="licenseNum"
        label="License Number"
        placeholder="Enter License Number"
        value={licenseNum}
        onChange={(e) => editDoctorDetails(e)}
      />
    </View>
    </>
  );
};

export default SignUpDoctor;
