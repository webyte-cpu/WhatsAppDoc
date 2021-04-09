import { Avatar, Divider, Text } from "@ui-kitten/components";
import React from "react";
import { View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../screens/auth/utils/authProvider";

const ProfileHeader = ({ navigation }) => {
  const auth = useAuth();
  const { fname, email } = auth.state.token;

  return (
    <SafeAreaView>
      <View style={{ marginLeft: 10, marginVertical: 10 }}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate("ProfileStack")}
        >
          <Avatar size="giant" source={require("../../../assets/user.png")} />
        </TouchableOpacity>
        <Text category="h6"> {fname} </Text>
        <Text category="s1"> {email} </Text>
      </View>
      <Divider />
    </SafeAreaView>
  );
};

export default ProfileHeader;
