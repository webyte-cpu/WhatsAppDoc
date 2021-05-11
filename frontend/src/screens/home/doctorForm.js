import React, { useState } from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button, IndexPath, Text, Card, useTheme } from '@ui-kitten/components';
import { useAuth } from '../auth/utils/authProvider';
import { NameFields } from '../../components/fields';
import { formatDate } from '../auth/utils/formatters';
import SignUpDoctor from '../auth/signUpDoctor';
import customStyle from '../../../themes/styles';
import enums from '../../../helpers/enums';
import { Formik } from 'formik';
import LoadingScreen from '../../components/loadingScreen';
import { doctorSignUpSchema } from '../../../helpers/validationType';
import { gql, useMutation } from '@apollo/client';

const ROLE = enums.role;

const UPDATE_DOCTOR = gql`
    mutation updateDoctor(
      $uid:UUID!, 
      $licenceNum: String, 
      $licenceImg: String, 
      $about: String,
      $licenceExp: Date,
      $verificationStatus: VerificationStatus )
      {
        updateDoctor(
          uid: $uid , 
          licenceNum: $licenceNum, 
          licenceImg: $licenceImg, 
          about: $about, 
          licenceExp: $licenceExp,
          verificationStatus: $verificationStatus){
            uid
        }
    }
`

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

  const [updateDoctor, { errorMutate }] = useMutation(UPDATE_DOCTOR)


  // const resend = (values) => {
    
  //   // const doctor = {
  //   //   doctor: {
  //   //     uid: "b429f877-069c-42fb-9e48-088f351b5328",
  //   //     licenseNum: "test",
  //   //     licenseImg: "test",
  //   //     licenseEXP: formatDate(values.expirationDate),
  //   //     specialization: "oby",
  //   //     verificationStatus: "PENDING"
  //   //   }
  //   // };

  //   updateDoctor({
  //     variables: {
  //       uid: "b429f877-069c-42fb-9e48-088f351b5328",
  //       verificationStatus: "PENDING"
  //     }
  //   })
  //   if (errorMutate) {
  //     console.log(errorMutate)
  // }


  // }

  


  const resend = (values) => {
    console.log(formatDate(values.expirationDate))
    updateDoctor({
        variables: {
            uid: "b429f877-069c-42fb-9e48-088f351b5328",
            licenceNum: values.licenseNum,
            licenceImg: "test",
            about: values.specialization,
            licenceEXP: formatDate(values.expirationDate),
            verificationStatus: "PENDING"
        }
    });

    if (errorMutate) {
        console.log(errorMutate)
    }
}

  const ResendForm = () => (
    <View style={{ ...customStyle.content}}>
      <Formik
        initialValues={doctorDetails}
        validationSchema={doctorSignUpSchema}
        onSubmit={(values) => resend(values)}
      >
        {(props) => (
          <>

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
