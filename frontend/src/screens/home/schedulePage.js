import React from 'react';
import { View } from "react-native"
import { Text, Button } from '@ui-kitten/components'
import { AppRoute } from "../../navigation/app-routes";

const SchedulePage = ({navigation}) => {
  return (
    <View>
      <Text>
        Schedules
        <Button onPress={() => navigation.navigate(AppRoute.APPOINTMENT_PROPERTIES)}> Properties </Button>
      </Text>
    </View>
  )
}

export default SchedulePage;