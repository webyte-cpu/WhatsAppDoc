import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View, useWindowDimensions } from 'react-native';
import { useMutation } from "@apollo/client";
import SchedulePage from "../../screens/schedules/schedulePage";
import AppointmentProperties from "../../screens/schedules/properties/properties";
import DrawerMenuBtn from "../../components/drawer/drawerBtn";
import { Button, Text, useTheme } from "@ui-kitten/components";
import { AppRoute } from "../app-routes";
import { usePropertiesForm} from "../../screens/schedules/properties/formProvider";
import { DELETE_SCHEDULES, GET_CLINICS, SAVE_CLINIC_MUTATION, SAVE_SCHEDULE_MUTATION } from "../../screens/schedules/utils/queries";
import { intervalsToDB } from "../../utils/convertData.js";
import { getClinicData, handleSaveError, toUpperCase } from "../../screens/schedules/utils/saveHelpers";
import EmptyFieldsModal from "../../screens/schedules/utils/errorModal";
import * as R from "ramda";
import { useAuth } from "../../screens/auth/utils/authProvider";
import breakpoints from "../../utils/breakpoints";
import DoctorForm from "../../screens/home/doctorForm";

const ScheduleStack = createStackNavigator();

const ScheduleStackScreen = (props) => {
  const theme = useTheme();
  const dimensions = useWindowDimensions();

  return (
      <ScheduleStack.Navigator>
        <ScheduleStack.Screen
          name={AppRoute.SCHEDULE}
          component={SchedulePage}
          options={{
            headerLeft: () => {
              if(dimensions.width < breakpoints.lg) return <DrawerMenuBtn props={props} />
            },
          }}
        />
        <ScheduleStack.Screen
          name={AppRoute.DOCTOR_FORM}
          component={DoctorForm}
        />
        <ScheduleStack.Screen
          name={AppRoute.APPOINTMENT_PROPERTIES}
          component={AppointmentProperties}
          options={({ route, navigation }) => ({
            headerTintColor: "white",
            headerStyle: {
              backgroundColor: theme["color-primary-default"],
            },
            headerRight: () => {
              const { appState } = useAuth()
              const { initialValues, values, setLoading, intervalsToDelete } = usePropertiesForm()
              const [deleteSchedules] = useMutation(DELETE_SCHEDULES, {
                onCompleted: () => {
                  setLoading(false)
                  return navigation.navigate(AppRoute.CLINICS)
                },
                onError: (error) => {
                  if(error) {
                    console.error(error)
                  }
                },
                refetchQueries: [
                  {
                  query: GET_CLINICS, 
                  variables: {
                    doctorUid: appState.user.uid
                  }
                }]
              })
              const [saveSchedule] = useMutation(SAVE_SCHEDULE_MUTATION, {
                onCompleted: async () => {
                  if(intervalsToDelete.length > 0) {
                    const getUIDS = R.pluck('uid')
                    const uids = getUIDS(intervalsToDelete)
                    const trimmedUIDS = uids.filter((uid) => uid != undefined)
                    console.log('uids', trimmedUIDS) 

                    if(trimmedUIDS.length > 0) {
                      return await deleteSchedules({ variables: {uids: trimmedUIDS}})
                    }
                  }

                  setLoading(false)
                  return navigation.navigate(AppRoute.CLINICS)
                },
                onError: (error) => {
                  if(error) {
                    console.error(error)
                  }
                },
                refetchQueries: [
                  {
                  query: GET_CLINICS, 
                  variables: {
                    doctorUid: appState.user.uid
                  }
                }]
              })
              const [ saveClinic ] = useMutation(SAVE_CLINIC_MUTATION, {
                onCompleted: async ({result}) => {
                  console.log(result);
                  const newIntervals = intervalsToDB(values.intervals)
                  await saveSchedule({ variables: {doctorClinicUid: result.doctorClinicUid, schedList: newIntervals} })
                },
                onError: (error) => {
                  if(error) {
                    console.error(error)
                  }
                },
                refetchQueries: [
                  {
                  query: GET_CLINICS, 
                  variables: {
                    doctorUid: appState.user.uid
                  }
                }]
              })

              const [showErr, setShowErr] = useState({
                status: false,
                fields: []
              })

              // SAVE CLINIC DATA
              const saveData = async () => { 
                const error = handleSaveError(initialValues, values);

                // empty fields
                if (error) { 
                  const transformedErrKeys = error.map((key) => key.replace(/(?=[A-Z])[A-Z]/g, toUpperCase))
                  .map((converted) => converted.replace(/^[a-z]/, (match) => `??? ${match.toUpperCase()}`))
                  .join('\n')
                  setShowErr({status: true, fields: transformedErrKeys})
                  return;
                }
                setLoading(true)
                // fake save if no changes to saved data
                if (R.equals(initialValues, values)) {
                  return setTimeout(() => { 
                    setLoading(false)
                    return navigation.navigate(AppRoute.CLINICS)
                  }, 800)
                }
                
                const clinicData = getClinicData(values)
                console.log(clinicData, 'FINAL DATA')
                await saveClinic({variables: clinicData})
              };

              return (
                <View>
                  <Button
                  testID="scheduleSaveBtn"
                  appearance="filled"
                  size="small"
                    style={{ marginRight: 10, backgroundColor: "white" }}
                    onPress={() => saveData()}
                  >
                    <Text
                      style={{
                        color: theme["color-primary-default"],
                        fontWeight: "bold",
                      }}
                    >
                      Save
                    </Text>
                  </Button> 
                  <EmptyFieldsModal fields={showErr.fields} showErr={showErr.status} setShowErr={setShowErr} />
                </View>
              );
            },
          })}
        />
      </ScheduleStack.Navigator>
  );
};

export default ScheduleStackScreen;
