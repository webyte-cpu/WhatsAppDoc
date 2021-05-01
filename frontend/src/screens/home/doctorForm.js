import React, { useState } from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button, IndexPath, Text, Card, useTheme } from '@ui-kitten/components';
import { useAuth } from '../auth/utils/authProvider';
import { SIGNUP_MUTATION } from '../auth/utils/queries';
import { NameFields } from '../../components/fields';
import { formatDate } from '../auth/utils/formatters';
import SignUpDoctor from '../auth/signUpDoctor';
import customStyle from '../../../themes/styles';
import enums from '../../../helpers/enums';
import { Formik } from 'formik';
import LoadingScreen from '../../components/loadingScreen';
import { doctorSignUpSchema } from '../../../helpers/validationType';


const ROLE = enums.role;

const DoctorForm = ({ navigation }) => {
  const auth = useAuth();
  const theme = useTheme();

  const doctorDetails = {
    specialization: '',
    licenseNum: '',
    licenseImg: '',
    expirationDate: '',
    verificationStatus: enums.verificationStatus.PENDING, //default
  };
  const userDetails = {
    fname: '',
    lname: '',
    midName: '', //optional
  };

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

  // const resend = (values) => {
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

  const ResendForm = () => (
    <View style={{ ...customStyle.content}}>
      <Formik
        initialValues={doctorDetails}
        validationSchema={doctorSignUpSchema}
        onSubmit={(values) => resend(values)}
      >
        {(props) => (
          <>
            <Text category="h6" style={customStyle.formTitle}>
              Personal Information
          </Text>
            <NameFields />
            <SignUpDoctor {...props} />
            <Button
              testID="resendFormBtn"
              onPress={props.handleSubmit}
              style={{ marginTop: 15}}
            >
              Resend Form
          </Button>
          </>
        )}
      </Formik>
    </View>
  )

  // if (loading) {
  //   return <LoadingScreen />;
  // }

  // if (error) {
  //   console.log(error);
  //   return <Text>Error!</Text>;
  // }

  return (
    <KeyboardAwareScrollView>
      <ResendForm />
    </KeyboardAwareScrollView>
  );
};

export default DoctorForm;
