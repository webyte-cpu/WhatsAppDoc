import React from "react";
import { Spinner } from "@ui-kitten/components";
import { View } from "react-native";

const LoadingScreen = ({size = 'giant'}) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Spinner testID="loading" status="primary" size={size}></Spinner>
    </View>
  );
};

export default LoadingScreen;
