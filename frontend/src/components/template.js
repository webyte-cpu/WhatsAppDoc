import React from 'react';
import { ScrollView, View, StatusBar, Platform, NativeModules, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const { StatusBarManager } = NativeModules;

const withoutScrollView = (children, contentContainerStyle, bgColor) => {
 
  const mergedStyles = {...contentContainerStyle, flex: 1, backgroundColor: bgColor }
  
  return (
  <KeyboardAwareScrollView
    contentContainerStyle={mergedStyles}
  >
    <View>
      {children}
    </View>
  </KeyboardAwareScrollView>
)};

const withScrollView = (children, contentContainerStyle, bgColor) => (
  <ScrollView>
    {withoutScrollView(children, contentContainerStyle, bgColor)}
  </ScrollView>
);

const Template = ({
  isScrollable = false,
  bgColor = 'white',
  contentContainerStyle = {},
  children,
}) => {
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <SafeAreaView style={{ flex: 1 }}>
      {isScrollable
        ? withScrollView(children, contentContainerStyle, bgColor)
        : withoutScrollView(children, contentContainerStyle, bgColor)}
      </SafeAreaView>
    </View>
  );
};

export default Template;
