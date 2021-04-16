import React from 'react';
import { Text, Button, useTheme } from '@ui-kitten/components';
import { View, Image } from 'react-native';
import { openImagePickerAsync } from '../../components/filePicker';
import customStyle from '../../../themes/styles';
import { Field } from 'formik';
import { CustomInput, CustomImgField } from '../../components/customInput';

const SignUpDoctor = ({ setValues, values }) => {
  const theme = useTheme();

  const pickImage = async () => {
    const result = await openImagePickerAsync();
    return setValues({ ...values, licenseImg: result });
  };

  const imgPreview = (
    <Image
      source={{ uri: values.licenseImg }}
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
        {values.licenseImg == '' ? noImgMsg : imgPreview}
      </View>
    </View>
  );

  return (
    <>
      <View testID="doctorVerification">
        <Text category="h6" style={customStyle.formTitle}>
          Practitioner Information
        </Text>
        <Field
          testID="specialization"
          component={CustomInput}
          name="specialization"
          label="Specialization"
          placeholder="Enter Specialization"
        />
        <Field
          testID="licenseNum"
          component={CustomInput}
          name="licenseNum"
          label="License Number"
          placeholder="Enter License Number"
          keyboardType="number-pad"
        />

        <Text category="label" style={{ color: theme['text-hint-color'] }}>
          License Image
        </Text>

        <Field
          testID="licenseImg"
          component={CustomImgField}
          name="licenseImg"
          accessoryLeft={uploadImgContent}
          disabled
        />
      </View>
    </>
  );
};

export default SignUpDoctor;
