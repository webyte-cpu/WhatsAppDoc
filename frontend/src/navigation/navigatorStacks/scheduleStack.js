import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SchedulePage from '../../screens/home/schedulePage';
import DrawerMenuBtn from '../../components/drawer/drawerBtn';

const ScheduleStack = createStackNavigator();

const ScheduleStackScreen = (props) => (
  <ScheduleStack.Navigator>
    <ScheduleStack.Screen
      name="Schedule"
      component={SchedulePage}
      options={{
        headerLeft: () => (
          <DrawerMenuBtn props={props} />
        )
      }}
    />
  </ScheduleStack.Navigator>
)

export default ScheduleStackScreen;