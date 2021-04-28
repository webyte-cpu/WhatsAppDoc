import React from 'react';
import { Text, Button, useTheme } from '@ui-kitten/components';
import { CustomInput, CustomImgField } from '../../components/customInput';
import { View, Image } from 'react-native';
import { openImagePickerAsync } from '../../components/filePicker';
import { Field } from 'formik';
import { DateField } from '../../components/fields';
import customStyle from '../../../themes/styles';

const SignUpDoctor = (props) => {
  const theme = useTheme();
  const fiveYearsMS = 157700000000;
  const fiveYearsLater = new Date(Date.now() + fiveYearsMS);

  const pickImage = async () => {
    const result = await openImagePickerAsync();
    return props.setValues({ ...props.values, licenseImg: result });
  };

  const imgPreview = (
    <View>
    <Image
      source={{ uri: props.values.licenseImg }}
      style={customStyle.uploadImgContainer}
    />
    </View>
  );

  const noImgMsg = (
    <Text
      category="c2"
      style={{ color: theme['text-hint-color'] }}
      testID="noImgSelected"
    >
      No image selected
    </Text>
  );

  const uploadImgContent = () => (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Button
        testID="addImgBtn"
        status="primary"
        appearance="outline"
        onPress={pickImage}
      >
        Choose File
      </Button>
      <View style={{ marginLeft: 10 }} testID="imgPreview">
        {props.values.licenseImg == '' ? noImgMsg : imgPreview}
      </View>
    </View>
  );

  return (
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
      <DateField
        {...props}
        name="expirationDate"
        label="Expiration Date"
        testID="expirationDate"
        max={fiveYearsLater}
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
  );
};

export default SignUpDoctor;
