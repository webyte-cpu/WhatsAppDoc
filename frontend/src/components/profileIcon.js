import React from "react";
import { Avatar, Text, useTheme } from "@ui-kitten/components";
import { ImageBackground, StyleSheet } from "react-native";
import { useAuth } from "../screens/auth/utils/authProvider";

//TODO: handle profile image
const ProfileIcon = ({ size, profileImg, firstName, lastName }) => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    text: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
    },
    avatar: {
      resizeMode: "cover",
      justifyContent: "center",
      backgroundColor: theme["color-primary-500"],
    },
  });

  // TODO: handle if profile image exists
  return (
    <Avatar
      ImageComponent={ImageBackground}
      shape="round"
      style={styles.avatar}
      size={size ?? "medium"}
    >
      <Text style={styles.text}>
        {firstName[0]}
        {lastName[0]}
      </Text>
    </Avatar>
  );
};

export default ProfileIcon;
