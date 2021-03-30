import React from 'react'
import { Icon, TopNavigationAction } from '@ui-kitten/components';

const Drawer = ({ btnColor }) => {
  const drawerBtn = (btnColor, props) => <Icon {...props} name='menu' fill={btnColor}/>;

  return (
    <TopNavigationAction icon={(props) => drawerBtn(btnColor, props)} onPress={() => alert('open drawer')}/>
  )
}

export default Drawer;