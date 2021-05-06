import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SchedulePage from '../../screens/home/schedulePage';
import AppointmentProperties from "../../screens/appointment/properties/properties"
import DrawerMenuBtn from '../../components/drawer/drawerBtn';
import { Button, Text, useTheme  } from '@ui-kitten/components'

const ScheduleStack = createStackNavigator();


const ScheduleStackScreen = (props) => {
  const theme = useTheme();
  return (
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
    <ScheduleStack.Screen
      name="AppointmentProperties"
      component={AppointmentProperties}
      options={{
        title: 'PROPERTIES',
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: theme['color-primary-default'],
        },
        headerRight: () => (
          <Button style={{ marginRight:10, backgroundColor:'white' }}>
            <Text style={{color: theme['color-primary-default'], fontWeight:'bold'}}> SAVE </Text> 
          </Button>
        )
      }}
    />
  </ScheduleStack.Navigator>
  )
}

export default ScheduleStackScreen;