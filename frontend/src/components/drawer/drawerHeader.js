import { Avatar, Divider, Text } from "@ui-kitten/components";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../screens/auth/utils/authProvider";

const ProfileHeader = () => {
  const auth = useAuth();
  const { fname, email } = auth.state.token;

  return (
    <SafeAreaView>
      <View style={{ marginLeft: 10, marginVertical: 10 }}>
        <Avatar size="giant" source={require("../../../assets/user.png")} />
        <Text category="h6"> {fname} </Text>
        <Text category="s1"> {email} </Text>
      </View>
      <Divider />
    </SafeAreaView>
  );
};

export default ProfileHeader;
