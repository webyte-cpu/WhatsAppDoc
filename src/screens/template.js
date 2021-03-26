import React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const withoutScrollView = (children, contentContainerStyle, bgColor) => {
  const mergedStyles = {...contentContainerStyle, backgroundColor: bgColor, flex: 1 }
  
  return (
  <KeyboardAwareScrollView
    contentContainerStyle={mergedStyles}
  >
    <View>{children}</View>
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
    <SafeAreaView style={{ flex: 1 }}>
      {isScrollable
        ? withScrollView(children, contentContainerStyle, bgColor)
        : withoutScrollView(children, contentContainerStyle, bgColor)}
    </SafeAreaView>
  );
};

export default Template;
