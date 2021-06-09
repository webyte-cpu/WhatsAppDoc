import { Button, Text } from "@ui-kitten/components";
import React from "react";
import { View } from "react-native";
import customStyle from "../../../themes/styles";
import ProfileIcon from "../../components/profileIcon";
import { AppRoute } from "../../navigation/app-routes";
import { useAuth } from "../auth/utils/authProvider";

const ProfilePage = ({ navigation }) => {
  const { appState } = useAuth();
  const { user } = appState;
  const fullname = `${user.firstName} ${
    user.middleName ? user.middleName.toUpperCase() + "." : ""
  } ${user.lastName}`;

  console.log(user);
  return (
    <>
      <View style={customStyle.contentFill}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <ProfileIcon
            firstName={user.firstName}
            lastName={user.lastName}
            dimensions={{ width: 100, height: 100 }}
          />
          <Text category="h4" style={{ marginLeft: 10 }}>
            {fullname}
          </Text>
        </View>
        {/* <Button onPress={() => navigation.navigate(AppRoute.MEDICAL_REC)}>
          Medical Record
        </Button> */}
      </View>
    </>
  );
};

export default ProfilePage;
