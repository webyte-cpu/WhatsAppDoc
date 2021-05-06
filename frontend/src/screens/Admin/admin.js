import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import {
  Text,
  Tab,
  TabView,
  Icon,
  List,
  ListItem,
  Divider,
  useTheme,
  TabBar,
} from "@ui-kitten/components";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import DoctorDetails from "./verification";
import { useQuery } from "@apollo/client";
import { GET_DOCTORS } from "./queries";
import customStyle from "../../../themes/styles";
import enums from "../../../helpers/enums";
import LoadingScreen from "../../components/loadingScreen";
import ProfileIcon from "../../components/profileIcon";

const { Navigator, Screen } = createMaterialTopTabNavigator();

const pendingIcon = (props) => <Icon {...props} name="clock-outline" />;
const verifiedIcon = (props) => (
  <Icon {...props} name="checkmark-circle-outline" />
);
const unverifiedIcon = (props) => <Icon {...props} name="close-outline" />;

const doctorStatus = (doctorVerificationStatus) => {
  const theme = useTheme();
  let bgColor;

  switch (doctorVerificationStatus) {
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
    <Text
      category="s2"
      style={{
        color: "white",
        backgroundColor: bgColor,
        margin: 5,
        padding: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
      }}
    >
      {doctorVerificationStatus}
    </Text>
  );
};

const TopTabBar = ({ navigation, state }) => {
  const theme = useTheme();

  return (
    <TabBar
      selectedIndex={state.index}
      onSelect={(index) => navigation.navigate(state.routeNames[index])}
      style={{ backgroundColor: theme["color-primary-light"] }}
    >
      <Tab title="PENDING" icon={pendingIcon} testID="pendingTab" />
      <Tab title="VERIFIED" icon={verifiedIcon} testID="verifiedTab" />
      <Tab title="UNVERIFIED" icon={unverifiedIcon} testID="unverifiedTab" />
    </TabBar>
  );
};

const Admin = () => {
  const theme = useTheme();
  const [doctorDetails, setDoctorDetails] = useState({});
  const [visible, setVisible] = useState(false);
  const { loading, error, data } = useQuery(GET_DOCTORS, { pollInterval: 500 });

  if (loading) {
    return <LoadingScreen />;
  }

  // TODO: Proper error handling
  if (error) return `Error! ${error.message}`;

  const doctors = data.getDoctor;

  const filterByStatus = (verificationStatus) =>
    doctors.filter(
      (doctor) => doctor.verificationStatus === verificationStatus
    );

  const handleClose = () => setVisible(false);
  const handleShow = (doctor) => {
    setVisible(true);
    setDoctorDetails(doctor);
  };

  // TODO: edit specialization rendering
  const renderItem = ({ item, index }) =>
    item !== null ? (
      <>
        <ListItem
          testID="doctorDetails"
          title={`${item.firstName}`}
          description={`${item.specialization[0]}`}
          accessoryLeft={() => (
            <ProfileIcon firstName={item.firstName} lastName={item.lastName} />
          )}
          accessoryRight={() => doctorStatus(item.verificationStatus)}
          onPress={() => handleShow(item)}
        />
        <Divider />
      </>
    ) : (
      <></>
    );

  const PendingScreen = () => {
    return (
      <List
        testID={"pendingList"}
        data={filterByStatus(enums.verificationStatus.PENDING)}
        renderItem={renderItem}
      />
    );
  };

  const VerifiedScreen = () => {
    return (
      <List
        testID={"verifiedList"}
        data={filterByStatus(enums.verificationStatus.VERIFIED)}
        ItemSeparatorComponent={Divider}
        renderItem={renderItem}
      />
    );
  };

  const UnverifiedScreen = () => {
    return (
      <List
        testID={"unverifiedList"}
        data={filterByStatus(enums.verificationStatus.UNVERIFIED)}
        ItemSeparatorComponent={Divider}
        renderItem={renderItem}
        style={customStyle.listBackground}
      />
    );
  };

  return (
    <>
      <Navigator
        tabBar={(props) => <TopTabBar {...props} />}
        style={{ backgroundColor: theme["color-primary-light-600"] }}
      >
        <Screen name="Pending" component={PendingScreen} />
        <Screen name="Verified" component={VerifiedScreen} />
        <Screen name="Unverified" component={UnverifiedScreen} />
      </Navigator>
      <DoctorDetails
        doctor={doctorDetails}
        isShown={visible}
        onHide={handleClose}
      />
    </>
  );
};

export default Admin;
