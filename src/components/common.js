import React from 'react';
import { View } from 'react-native';
import { TopNavigation, Text, useTheme } from '@ui-kitten/components';
import { BackBtn } from './backBtn';
import customStyle from '../../themes/styles';
import {DrawerIcon} from './drawer';

const TopHeaderView = ({
  navigation,
  title,
  titleColor = null,
  btnColor = null,
  topbarColor = 'transparent',
  backTo = null,
  hasDrawer = false,
}) => {
  const theme = useTheme();

  const leftIcon = (hasDrawer, btnColor, backTo) => {
    return hasDrawer ? (
      <DrawerIcon navigation={navigation} btnColor={btnColor ?? theme['color-primary-dark']} />
    ) : (
      <BackBtn
        backTo={backTo}
        btnColor={btnColor ?? theme['color-primary-dark']}
      />
    );
  };

  return (
    <View>
      <TopNavigation
        accessoryLeft={() => leftIcon(hasDrawer, btnColor, backTo)}
        style={{ backgroundColor: { topbarColor } }}
      />
      <View>
        <Text
          category="h2"
          style={{ ...customStyle.content, color: titleColor }}
        >
          {title}
        </Text>
      </View>
    </View>
  );
};

export { TopHeaderView };
