import { Button, Text } from "@ui-kitten/components";
import React from "react";
import { View } from "react-native";
import customStyle from "../../../themes/styles";
import { AppRoute } from "../../navigation/app-routes";
import { useAuth } from "../auth/utils/authProvider";

const ProfilePage = ({ navigation }) => {
  const auth = useAuth();
  const userEmail = auth.state.token.email;

  return (
    <>
      <View style={{ ...customStyle.content, marginTop: 10 }}>
        <Text>Profile</Text>
        <Text>{userEmail}</Text>
        <Button onPress={() => navigation.navigate(AppRoute.MEDICAL_REC)}>
          Medical Record
        </Button>
      </View>
    </>
  );
};

export default ProfilePage;
