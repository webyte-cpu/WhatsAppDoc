import React from 'react';
import { Text, View } from "react-native"
import { createStackNavigator } from '@react-navigation/stack';
import DrawerMenuBtn from '../../components/drawer';

const ScheduleStack = createStackNavigator();

const SchedulePage = () => {
  return (
    <View>
      <Text>
        Schedules
      </Text>
    </View>
  )
}

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