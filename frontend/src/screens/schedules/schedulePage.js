import React from 'react';
import DoctorScheduleNavigator from './doctorSchedules';
import { useAuth } from '../auth/utils/authProvider';
import enums from '../../../helpers/enums';
import AppointmentScreen from "./appointmentScreen";

const SchedulePage = () => {
  const {appState} = useAuth();
  return appState.user.role === enums.role.DOCTOR ? <DoctorScheduleNavigator/> : <AppointmentScreen />
}

export default SchedulePage;