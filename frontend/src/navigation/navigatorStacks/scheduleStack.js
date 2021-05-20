import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View } from 'react-native';

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

const ScheduleStack = createStackNavigator();

const deconstructData = (item) => {
  const deconstructedAddress = { ...item.address };
  const itemObj = R.omit(["address"], item); // {all without address}

  return { ...itemObj, ...deconstructedAddress };
};

const getInvalidFields = (dataObj) => {
  const data = deconstructData(dataObj);
  const notRequiredKeys = ["roomNumber"];
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

const formatTime = (hours, minutes, ampm) => {
    let hourValue = hours;

    if(hourValue === 12 && ampm === 'am') {
      hourValue = 0
    }

    if(hourValue !== 12 && ampm === 'pm') {
      hourValue += 12
    }

    const formatNum = (num) => num.toString().padStart(2,0)
    return `${formatNum(hourValue)}:${formatNum(minutes)}`
  } 

const editIntervals = (values, clinicUID) => { 
  const {intervals} = R.clone(values)
  const newIntervals = intervals.map((interval) => 
     interval.time.map(({ from, to }) => ({
       doctorClinicUid: clinicUID,
       startTime: formatTime(from.hours, from.minutes, from.ampm), 
       endTime: formatTime(to.hours, to.minutes, to.ampm), // TODO: convert 12hr to 24hr
       daysOfTheWeek: interval.days})))

  return newIntervals
}

const getClinicData = (values) => {
  return {
    name: values.clinicName,
    roomNumber: values.roomNumber,
    address: values.address,
    minimumSchedulingNoticeMins: values.schedulingNotice,
    slotDurationInMins: values.scheduleSlotDuration,
    consultationFee: values.consultationFee
  }
}

const getScheduleData = (values) => values.intervals

const AlertModal = ({open, setOpen }) => {
  return (
    <Modal
      visible={open}
      style={customStyle.modalContainer}
      backdropStyle={customStyle.backdrop}
      onBackdropPress={() => setOpen(false)} //temporary
      style={{justifyContent: 'center', alignSelf: 'center'}}
    >
      <Card style={{width: 'fit-content'}}>
        <Spinner size='large' status='primary'/>
      </Card>
    </Modal>
  )
}

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
              const { initialValues, values } = usePropertiesForm();
              const [open, setOpen] = useState(false);

              const saveData = () => {
                const error = handleSaveError(initialValues, values);

                if (error) {
                  alert(error.join(" , "));

                  return;
                }

                if (R.equals(initialValues, values)) {
                  // if no changes to saved data
                  setOpen(true)
                  return setTimeout(() => { // fake save
                    setOpen(false)
                    return navigation.navigate(AppRoute.CLINICS)
                  }, 1500)
                }

                
                // save clinic, then save
                setOpen(true) // if loading
                // const newIntervals = editIntervals(values)
                // const saveValues = {...values, intervals: newIntervals}
                // console.log("SAVING...", saveValues);
                return;
              };

              return (
               <View>
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
                  <AlertModal open={open} setOpen={setOpen}/> 
                </View>
              );
            },
          })}
        />
      </ScheduleStack.Navigator>
    </PropertiesFormProvider>
  );
};

export default ScheduleStackScreen;
