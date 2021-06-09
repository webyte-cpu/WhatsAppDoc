import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Platform,
  FlatList,
  TouchableOpacity,
} from "react-native";
import {
  Calendar,
  Select,
  IndexPath,
  SelectItem,
  Divider,
  Button,
  Input,
  Text,
} from "@ui-kitten/components";
import SuccessModal from "./successModal";
import { getAvailableTime, timeToString } from "../../utils/getAvailableTime";
import * as R from "ramda";
import getStartTime from './utils/getStartTime'
import { useAuth } from "../auth/utils/authProvider";
import { pushNotification } from '../../notification/notification'

const ClinicInfo = ({ consultationFee, clinicName }) => {
  const prefix = (prefix) => (
    <Text category="s2" style={{ color: "gray" }}>
      {prefix}
    </Text>
  );

  return (
    <View>
      <Text category="label" style={{ marginTop: 20 }} appearance="hint">
        CLINIC
      </Text>
      <Input
        style={styles.inputContainer}
        textStyle={styles.inputValue}
        disabled={true}
        value={clinicName}
      />
      <Text category="label" style={{ marginTop: 20 }} appearance="hint">
        CONSULTATION FEE
      </Text>
      <Input
        style={styles.inputContainer}
        disabled={true}
        value={consultationFee}
        textStyle={styles.inputValue}
        accessoryLeft={() => prefix("Php")}
      />
    </View>
  );
};

const BookingScreen = ({ route, navigation, clinic }) => {
  // const clinic = route.params.selectedClinic
  console.log(clinic);
  // useEffect(() => {
  //     const unsubscribe = navigation.addListener("focus", () => {
  //         navigation.setOptions({
  //         title: clinic.name,
  //         });
  //     });

  //     return unsubscribe;
  //     }, [navigation]);
  const { appState } = useAuth();
  const [timeData, setTimeData] = useState([]);
  const [selectedTime, setSelectedTime] = useState();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [visible, setVisible] = useState(false);
  const availableDays = R.uniqBy(
    (x) => x.daysOfTheWeek,
    clinic.schedule
  ).flatMap((x) => x.daysOfTheWeek);

  useEffect(() => {
    if (selectedDate) {
      let availableTime = getAvailableTime(
        clinic.schedule,
        clinic.slotDurationInMins,
        clinic.appointment,
        selectedDate
      );
      if (!availableTime) {
        availableTime = [];
      }

      return setTimeData(availableTime);
    }
  }, [selectedDate]);

  const SelectTime = ({ timeData }) => {
    const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));
    const value = timeData[selectedIndex.row];
    const displayValue = value
      ? `${timeToString(value?.from)} - ${timeToString(value?.to)}`
      : null;
    console.log(value);
    const renderOption = ({ from, to }, index) => (
      <SelectItem
        key={index}
        title={`${timeToString(from)} - ${timeToString(to)}`}
      />
    );

    useEffect(() => {
      setSelectedTime(value);
    }, [])

    return (
      <View style={{ marginVertical: 10 }}>
        <Select
          label="TIME"
          placeholder="Select time"
          value={displayValue}
          selectedIndex={selectedIndex}
          onSelect={(index) => {
            setSelectedIndex(index);
          }}
          onBlur={() => {
            setSelectedTime(value);
          }}
        >
          {timeData.map(renderOption)}
        </Select>
      </View>
    );
  };

  const SelectDayAppointment = () => {
    return (
      <View style={{ alignSelf: "center", justifyContent: "center" }}>
        <Calendar
          filter={(date) => availableDays.includes(date.getDay())}
          style={styles.calendar}
          date={selectedDate}
          onSelect={(nextDate) => setSelectedDate(nextDate)}
        />
      </View>
    );
  };

  const handleClose = () => setVisible(false);
  const handleShow = () => { // attach send to db
    const startTime = getStartingTime(selectedTime)
    const date = selectedDate.toLocaleDateString()
    const schedule = `${date} ${startTime}`
    pushNotification({patient: appState.user.firstName},'ExponentPushToken[]','Clinic Name',schedule,'requestAppointment') // add doctor pushtoken and clinic name
    setVisible(true);
    console.log("data:", schedule);
  };

  return (
    <View>
      <ClinicInfo
        consultationFee={clinic.consultationFee}
        clinicName={clinic.name}
      />
      <SelectTime timeData={timeData} />
      <SelectDayAppointment />
      <Button style={{ marginVertical: 15 }} onPress={handleShow}>
        Book Appointment
      </Button>
      <SuccessModal isShown={visible} onHide={handleClose} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
    height: "100%",
  },
  inputValue: {
    color: "black",
    fontWeight: "bold",
  },
  inputContainer: {
    backgroundColor: "white",
    marginVertical: 5,
  },
  calendar: {
    width: 350,
  },
});

export default BookingScreen;
