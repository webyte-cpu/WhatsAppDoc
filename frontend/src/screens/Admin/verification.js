import React from "react";
import { StyleSheet, View, Image, Platform, Linking } from "react-native";
import { Button, Card, Modal, Text, useTheme } from "@ui-kitten/components";
import { useMutation } from "@apollo/client";
import { GET_DOCTORS, UPDATE_DOCTOR } from "./queries";
import enums from "../../../helpers/enums";
import {pushNotification} from '../../notification/notification'

const openLink = (url) => {
  Platform.OS == "web" ? window.open(url) : Linking.openURL(url);
};

const linkToPRC = (
  <Button
    testID="linkPRCBtn"
    status="info"
    style={{ marginTop: 20 }}
    size="medium"
    appearance="outline"
    onPress={() => openLink("https://online1.prc.gov.ph/Verification")}
  >
    Verify License Card at PRC site
  </Button>
);

const Header = ({ doctor }) => {
  const theme = useTheme();
  let bgColor;

  switch (doctor.verificationStatus) {
    case enums.verificationStatus.PENDING:
      bgColor = theme["color-warning-500"];
      break;
    case enums.verificationStatus.VERIFIED:
      bgColor = theme["color-success-500"];
      break;
    case enums.verificationStatus.UNVERIFIED:
      bgColor = theme["color-danger-500"];
      break;
  }
  return (
    <View style={{ backgroundColor: bgColor, padding: 15 }}>
      <Text category="h6">{doctor.firstName}</Text>
      <Text category="s2">{doctor.specialization[0]}</Text>
    </View>
  );
};

const Footer = ({ doctor, updateDoctorStatus, onHide }) => {
  const verifyBtn = () => {
    updateDoctorStatus(doctor.uid, "VERIFIED");
    pushNotification('',doctor.pushToken,'','','','verifyLicense')
    onHide();
  };

  const denyBtn = () => {
    updateDoctorStatus(doctor.uid, "DECLINED");
    pushNotification('',doctor.pushToken,'','','','denyLicense')
    onHide();
  };

  return doctor.verificationStatus === enums.verificationStatus.PENDING ? (
    <View style={styles.buttons}>
      <Button
        testID="denyBtn"
        style={styles.button}
        status="danger"
        appearance="outline"
        onPress={denyBtn}
      >
        Deny
      </Button>
      <Button testID="verifyBtn" style={styles.button} onPress={verifyBtn}>
        Verify
      </Button>
    </View>
  ) : (
    <></>
  );
};

const DoctorDetails = ({ doctor, isShown, onHide }) => {
  const [updateDoctor] = useMutation(UPDATE_DOCTOR, {
    onError: (err) => {
      console.error(err);

    },
    refetchQueries: [{ query: GET_DOCTORS }]
  });
  const updateDoctorStatus = (uidCode, verification) => {
    updateDoctor({
      variables: {
        uid: uidCode,
        verificationStatus: verification,
      },
    });
  };
  
  return (
    <Modal
      testID="doctorInformation"
      style={styles.container}
      visible={isShown}
      backdropStyle={styles.backdrop}
      onBackdropPress={onHide}
    >
      <Card
        disabled={true}
        header={(props) => <Header {...props} doctor={doctor} />}
        footer={(props) => (
          <Footer
            {...props}
            doctor={doctor}
            updateDoctorStatus={updateDoctorStatus}
            onHide={onHide}
          />
        )}
      >
        <Text category="s1">License Card Information</Text>
        <Image
          style={styles.image}
          source={{
            uri: doctor.licenceImg,
          }}
        />
        <Text category="s1">
          Birthdate:
          <Text> {doctor.birthdate}</Text>
        </Text>
        <Text category="s1">
          License Number:
          <Text> {doctor.licenceNum}</Text>
        </Text>
        <Text category="s1">
          License Expiration Date:
          <Text> {doctor.licenceExp}</Text>
        </Text>
        {doctor.verificationStatus === enums.verificationStatus.PENDING ? (
          linkToPRC
        ) : (
          <></>
        )}
      </Card>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    ...Platform.select({
      web: {
        width: 600,
      },
    }),
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  button: {
    marginHorizontal: 2,
  },
  buttons: {
    marginTop: 0,
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 10,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    ...Platform.select({
      web: {
        width: "100%",
        height: 300,
      },
    }),
  },
});

export default DoctorDetails;
