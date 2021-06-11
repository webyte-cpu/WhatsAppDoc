import React, { useRef } from "react";
import { TouchableOpacity, View } from "react-native";
import { Text, Card, Icon, useTheme } from "@ui-kitten/components";
import customStyle from "../../../themes/styles";
import { Agenda } from "react-native-calendars";
import { useQuery } from "@apollo/client";
import { GET_ALL_APPOINTMENT } from "./utils/queries";
import { useAuth } from "../auth/utils/authProvider";
import enums from "../../../helpers/enums";
import LoadingScreen from "../../components/loadingScreen";

const TimeIcon = (props) => {
  const theme = useTheme();
  return (
    <Icon
      {...props}
      style={{ width: 20, height: 17 }}
      fill={theme["color-primary-500"]}
      name="clock-outline"
    />
  );
};
const LocationIcon = (props) => {
  const theme = useTheme();
  return (
    <Icon
      {...props}
      style={{ width: 20, height: 17 }}
      fill={theme["color-primary-500"]}
      name="pin-outline"
    />
  );
};
const KnobIcon = (props) => {
  return (
    <Icon
      {...props}
      style={{ width: 25, height: 25, alignSelf: "center" }}
      name="arrow-ios-downward-outline"
    />
  );
};

const Header = ({ item }) => {
  const { appState } = useAuth();
  const user = appState.user;
  const theme = useTheme();
  let statusBgColor;
  let statusTextColor;
  let statusColor;
  let status = item.status.replace("_", " ");

  switch (status) {
    case "IN QUEUE":
      // statusColor = "warning";
      statusBgColor = theme["color-warning-200"];
      statusTextColor = theme["color-warning-600"];
      break;
    case "ONGOING":
      // statusColor = "info";
      statusBgColor = theme["color-info-200"];
      statusTextColor = theme["color-info-600"];
      break;
    case "DONE":
      // statusColor = "success";
      statusBgColor = theme["color-success-200"];
      statusTextColor = theme["color-success-600"];
      break;
    case "CANCELLED":
      // statusColor = "success";
      statusBgColor = theme["color-danger-200"];
      statusTextColor = theme["color-danger-600"];
      break;
  }

  const StatusBtn = () => {
    // for patient
    return (
      <View style={customStyle.agendaCardHeader}>
        <Text category="h6">{item.patient.firstName}</Text>
        <View
          style={[
            { backgroundColor: statusBgColor, color: statusTextColor },
            {
              borderRadius: 5,
              paddingHorizontal: 8,
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <Text category="label">{status}</Text>
        </View>
      </View>
    );
  };

  return <StatusBtn />;
};

const openCalendar = (refAgenda) => {
  refAgenda.current.setScrollPadPosition(0, true);
  refAgenda.current.enableCalendarScrolling();
};

const renderKnob = (agenda) => {
  return (
    <View style={{ width: 200 }}>
      <TouchableOpacity onPress={() => openCalendar(agenda)}>
        <KnobIcon />
      </TouchableOpacity>
    </View>
  );
};

const agendaDataMapper = (data) => {
  let dates = {};

  data.forEach((element) => {
    if (!dates.hasOwnProperty(element.dateTime.split("T")[0])) {
      dates[element.dateTime.split("T")[0]] = [];
    }
  });

  data.forEach((element) => {
    for (let key in dates) {
      if (dates.hasOwnProperty(key)) {
        if (element.dateTime.split("T")[0] === key) {
          dates[key].push(element);
        }
      }
    }
  });

  return dates;
};

const AppointmentScreen = () => {
  const { appState } = useAuth();
  const user = appState.user;

  const refAgenda = useRef(null);

  const { loading, error, data } = useQuery(GET_ALL_APPOINTMENT, {
    pollInterval: 500,
  });
  if (loading) return <LoadingScreen />;
  if (error) return <p>Error :</p>;

  let items = data.getAllAppointment;

  if (user.role === enums.role.DOCTOR) {
    items = items.filter((appointment) => {
      return (
        appointment.clinic.doctor.uid === user.uid &&
        appointment.status !== enums.status.PENDING
      );
    });
  } else {
    items = items.filter((appointment) => {
      return (
        appointment.patient.uid === user.uid &&
        appointment.status !== enums.status.PENDING
      );
    });
  }

  items = agendaDataMapper(items);

  const renderItem = (item) => {
    console.log(item);
    return (
      <TouchableOpacity
        style={{ marginRight: 10, marginTop: 17 }}
        activeOpacity={0.6}
      >
        <Card
          disabled={true}
          header={(props) => <Header item={item} />}
          style={customStyle.agendaContainer}
        >
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 5,
              }}
            >
              <LocationIcon />
              <Text category="c2">{item.clinic.name}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TimeIcon />
              <Text category="c2">
                {new Date(item.dateTime).toLocaleTimeString()}
              </Text>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    );
  };

  const AgendaScreen = () => {
    return (
      <Agenda
        ref={refAgenda}
        items={items}
        renderItem={renderItem}
        renderEmptyData={() => {
          return (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text appearance="hint" category="s1">
                No scheduled appointments
              </Text>
            </View>
          );
        }}
        renderKnob={() => renderKnob(refAgenda)}
        pastScrollRange={10}
        futureScrollRange={10}
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <AgendaScreen />
    </View>
  );
};

export default AppointmentScreen;
