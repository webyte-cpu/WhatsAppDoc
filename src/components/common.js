import React from 'react';
import { View } from 'react-native';
import {
  TopNavigation,
  TopNavigationAction,
  Icon,
  Text
} from '@ui-kitten/components';
import Drawer from './drawer';
import { BackBtn } from './backBtn';
import { customStyle } from '../../themes/styles';

const TopHeaderView = ({ title, titleColor, btnColor = "#222b45", topbarColor = 'transparent', backTo = null, hasDrawer = false }) => {

  const leftIcon = (hasDrawer, btnColor, backTo) => {
    return hasDrawer ? <Drawer btnColor={btnColor} /> : <BackBtn backTo={backTo} btnColor={btnColor} />
  }

  return (
    <View>
      <TopNavigation
        accessoryLeft={() => leftIcon(hasDrawer, btnColor, backTo)}
        style={{ backgroundColor: { topbarColor } }}
      />
      <View>
        <Text category='h2' style={{...customStyle.content, color: titleColor}}>
          {title}
        </Text>
      </View>
    </View>
  )
};

export { TopHeaderView };
