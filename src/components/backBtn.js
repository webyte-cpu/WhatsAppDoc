import React from 'react';
import { Icon, TopNavigationAction } from '@ui-kitten/components';

export const BackBtn = ({ navigation, btnColor, backTo }) => {
  const backBtn = (btnColor, props) => <Icon {...props} name='arrow-back' fill={btnColor}/>;

  return (
    <TopNavigationAction icon={(props) => backBtn(btnColor, props)} onPress={() => backTo()} />
  )
}