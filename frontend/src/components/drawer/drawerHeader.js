import React from "react";
import { Divider, Text, Icon, useTheme } from "@ui-kitten/components";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../screens/auth/utils/authProvider";
import ProfileIcon from "../profileIcon";
import enums from '../../../helpers/enums';

const VerifiedIcon = (props) => {
  const theme = useTheme();
  return(
  <Icon {...props} 
  style={{ width: 16, height: 16, marginLeft:2}} 
  fill={theme['color-success-400']} 
  name='checkmark-circle-2' />
  )
}

const ProfileHeader = () => {
  const { appState } = useAuth();
  const { firstName, lastName, email, verificationStatus } = appState.user;

  return (
    <SafeAreaView>
      <View style={{ marginLeft: 10, marginVertical: 10 }}>
        <ProfileIcon size="giant" firstName={firstName} lastName={lastName}/>
        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
          <Text category="h6">
            {firstName} {lastName} 
          </Text>
          {verificationStatus === enums.verificationStatus.VERIFIED ? <VerifiedIcon /> : <></> }
        </View>
        <Text category="c1" style={{}}>{email}</Text>
      </View>
      <Divider />
    </SafeAreaView>
  );
};

export default ProfileHeader;
