import React from 'react';
import { View } from 'react-native';
import {
  TopNavigation,
  TopNavigationAction,
  Icon,
  Text
} from '@ui-kitten/components';

const TopHeaderView = ({title, component, titleColor, btnColor, topbarColor = 'transparent', backTo}) => {
  const backBtn = (btnColor = "#222b45", props) => <Icon {...props} name='arrow-back' fill={btnColor}/>;

  const backAction = (btnColor, backTo) => (
    <TopNavigationAction icon={(props) => backBtn(btnColor, props)} onPress={() => backTo()} />
  );
  return (
  <View>
    <TopNavigation
      accessoryLeft={() => backAction(btnColor, backTo)}
      style={{ backgroundColor: { topbarColor } }}
    />
    <View>
      <Text category='h2' style={{ paddingLeft: 30, color: titleColor }}>
        {title}
      </Text>
      {component}
    </View>
  </View>
)};

export { TopHeaderView };
