import React, { useState } from "react";
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

const DeleteIcon = (props) => {
  const theme = useTheme();
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

const goToProperties = (navigation, initialValues) => navigation.navigate(AppRoute.APPOINTMENT_PROPERTIES, {initialValues: initialValues})
const ClinicPage = ({ navigation }) => {
  const theme = useTheme();
  const [openModal, setOpenModal] = useState(false);
  const clinicDetails = {
    clinicName: "",
  };

  const sendData = (values) => {
    const clinicProperties = {
      roomNumber: "",
      address: {
        streetAddress: "",
        city: "",
        province: "",
        country: "",
        zipCode: "",
      },
      minimumSchedulingNoticeMins: "",
      slotDurationInMins: "",
      consultationFee: "",
      ...values,
    };
    setOpenModal(false);
    goToProperties(navigation, clinicProperties)
  };

  const clinicData = [
    {
      clinicName: "Clinic 1",
      roomNumber: "",
      address: {
        streetAddress: "Brgy. Milibili",
        city: "Roxas City",
        province: "Capiz",
        country: "Philippines",
        zipCode: "5800",
      },
      minimumSchedulingNoticeMins: "15",
      slotDurationInMins: "30",
      consultationFee: "500",
    },
    {
      clinicName: "Clinic 2",
      roomNumber: "",
      address: {
        streetAddress: "Brgy. Loctugan",
        city: "Roxas City",
        province: "Capiz",
        country: "Philippines",
        zipCode: "5800",
      },
      minimumSchedulingNoticeMins: "120",
      slotDurationInMins: "45",
      consultationFee: "580",
    },
  ];

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
              />
              <Button onPress={() => handleSubmit()}>Next</Button>
            </Card>
          )}
        </Formik>
      </Modal>
    );
  };

  const renderClinic = ({ item, index }) => {
    return item !== null ? (
      <>
        <ListItem
          key={index}
          testID={`clinic-${index}`}
          title={`${item.clinicName}`}
          accessoryRight={(props) => (
            <DeleteIcon {...props} clinic={item.clinicName} />
          )}
          onPress={() =>
            goToProperties(navigation, item)
          }
          />
          <Divider />
      </> 
    ) : (
      <> </>
    );
  };

  return (
    <ScrollView style={customStyle.listBackground}>
      <List testID="clinicList" data={clinicData} renderItem={renderClinic} />
      <AddNewClinicBtn setOpenModal={setOpenModal} />
      <NewClinicModal clinicDetails={clinicDetails} />
    </ScrollView>
  );
};

export default ClinicPage;
