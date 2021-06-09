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
import EmptyListText from "../../components/emptyListText";

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
  const { loading, error, data } = useQuery(GET_DOCTORS);

  if (loading) {
    return <LoadingScreen />;
  }

  // TODO: Proper error handling
  if (error) {
    console.error(error)
    return null
  };

  const doctors = data.getAllDoctor.map((doctor) => ({...doctor, verificationStatus: doctor.verificationStatus === 'DECLINED' ? 'UNVERIFIED': doctor.verificationStatus}))

  console.log(doctors)
  const filterByStatus = (verificationStatus) =>
    doctors.filter(
      (doctor) => doctor.verificationStatus === verificationStatus
    );

  const handleClose = () => setVisible(false);
  const handleShow = (doctor) => {
    setVisible(true);
    setDoctorDetails(doctor);
  };

  const renderItem = ({ item, index }) =>
    item !== null ? (
      <>
        <ListItem
          key={index}
          testID="doctorDetails"
          title={`${item.firstName} ${item.lastName}`}
          description={`${item.specialization.join(', ')}`}
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

    // const EmptyListText = () => (
    //   <View style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
    //     <Text appearance="hint" category="s1">Nothing to Display</Text>
    //   </View>
    // )

  const PendingScreen = () => {
    const data = filterByStatus(enums.verificationStatus.PENDING)
    return data.length === 0 ? (<EmptyListText />) : (
      <List
        testID={"pendingList"}
        data={data}
        renderItem={renderItem}
      />
    );
  };

  const VerifiedScreen = () => {
    const data = filterByStatus(enums.verificationStatus.VERIFIED)
    return data.length === 0 ? (<EmptyListText/>) : (
      <List
        testID={"verifiedList"}
        data={data}
        ItemSeparatorComponent={Divider}
        renderItem={renderItem}
      />
    );
  };

  const UnverifiedScreen = () => {
    const data = filterByStatus(enums.verificationStatus.UNVERIFIED)
    return data.length === 0 ? (<EmptyListText/>) : (
      <List
        testID={"unverifiedList"}
        data={data}
        ItemSeparatorComponent={Divider}
        renderItem={renderItem}
      />
    );
  };

  return (
    <>
      <Navigator
        tabBar={(props) => <TopTabBar {...props} />}
        style={{ backgroundColor: theme["color-primary-light-600"] }}
      >
        <Screen name="Pending" data-testid="pendingScreen" component={PendingScreen} />
        <Screen name="Verified" data-testid="verifiedScreen" component={VerifiedScreen} />
        <Screen name="Unverified" data-testid="unverifiedScreen" component={UnverifiedScreen} />
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
