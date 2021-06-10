import React, { useState, useRef, useEffect } from "react";
import {
  ScrollView,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { Text, Card, Icon, useTheme, Button } from "@ui-kitten/components";
import customStyle from "../../../themes/styles";
import { Agenda } from "react-native-calendars";
import { useQuery } from "@apollo/client";
import {
  GET_ALL_APPOINTMENT,
  UPDATE_APPOINTMENT_MUTATION,
} from "./utils/queries";
import { useAuth } from "../auth/utils/authProvider";
import enums from "../../../helpers/enums";
import { useMutation } from "@apollo/client";
import LoadingScreen from "../../components/loadingScreen";
import StatusModal from "./statusModal";
import { AppRoute } from "../../navigation/app-routes";

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

const Header = ({ name, status, button }) => {
  const theme = useTheme();
  let statusBgColor;
  let statusTextColor;
  let statusColor;

  switch (status) {
    case "IN QUEUE":
      statusColor = 'warning'
      statusBgColor = theme["color-warning-200"];
      statusTextColor = theme["color-warning-600"];
      break;
    case "ONGOING":
      statusColor = 'info'
      statusBgColor = theme["color-info-200"];
      statusTextColor = theme["color-info-600"];
      break;
    case "DONE":
      statusColor = 'success'
      statusBgColor = theme["color-success-200"];
      statusTextColor = theme["color-success-600"];
    break;
  }

  return (
    <View style={customStyle.agendaCardHeader}>
      <Text category="h6">{name}</Text>
      <Button status={statusColor} onPress={button}>
        {status}
      </Button>

    </View>
  );
};

const openCalendar = (refAgenda) => {
  // let initPos = refAgenda.current.initialScrollPadPosition()
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

const AgendaScreen = () => {
  const [visible, setVisible] = useState(false);

  const { appState } = useAuth();
  const user = appState.user;

  const handleClose = () => {

    setVisible(false);
  
     //! temporary fix
  };


  const handlOpen = () => {
    if(user.role === enums.role.DOCTOR){
      setVisible(true)
    }
    
  }


  const refAgenda = useRef(null);



  const { loading, error, data } = useQuery(GET_ALL_APPOINTMENT, {
    pollInterval: 500,
  });
  if (loading) return <LoadingScreen />;
  if (error) return <p>Error :</p>;

  let items = data.getAllAppointment;

  if (user.role === enums.role.DOCTOR) {
    items = items.filter((appointment) => {
      return appointment.clinic.doctor.uid === user.uid &&
      appointment.status !== enums.status.PENDING;
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
    return (
      <TouchableOpacity
        style={{ marginRight: 10, marginTop: 17 }}
        activeOpacity={0.6}
      >
        <Card
          disabled={true}
          header={(props) => (
            <Header
              {...props}
              name={item.patient.firstName}
              button={handlOpen}
              status={item.status.replace("_", " ")}
            />
          )}
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
              <Text category="s1">{item.clinic.name}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TimeIcon />
              <Text category="s1">
                {new Date(item.dateTime).toLocaleTimeString()}
              </Text>
              
            </View>
            <StatusModal 
            isShown={visible} 
            onHide={handleClose} 
            statusPreValue={item.status.replace("_", " ")}
            uid={item.uid}/>
          </View>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <Agenda
      ref={refAgenda}
      items={items}
      renderItem={renderItem}
      renderEmptyData={() => {
        return (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
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

const AppointmentScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <AgendaScreen />
    </View>
  );
};

export default AppointmentScreen;
