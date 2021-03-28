import React from 'react';
import { View } from 'react-native';
import {
  TopNavigation,
  TopNavigationAction,
  Icon,
  Text
} from '@ui-kitten/components';

const TopHeaderView = ({title, component, titleColor, btnColor, topbarColor = 'transparent', backTo = null, hasDrawer = false }) => {
  const backBtn = (btnColor = "#222b45", props) => <Icon {...props} name='arrow-back' fill={btnColor}/>;

  const backAction = (btnColor, backTo) => (
    <TopNavigationAction icon={(props) => backBtn(btnColor, props)} onPress={() => backTo()} />
  );

  const drawer = 'something'

  const leftIcon = (hasDrawer, btnColor, backTo) => {
    return hasDrawer ? drawer : backAction(btnColor, backTo)
  }

  return (
  <View>
    <TopNavigation
      accessoryLeft={() => leftIcon(hasDrawer, btnColor, backTo)}
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
