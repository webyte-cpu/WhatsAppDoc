import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View } from 'react-native';
import { useMutation } from "@apollo/client";
import SchedulePage from "../../screens/schedules/schedulePage";
import AppointmentProperties from "../../screens/appointment/properties/properties";
import DrawerMenuBtn from "../../components/drawer/drawerBtn";
import { Button, Text, useTheme, Modal, Card, Spinner } from "@ui-kitten/components";
import { AppRoute } from "../app-routes";
import {
  PropertiesFormProvider,
  usePropertiesForm,
} from "../../screens/appointment/properties/formProvider";
import * as R from "ramda";
import customStyle from "../../../themes/styles";
import { GET_CLINICS, GET_SCHEDULES, SAVE_CLINIC_MUTATION, SAVE_SCHEDULE_MUTATION } from "../../screens/schedules/queries";
import { clinicDataToDB, intervalsToDB } from "../../screens/schedules/utils/convertData";

const ScheduleStack = createStackNavigator();

const deconstructData = (item) => {
  const deconstructedAddress = { ...item.address };
  const itemObj = R.omit(["address"], item); // {all without address}

  return { ...itemObj, ...deconstructedAddress };
};

const getInvalidFields = (dataObj) => {
  const data = deconstructData(dataObj);
  const notRequiredKeys = ["roomNumber", "coordinates"];
  const invalidKeys = [];

  for (const key in data) {
    if (R.isEmpty(data[key]) || R.isNil(data[key])) {
      if (!notRequiredKeys.includes(key)) {
        invalidKeys.push(key);
      }
    }
  }

  return invalidKeys;
};

const handleSaveError = (initialValues, values) => {
  // if saving...
  const dataObj = R.isEmpty(values) ? initialValues : values;
  const invalidFields = getInvalidFields(dataObj);

  if (invalidFields.length > 0) {
    return invalidFields;
  }

  return null;
};

const getClinicData = (values) => clinicDataToDB(R.omit(["intervals"], values))

const ScheduleStackScreen = (props) => {
  const theme = useTheme();

  return (
    <PropertiesFormProvider>
      <ScheduleStack.Navigator>
        <ScheduleStack.Screen
          name={AppRoute.SCHEDULE}
          component={SchedulePage}
          options={{
            headerLeft: () => <DrawerMenuBtn props={props} />,
          }}
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
              const { initialValues, values, setLoading, isLoading } = usePropertiesForm();
              const [saveSchedule] = useMutation(SAVE_SCHEDULE_MUTATION, {
                onCompleted: () => {
                  setLoading(false)
                  return navigation.navigate(AppRoute.CLINICS)
                },
                onError: (error) => {
                  if(error) {
                    console.error(error)
                  }
                },
                refetchQueries: [{query: GET_CLINICS}]
              })

              const [ saveClinic ] = useMutation(SAVE_CLINIC_MUTATION, {
                onCompleted: async ({result}) => {
                  const newIntervals = intervalsToDB(values.intervals)
      
                  const saveValues = newIntervals.map((interval) => ({doctorClinicUid: result.doctorClinicUid, ...interval}))
                  console.log(saveValues)
                  await saveSchedule({ variables: {data: saveValues} })
                },
                onError: (error) => {
                  if(error) {
                    console.log('whra')
                    console.error(error)

                  }
                }
              })

              const saveData = async () => {
                const error = handleSaveError(initialValues, values);

                if (error) {
                  alert(error.join(" , "));
                  return;
                }
                 
                // if no changes to saved data
                setLoading(true)

                if (R.equals(initialValues, values)) {
                  return setTimeout(() => { // fake save
                    setLoading(false)
                    return navigation.navigate(AppRoute.CLINICS)
                  }, 1000)
                }

                const clinicData = getClinicData(values)
                console.log(clinicData)
                await saveClinic({variables: clinicData})
              };

              return (
                <Button
                    style={{ marginRight: 10, backgroundColor: "white" }}
                    onPress={() => saveData()}
                  >
                  <Text
                    style={{
                      color: theme["color-primary-default"],
                      fontWeight: "bold",
                    }}
                  >
                    SAVE
                  </Text>
                </Button> 
              );
            },
          })}
        />
      </ScheduleStack.Navigator>
    </PropertiesFormProvider>
  );
};

export default ScheduleStackScreen;
