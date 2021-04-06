import React from 'react'
import { Icon, TopNavigationAction } from '@ui-kitten/components';
import { AppRoute } from '../navigation/app-routes';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
}
  from '@react-navigation/drawer';

const DrawerMenu = ({ btnColor, navigation }) => {
  const drawerBtn = (btnColor, props) => <Icon {...props} name='menu' fill={btnColor} />;

  return (
    <TopNavigationAction icon={(props) => drawerBtn(btnColor, props)} onPress={() => navigation.toggleDrawer()} />
  )
}

const DrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Profile"
        onPress={() => props.navigation.navigate(AppRoute.PROFILE)}
      />
      <DrawerItem
        label="Bookmarks"
        onPress={() => props.navigation.navigate(AppRoute.BOOKMARKS)}
      />
      <DrawerItem
        label="Medical Records"
        onPress={() => props.navigation.navigate(AppRoute.MEDICAL_REC)}
      />
    </DrawerContentScrollView>
  );
}

const CreateDrawer = createDrawerNavigator();

const DrawerNavigator = ({ children }) => {
  return (
    <CreateDrawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <CreateDrawer.Screen name={AppRoute.HOME} component={children} />
    </CreateDrawer.Navigator>
  );
}

const Drawer = ({ children }) => {
  return (
    <DrawerNavigator children={children} />
  )
}


export { DrawerMenu, Drawer };