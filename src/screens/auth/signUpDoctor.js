import React, { useState } from 'react';
import { Input, Text, Button, useTheme } from '@ui-kitten/components';
import { View, Image } from 'react-native';
import { openImagePickerAsync } from '../../components/filePicker';
import customStyle from '../../../themes/styles';

const SignUpDoctor = ({ specialization, licenseNum, editDoctorDetails }) => {
  const theme = useTheme();
  const [selectedImg, setSelectedImg] = useState(null);

  const pickImage = async () => {
    const result = await openImagePickerAsync();
    setSelectedImg(result);
    editDoctorDetails('licenseImg', result);
  };

  const imgPreview = (
    <Image
      source={{ uri: selectedImg }}
      style={customStyle.uploadImgContainer}
    />
  );

  const noImgMsg = (
    <Text category="c2" style={{ color: theme['text-hint-color'] }}>
      No image selected
    </Text>
  );

  const uploadImgContent = () => (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Button status="primary" appearance="outline" onPress={pickImage}>
        Upload
      </Button>
      <View style={{ marginLeft: 10 }}>
        {selectedImg == null ? noImgMsg : imgPreview}
      </View>
    </View>
  );

  return (
    <>
      <View testID="doctorVerification">
        <Text category="h6" style={customStyle.formTitle}>
          Practitioner Information
        </Text>
        <Input
          testID="specialization"
          label="Specialization"
          placeholder="Enter Specialization"
          value={specialization}
          onChangeText={(value) => editDoctorDetails('specialization', value)}
          returnKeyType="next"
        />
        <Input
          testID="licenseNum"
          label="License Number"
          placeholder="Enter License Number"
          value={licenseNum}
          onChangeText={(value) => editDoctorDetails('licenseNum', value)}
          keyboardType='number-pad'
        />
        <Text category="label" style={{ color: theme['text-hint-color'] }}>
          License Image
        </Text>
        <Input
          textStyle={{ color: theme['text-hint-color'], fontSize: 12 }}
          accessoryLeft={uploadImgContent}
          disabled
        />
      </View>
    </>
  );
};

export default SignUpDoctor;
