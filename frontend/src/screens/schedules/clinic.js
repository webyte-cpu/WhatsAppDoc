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
import { usePropertiesForm } from "../appointment/properties/formProvider";

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
    schedulingNotice: 15,
    scheduleSlotDuration: 30,
    consultationFee: 500,
    intervals: [
      {
        time: [
          { from: { hours: 12, minutes: 0, ampm: "pm"}, to: { hours: 6, minutes: 0, ampm: 'pm' } },
        ],
        days: [0, 2, 4],
      },
    ],
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
    schedulingNotice: 120,
    scheduleSlotDuration: 120,
    consultationFee: 580,
    intervals: [
      {
        time: [
          { from: { hours: 8, minutes: 0, ampm: 'am'}, to: { hours: 11, minutes: 0, ampm: 'am'} },
          { from: { hours: 1, minutes: 0, ampm: 'pm'}, to: { hours: 5, minutes: 0, ampm: 'pm'} },
        ],
        days: [1, 3, 5],
      },
    ],
  },
];

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

const goToProperties = (navigation, initialValues, form) => {
  form.setInitialValues(initialValues)
  return navigation.navigate(AppRoute.APPOINTMENT_PROPERTIES);
};

const ClinicPage = ({ navigation }) => {
  const form = usePropertiesForm()
  const theme = useTheme();
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
      },
      schedulingNotice: '',
      scheduleSlotDuration: '',
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
          onPress={() => goToProperties(navigation, item, form)}
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
        <List testID="clinicList" data={clinicData} renderItem={renderClinic} />
      </View>
      <AddNewClinicBtn setOpenModal={setOpenModal} />
      <NewClinicModal clinicDetails={clinicDetails} />
    </ScrollView>
  );
};

export default ClinicPage;
