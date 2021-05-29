import React from "react";
import { Icon, useTheme } from "@ui-kitten/components";
import { TouchableWithoutFeedback, View } from "react-native";

// drawer button with toggle function
const DrawerMenuBtn = ({ props }) => {
  const theme = useTheme();

  return (
    <View style={{ padding: 10 }}>
      <TouchableWithoutFeedback onPress={() => props.navigation.toggleDrawer()}>
        <Icon
          name="menu"
          fill={theme["color-primary-dark"]}
          style={{ width: 25, height: 25 }}
        />
      </TouchableWithoutFeedback>
    </View>
  );
};

export default DrawerMenuBtn;
