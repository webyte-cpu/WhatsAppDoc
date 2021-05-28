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
import { usePropertiesForm } from "../appointment/properties/formProvider";
import { useQuery } from "@apollo/client";
import { GET_CLINICS, GET_SCHEDULES } from "./utils/queries";
import LoadingScreen from "../../components/loadingScreen";
import { clinicDataFromDB, intervalsFromDB } from "./utils/convertData";

const DeleteIcon = (props) => {
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
          onPress={() => console.log("remove clinic")}
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
  const { loading, error, data } = useQuery(GET_CLINICS);

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
        visible={openModal}
        style={customStyle.modalContainer}
        backdropStyle={customStyle.backdrop}
        onBackdropPress={() => setOpenModal(false)}
      >
        <Formik
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
    return (
      <View>
        <Text status="danger">Uh oh! an error has occurred</Text>
      </View>
    );
  }

  if (data) {
    const RenderClinic = ({ item, index }) => {
      const doctorClinicUid = item.doctorClinicUid;
      const { loading, error, data, refetch, networkStatus } = useQuery(
        GET_SCHEDULES,
        {
          variables: { doctorClinicUid },
        }
      );

      useEffect(() => {
        refetch(); // TODO: open for refactoring
      }, [doctorClinicUid]);

      if (error) {
        console.log(error);
        return (
          <View style={{ justifyContent: "center", alignContent: "center" }}>
            <Text status="danger">Error has occured</Text>
          </View>
        );
      }

      if (loading) {
        return <LoadingScreen />;
      }

      const intervals = intervalsFromDB(data.getSchedule);
      const clinicData = { ...item, intervals };
      const formattedData = clinicDataFromDB(clinicData); // final data for frontend

      return clinicData !== null ? (
        <>
          <ListItem
            key={index}
            testID={`clinic-${index}`}
            title={`${formattedData.clinicName}`}
            accessoryRight={(props) => (
              <DeleteIcon {...props} clinic={formattedData.clinicName} />
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
