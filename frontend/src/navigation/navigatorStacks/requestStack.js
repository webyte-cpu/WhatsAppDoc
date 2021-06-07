import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerMenuBtn from '../../components/drawer/drawerBtn';
import RequestPage from '../../screens/request/request';
import RequestPatientPage from '../../screens/request/request-patient';
import { AppRoute } from '../app-routes';
import { useAuth } from "../../screens/auth/utils/authProvider";
import enums from '../../../helpers/enums';


const RequestStack = createStackNavigator();

const RequestStackScreen = (props) => {
const {appState} = useAuth()
const ROLE = enums.role;


const requestPage = appState.user === ROLE.PATIENT ? RequestPage : RequestPatientPage 

  return(
    <RequestStack.Navigator>
    <RequestStack.Screen
      name={AppRoute.REQUEST}
      component={requestPage}
      options={{
        headerLeft: () => (
          <DrawerMenuBtn props={props} />
        )
      }}
    />
  </RequestStack.Navigator>
  )

}

export default RequestStackScreen;