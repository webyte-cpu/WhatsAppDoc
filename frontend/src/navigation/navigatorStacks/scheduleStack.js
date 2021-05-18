import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SchedulePage from "../../screens/schedules/schedulePage";
import AppointmentProperties from "../../screens/appointment/properties/properties";
import DrawerMenuBtn from "../../components/drawer/drawerBtn";
import { Button, Text, useTheme, Modal, Card, Spinner,View } from "@ui-kitten/components";
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

const AlertModal = () => {
  const [openModal, setOpenModal] = useState(true)
  
  // const Footer = (footerProps) => {
  //   return (
  //     <View {...footerProps}>
        
  //     </View>
  //   )
  // }
  return (
    <Modal
        visible={openModal}
        style={customStyle.modalContainer}
        backdropStyle={customStyle.backdrop}
      >
        <Spinner size='large' status='primary'/>
      {/* <Card footer={(props) => <Footer {...props}/>}>
        <Button onPress={() => handleSubmit()}>Next</Button>
      </Card> */}
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

              const saveData = () => {
                const error = handleSaveError(initialValues, values);

                if (error) {
                  alert(error.join(" , "));

                  return;
                }

                if (R.equals(initialValues, values)) {
                  // if no changes to saved data
                  alert("Nothing to save, exiting...", initialValues, values);
                  return
                  // <AlertModal />
                }
                // save to db then alert
                // return <AlertModal />
                // const []
                console.log("SAVING...", values);
                return;
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
