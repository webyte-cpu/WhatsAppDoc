import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerMenuBtn from '../../components/drawer/drawerBtn';
import RequestPage from '../../screens/request/request';
import RequestPatientPage from '../../screens/request/request-patient';
import { AppRoute } from '../app-routes';
import { useAuth } from "../../screens/auth/utils/authProvider";
import enums from '../../../helpers/enums';
import { useWindowDimensions } from 'react-native';
import breakpoints from '../../utils/breakpoints';

const RequestStack = createStackNavigator();

const RequestStackScreen = (props) => {
  const dimensions = useWindowDimensions();
  const {appState} = useAuth()
  const ROLE = enums.role;

  return(
    <RequestStack.Navigator>
    <RequestStack.Screen
      name={AppRoute.REQUEST}
      component={appState.user.role === ROLE.DOCTOR ? RequestPage : RequestPatientPage }
      options={{
        headerLeft: () => {
          if(dimensions.width < breakpoints.lg) return <DrawerMenuBtn props={props} />
        },
        title: "Requests"
      }}
    />
  </RequestStack.Navigator>
  )

}

export default RequestStackScreen;