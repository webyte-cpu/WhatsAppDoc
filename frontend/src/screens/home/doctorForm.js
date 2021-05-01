import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, IndexPath, Text, useTheme, Card } from '@ui-kitten/components';
import { useAuth } from '../auth/utils/authProvider';
import { SIGNUP_MUTATION } from '../auth/utils/queries';
import {
  EmailField,
  PasswordField,
  DateField,
  NameFields,
  SexField,
} from '../../components/fields';
import { formatDate } from '../auth/utils/formatters';
import SignUpDoctor from '../auth/signUpDoctor';
import customStyle from '../../../themes/styles';
import enums from '../../../helpers/enums';
import { Formik } from 'formik';


const ROLE = enums.role;

const DoctorForm = ({ navigation }) => {
  const auth = useAuth();

  // const [doctorForm] = useMutation(SIGNUP_MUTATION, {
  //   onCompleted({ signUp: token }) {
  //     if (token) {
  //       console.log(token);
  //       auth.login(token);
  //     }
  //   },
  // });
  const RESEND_REQUEST = gql`
  mutation updateDoctor($uid:UUID!, $verificationStatus: VerificationStatus, licenceNum: String! ){
      updateDoctor(uid: $uid , verificationStatus: $verificationStatus){
        uid
        verificationStatus
        licenceNum
      }
  }
`

  // const signup = (values) => {
  //   console.log(values);
  //   console.log(values.licenseImg);

  //   const doctor =
  //     values === ROLE.DOCTOR
  //       ? {
  //           doctor: {
  //             licenceNum: values.licenseNum,
  //             licenceImg: values.licenseImg,
  //             licenceExp: formatDate(values.expirationDate),
  //             specialization: values.specialization,
  //             verificationStatus: values.verificationStatus,
  //           },
  //         }
  //       : {};

  //   return doctorForm({
  //     variables: {
  //       ...doctor,
  //     },
  //   });
  // };


  return (
      <View style={{ ...customStyle.content, marginTop: 10 }}>
      <Formik
        // onSubmit={(values) => signup(values)}
      >
        <NameFields />
        <SexField  />
        <DateField
          name="birthdate"
          label="Birthdate"
          testID="birthdate"
          max={new Date()}
        />
        <SignUpDoctor  />

      </Formik>
    </View>
  );
};

export default DoctorForm;
