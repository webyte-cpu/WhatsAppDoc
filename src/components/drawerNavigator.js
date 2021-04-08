import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContentScrollView, DrawerItemList, DrawerItem, Drawer } from '@ui-kitten/components';
import { AppRoute } from '../navigation/app-routes';
import ProfileScreen from '../screens/profile/profile';
import BookMarks from '../screens/bookmarks/bookmarks';
import ProfileNavigator from '../screens/profile/profileNavigator';
import HomeNavigator from '../screens/home/homeNavigator';
import BottomNavigator from '../screens/home/bottomNavigator';

const CreateDrawer = createDrawerNavigator();


const DrawerContent = (props) => {
  return (
      // <Drawer
      // selectedIndex={new IndexPath(state.index)}
      // onSelect={(index) => navigation.navigate(state.routeNames[index.row])}
      // >
      <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
        <DrawerItem
          label="Profile"
        />
        <DrawerItem
          label="Bookmarks"
        />
        <DrawerItem
          label="Medical Records"
        />
        </DrawerContentScrollView>
    // </Drawer>
  );
}

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

export default Drawer;
