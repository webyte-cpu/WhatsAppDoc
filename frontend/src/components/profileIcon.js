import React from "react";
import { Avatar, Text, useTheme } from "@ui-kitten/components";
import { ImageBackground, StyleSheet } from "react-native";
import { useAuth } from "../screens/auth/utils/authProvider";

//TODO: handle profile image
const ProfileIcon = ({ profileImg, firstName, lastName, dimensions = {width: 56, height: 56}}) => {
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
      ...dimensions
    },
  });

  // TODO: handle if profile image exists
  return (
    <Avatar
      ImageComponent={ImageBackground}
      shape="round"
      style={styles.avatar}
    >
      <Text style={styles.text}>
        {firstName[0].toUpperCase()}
        {lastName[0].toUpperCase()}
      </Text>
    </Avatar>
  );
};

export default ProfileIcon;
