import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Template = ({ backgroundColor, contentContainerStyle, children}) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <KeyboardAwareScrollView contentContainerStyle={contentContainerStyle}>
        <View>
          {children}
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}

export default Template;