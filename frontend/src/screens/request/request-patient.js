import React from "react";
import { useAuth } from "../auth/utils/authProvider";
import { ScrollView, View, StyleSheet } from "react-native";
import {
  Text,
  Button,
  List,
  Icon,
  Divider,
  ListItem,
  Tab,
  useTheme,
} from "@ui-kitten/components";
import customStyle from "../../../themes/styles";
import enums from "../../../helpers/enums";
import TimeAgo from "javascript-time-ago"; //https://github.com/catamphetamine/javascript-time-ago
import en from "javascript-time-ago/locale/en";
import { GET_ALL_APPOINTMENT, UPDATE_APPOINTMENT_MUTATION } from "./queries";
import { useQuery, useMutation } from "@apollo/client";
import { pushNotification } from "../../notification/notification";
import LoadingScreen from "../../components/loadingScreen";

const RequestPatientPage = ({ navigation }) => {
  const { appState } = useAuth();
  const user = appState.user;

  const [updateAppointment, { errorMutate }] = useMutation(
    UPDATE_APPOINTMENT_MUTATION
  );
  const { loading, error, data } = useQuery(GET_ALL_APPOINTMENT, {
    pollInterval: 500,
  });
  if (loading) return <LoadingScreen />;
  if (error) {
    console.log(error);
    return null;
  }

  const handleAppointmentReject = (uid) => {
    updateAppointment({
      variables: {
        uid: uid,
        status: enums.status.CANCELLED,
      },
    });

    if (errorMutate) {
      console.log(errorMutate);
    }
  };

  const cancelAppointment = (item) => {
    handleAppointmentReject(item.uid);
    pushNotification(
      { patient: user.firstName },
      item.clinic.doctor.pushToken,
      item.clinic.name,
      item.dateTime,
      "cancelAppointment"
    );
  };

  let items = data.getAllAppointment;
  if (user.role === enums.role.DOCTOR) {
    items = items.filter((appointment) => {
      return appointment.clinic.doctor.uid === user.uid;
    });
  } else {
    items = items.filter((appointment) => {
      return (
        appointment.patient.uid === user.uid &&
        appointment.status === enums.status.PENDING
      );
    });
  }

  TimeAgo.addLocale(en);

  const theme = useTheme();
  const LocationIcon = (...props) => (
    <Icon
      {...props}
      style={[props.style, { width: 15, height: 15, padding: 5 }]}
      fill="#000045"
      name="navigation-2-outline"
    />
  );
  const TimeIcon = (...props) => (
    <Icon
      {...props}
      style={[props.style, { width: 15, height: 15, padding: 5 }]}
      fill="#000045"
      name="clock-outline"
    />
  );

  const GetWeekDays = ({ date }) => {
    const [weekday, month, day] = new Date(date).toString().split(" ");

    return (
      <View
        style={{
          width: 50,
          height: 70,
          backgroundColor: "#4A40D5",
          borderRadius: 10,
          textAlign: "center",
        }}
      >
        <Text
          style={{
            marginTop: 10,
            color: "#FFFFFF",
            fontSize: 10,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {weekday}
        </Text>
        <Text
          style={{
            color: "#FFFFFF",
            fontSize: 22,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {day}
        </Text>
      </View>
    );
  };
  const Status = ({ title }) => {
    const status = title;
    return (
      <View>
        <Tab
          title={status}
          style={{
            backgroundColor: theme["color-primary-light"],
            paddingVertical: 3,
            paddingHorizontal: 10,
            borderRadius: 5,
          }}
        ></Tab>
      </View>
    );
  };

  const GetTimeAgo = ({ dateTime }) => {
    const timeCreated = new Date(dateTime);
    const timeAgo = new TimeAgo("en-US");
    const now = new Date();
    const before = timeCreated.getTime();
    const getMiliSec = now - before;

    const day = timeAgo.format(new Date() - getMiliSec, "twitter");

    return (
      <View style={{ flex: 1, padding: 5 }}>
        <Text style={{ textAlign: "right", color: "#A9A9A9" }}>{day}</Text>
      </View>
    );
  };

  const Difference = (dateTime) => {
    const appointmentTime = new Date(dateTime);
    const now = new Date();
    const diff = (appointmentTime.getTime() - now.getTime()) / 1000;
    const x = diff / (60 * 60);
    const getDiffinHrs = Math.round(x);
    return getDiffinHrs;
  };

  const cancelingHandler = (item) => {
    const minimum = item.minimumSchedulingNoticeMins / 60;
    const getDiffinHrs = Difference(item.dateTime);

    if (
      getDiffinHrs < minimum ||
      [enums.status.IN_QUEUE, enums.status.DONE].includes(item.status)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const RenderAccessoryRight = ({ item }) => {
    return (
      <View style={{ padding: 2 }}>
        <View style={{ flexDirection: "row", padding: 5 }}>
          <Status title={item.status}></Status>
          {/* <GetTimeAgo dateTime={item.dateTime}/> */}
        </View>
        <View style={styles.buttons}>
          <Button
            testID="cancelBtn"
            style={styles.button}
            status="danger"
            appearance="outline"
            disabled={cancelingHandler(item)}
            onPress={() => cancelAppointment(item)}
          >
            Cancel
          </Button>
        </View>
      </View>
    );
  };

  const GetTime = ({ dateTime }) => {
    const dateCreated = new Date(dateTime);
    const hours =
      dateCreated.getHours() > 12
        ? dateCreated.getHours() - 12
        : dateCreated.getHours();
    const am_pm = dateCreated.getHours() >= 12 ? "PM" : "AM";
    const minutes =
      dateCreated.getMinutes() < 10
        ? "0" + dateCreated.getMinutes()
        : dateCreated.getMinutes();
    const getTime = `${hours}:${minutes} ${am_pm}`;
    return (
      <View>
        <Text style={{ fontSize: 15 }}>{getTime}</Text>
      </View>
    );
  };

  const RenderDescription = ({ item }) => {
    return (
      <View style={{ flexDirection: "column" }}>
        <View style={{ flexDirection: "row", color: "#000045" }}>
          <LocationIcon />
          <Text>{item.clinic.name}</Text>
        </View>
        <View style={{ flexDirection: "row", color: "#000045" }}>
          <TimeIcon />
          <GetTime dateTime={item.dateTime} />
        </View>
      </View>
    );
  };

  const renderDoctor = ({ item, index }) => {
    return item !== null ? (
      <>
        <ListItem
          key={index}
          testID={`doctor-${index}`}
          title={`${item.clinic.doctor.firstName} ${item.clinic.doctor.lastName}`}
          accessoryLeft={() => <GetWeekDays date={item.dateTime} />}
          accessoryRight={() => <RenderAccessoryRight item={item} />}
          description={<RenderDescription item={item} />}
        />
        <Divider />
      </>
    ) : (
      <> </>
    );
  };

  return (
    <ScrollView style={customStyle.listBackground}>
      <View>
        <List testID="doctorList" data={items} renderItem={renderDoctor} />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  button: {
    paddingVertical: 1,
    paddingHorizontal: 10,
  },
  buttons: {
    justifyContent: "flex-end",
  },
});

export default RequestPatientPage;
