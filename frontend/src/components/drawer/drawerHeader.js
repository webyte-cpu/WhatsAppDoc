import React from "react";
import { Divider, Text } from "@ui-kitten/components";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../screens/auth/utils/authProvider";
import ProfileIcon from "../profileIcon";

const ProfileHeader = () => {
  const { appState } = useAuth();
  const { firstName, lastName, email } = appState.user;

  return (
    <SafeAreaView>
      <View style={{ marginLeft: 10, marginVertical: 10 }}>
        <ProfileIcon size="giant" firstName={firstName} lastName={lastName}/>
        <Text category="h6" style={{ marginTop: 10 }}>
          {firstName} {lastName}
        </Text>
        <Text category="c1">{email}</Text>
      </View>
      <Divider />
    </SafeAreaView>
  );
};

export default ProfileHeader;
