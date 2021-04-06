import React from 'react'
import { Icon, TopNavigationAction } from '@ui-kitten/components';
import { AppRoute } from '../navigation/app-routes';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,} 
  from '@react-navigation/drawer';

const DrawerMenu = ({ btnColor,navigation }) => {
  const drawerBtn = (btnColor, props) => <Icon {...props} name='menu' fill={btnColor}/>;

  return (
    <TopNavigationAction icon={(props) => drawerBtn(btnColor, props)} onPress={() => navigation.toggleDrawer()}/>
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
        label="Close drawer"
        onPress={() => props.navigation.toggleDrawer()}
      />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

const DrawerNavigator = ({children}) => {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name={AppRoute.HOME} component={children} />
    </Drawer.Navigator>
  );
}

const MyDrawer = ({children}) => {
  return(
    <DrawerNavigator children={children} />
  )
}


export {DrawerMenu,MyDrawer};