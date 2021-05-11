import React, { useState } from "react";
import { ScrollView, View, TouchableWithoutFeedback } from "react-native";
import {
  Text,
  Button,
  List,
  Icon,
  Popover,
  Divider,
  ListItem,
  useTheme,
  Modal,
  Card,
} from "@ui-kitten/components";
import customStyle from "../../../themes/styles";

const MenuIcon = (props) => {
  const [openMenu, setOpenMenu] = useState(false);

  const MenuBtn = () => {
    return (
      <TouchableWithoutFeedback onPress={() => setOpenMenu(true)}>
        <Icon
          {...props}
          name="
more-vertical-outline"
        />
      </TouchableWithoutFeedback>
    );
  };
  const PopoverMenu = () => {
    return (
      <Popover
        anchor={MenuBtn}
        visible={openMenu}
        placement="bottom-end"
        onBackdropPress={() => setOpenMenu(false)}
      >
        <Text>something</Text>
      </Popover>
    );
  };
  return (
    <>
      <MenuBtn />
      <PopoverMenu />
    </>
  );
};

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

const AddNewClinicBtn = () => {
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
      onPress={() => console.log("go to properties")}
    />
  );
};

const ClinicPage = () => {
  const theme = useTheme();

  const clinicData = [
    { name: "Clinic 1" },
    { name: "Clinic 2" },
    { name: "Clinic 3" },
    { name: "Clinic 1" },
    { name: "Clinic 2" },
    { name: "Clinic 3" },
    { name: "Clinic 1" },
    { name: "Clinic 2" },
    { name: "Clinic 3" },
    { name: "Clinic 1" },
    { name: "Clinic 2" },
    { name: "Clinic 3" },
  ];

  const renderClinic = ({ item, index }) => {
    return item !== null ? (
      <>
        <ListItem
          testID={`clinic-${index}`}
          title={`${item.name}`}
          accessoryRight={(props) => (
            <DeleteIcon {...props} clinic={item.name} />
          )}
          onPress={() => console.log("go to properties")}
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
      <AddNewClinicBtn />
    </ScrollView>
  );
};

export default ClinicPage;
