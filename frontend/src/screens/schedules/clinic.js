import React, { useEffect, useState } from "react";
import { ScrollView, View, TouchableWithoutFeedback } from "react-native";
import {
  Text,
  Button,
  List,
  Icon,
  Divider,
  ListItem,
  useTheme,
  Modal,
  Card,
} from "@ui-kitten/components";
import customStyle from "../../../themes/styles";
import { AppRoute } from "../../navigation/app-routes";
import { Formik, Field } from "formik";
import { CustomInput } from "../../components/customInput";
import { clinicNameSchema } from "../../../helpers/validationType";
import { usePropertiesForm } from "./properties/formProvider";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_CLINIC, GET_CLINICS } from "./utils/queries";
import LoadingScreen from "../../components/loadingScreen";
import { clinicDataFromDB, intervalsFromDB } from "../../utils/convertData";
import { useAuth } from "../auth/utils/authProvider";
import * as R from 'ramda';

const DeleteIcon = (props) => {
  const { appState } = useAuth();
  const [deleteClinic] = useMutation(DELETE_CLINIC, {
    refetchQueries: [{
      query: GET_CLINICS, 
      variables: {
        doctorUid: appState.user.uid
      }
    }]
  })

  const [visible, setVisible] = useState(false);
  const FooterBtns = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          padding: 10,
        }}
      >
        <Button
          testID="cancelBtn"
          onPress={() => setVisible(false)}
          status="basic"
        >
          Cancel
        </Button>
        <Button
          testID="deleteBtn"
          onPress={async () => await deleteClinic({ variables: {uid: props.uid }})}
          style={{ marginLeft: 5 }}
        >
          Delete
        </Button>
      </View>
    );
  };

  const DeleteModal = () => {
    return (
      <Modal
        testID="delete-clinic-modal"
        visible={visible}
        style={customStyle.modalContainer}
        backdropStyle={customStyle.backdrop}
        onBackdropPress={() => setVisible(false)}
      >
        <Card footer={FooterBtns}>
          <Text category="s1">
            Do you really want to delete {props.clinic}?
          </Text>
        </Card>
      </Modal>
    );
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setVisible(true)}>
        <Icon {...props} name="trash" />
      </TouchableWithoutFeedback>
      <DeleteModal />
    </>
  );
};

const AddNewClinicBtn = ({ setOpenModal }) => {
  const theme = useTheme();
  const addIcon = (props) => (
    <Icon
      {...props}
      testID="addIcon"
      name="plus-outline"
      fill={theme["color-primary-500"]}
    />
  );

  const btnTitle = (props) => (
    <Text
      {...props}
      testID="btnTitle"
      style={{ color: theme["color-primary-500"] }}
      category="s2"
    >
      Add New Clinic
    </Text>
  );

  return (
    <ListItem
      testID="addNewClinicBtn"
      title={btnTitle}
      accessoryLeft={addIcon}
      style={{ backgroundColor: theme["color-primary-transparent-100"] }}
      onPress={() => setOpenModal(true)}
    />
  );
};

const goToProperties = (navigation, initialValues, form) => {
  form.setInitialValues(initialValues);
  return navigation.navigate(AppRoute.APPOINTMENT_PROPERTIES);
};

const ClinicPage = ({ navigation, route }) => {
  const { appState } = useAuth();
  const { loading, error, data } = useQuery(GET_CLINICS, {
    variables: { doctorUid: appState.user.uid }
  });
  const form = usePropertiesForm();
  const [openModal, setOpenModal] = useState(false);
  const clinicDetails = {
    clinicName: "",
  };

  const sendData = (values) => {
    const clinicProperties = {
      // SETS INITIAL VALUES IN ROUTE.PARAMS
      roomNumber: "",
      address: {
        streetAddress: "",
        city: "",
        province: "",
        country: "",
        zipCode: "",
        coordinates: "",
      },
      schedulingNotice: "",
      scheduleSlotDuration: "",
      consultationFee: "",
      intervals: [],
      ...values,
    };
    setOpenModal(false);

    goToProperties(navigation, clinicProperties, form);
  };

  const NewClinicModal = () => {
    return (
      <Modal
        testID="new-clinic-modal"
        visible={openModal}
        style={customStyle.modalContainer}
        backdropStyle={customStyle.backdrop}
        onBackdropPress={() => setOpenModal(false)}
      >
        <Formik
          testID="formik"
          initialValues={clinicDetails}
          validationSchema={clinicNameSchema}
          onSubmit={(values) => sendData(values)}
        >
          {({ handleSubmit }) => (
            <Card>
              <Field
                component={CustomInput}
                testID="clinicName"
                name="clinicName"
                label="Clinic Name"
                placeholder="Enter clinic name"
                autoCapitalize='sentences'
              />
              <Button onPress={() => handleSubmit()}>Next</Button>
            </Card>
          )}
        </Formik>
      </Modal>
    );
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    console.error(error);
    return null
  }

  if (data) {
    
    const RenderClinic = ({ item, index }) => {
      if (error) {
        console.log(error);
        return null;
      }

      if (loading) {
        return <LoadingScreen />;
      }

      let intervals = item.schedule;
      if(item.schedule != null) {
        intervals = intervalsFromDB(item.schedule);
      }
      const clinicData = { ...(R.omit(['schedule'], item)), intervals};
      const formattedData = clinicDataFromDB(clinicData); // final data for frontend
      return clinicData !== null ? (
        <>
          <ListItem
            key={index}
            testID={`clinic-${index}`}
            title={`${formattedData.clinicName}`}
            accessoryRight={(props) => (
              <DeleteIcon {...props} clinic={formattedData.clinicName} uid={formattedData.uid} />
            )}
            onPress={() => {
              goToProperties(navigation, formattedData, form);
            }}
          />
          <Divider />
        </>
      ) : (
        <> </>
      );
    };

    return (
      <ScrollView style={customStyle.listBackground}>
        <View>
          <List
            testID="clinicList"
            data={data.getClinic}
            renderItem={(props) => <RenderClinic {...props} />}
          />
        </View>
        <AddNewClinicBtn setOpenModal={setOpenModal} />
        <NewClinicModal clinicDetails={clinicDetails} />
      </ScrollView>
    );
  }
};

export default ClinicPage;
