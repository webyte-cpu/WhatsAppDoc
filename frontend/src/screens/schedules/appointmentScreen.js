import React, { useState, useRef, useEffect } from "react";
import { ScrollView, TouchableOpacity, View, StyleSheet } from "react-native";
import { Text, Card, Icon, useTheme } from "@ui-kitten/components";
import customStyle from "../../../themes/styles";
import { Agenda } from 'react-native-calendars';

const TimeIcon = (props) => {
  const theme = useTheme()
  return <Icon {...props} style={{ width: 20, height: 17}} fill={theme['color-primary-500']} name="clock-outline" />
};
const LocationIcon = (props) => {
  const theme = useTheme()
  return <Icon {...props} style={{ width: 20, height: 17}} fill={theme['color-primary-500']} name="pin-outline" />
};
const KnobIcon = (props) => {
  return <Icon {...props} style={{width: 25, height: 25, alignSelf:'center'}} name='arrow-ios-downward-outline' />
};

const Header = ({name,status}) => {
  const theme = useTheme();
  let statusBgColor;
  let statusTextColor;

  switch (status) {
    case 'In Queue':
      statusBgColor = theme["color-warning-200"];
      statusTextColor = theme["color-warning-600"];
      break;
    case 'Ongoing':
      statusBgColor = theme["color-success-200"];
      statusTextColor = theme["color-success-600"];
      break;
  }

  return(
    <View style={customStyle.agendaCardHeader}>
      <Text category='h6'>{name}</Text>
      <Text style={{
        color:statusTextColor, 
        backgroundColor:statusBgColor,
        paddingVertical: 5, 
        paddingHorizontal: 20,
        borderRadius:10,
        }}>{status}</Text>
    </View>
  )
}

const renderItem = (item) => {
  return (
      <TouchableOpacity style={{ marginRight: 10, marginTop: 17 }} activeOpacity={0.6}>
          <Card 
          disabled={true}
          header= {(props) => <Header {...props} name={item.name} status={item.status} />}
          style={customStyle.agendaContainer}
          >
            <View>
              <View style={{flexDirection: "row", alignItems: 'center', marginBottom: 5}}>
                <LocationIcon />
                <Text category='s1'> {item.clinic}</Text>
              </View>
              <View style={{flexDirection: "row", alignItems: 'center'}}>
                <TimeIcon />
                <Text category='s1'> {item.date}</Text>
                </View>
            </View>
          </Card>
      </TouchableOpacity>
  )
}

const openCalendar = (refAgenda) => {
  // let initPos = refAgenda.current.initialScrollPadPosition()
  refAgenda.current.setScrollPadPosition(0, true);
  refAgenda.current.enableCalendarScrolling();
}

const renderKnob = (agenda) => {
  return (
    <View style={{width:200}}>
      <TouchableOpacity onPress={() => openCalendar(agenda)} >
          <KnobIcon />
      </TouchableOpacity>
    </View>
  )
}

const AgendaScreen = () => {
    const refAgenda = useRef(null); 
    const [items, setItems] = useState({
        '2021-05-15': [
            { name: 'Ayesha', clinic: 'Doctor’s Medical Hospital', date: '7:00 AM', status:'In Queue' },
            { name: 'Danielle', clinic: 'Doctor’s Medical Hospital', date: '9:00 AM', status:'In Queue' }],
        '2021-05-17': [
            { name: 'Em', clinic: 'Doctor’s Medical Hospital', date: '1:00 PM', status:'In Queue' },
            { name: 'Mallare', clinic: 'Doctor’s Medical Hospital', date: '4:00 PM', status:'In Queue' }],
        '2021-05-18': [
            { name: 'Siroy', clinic: 'Doctor’s Medical Hospital', date: '7:00 AM', status:'In Queue' },
            { name: 'Manok', clinic: 'Doctor’s Medical Hospital', date: '7:30 AM', status:'Ongoing' }],
        '2021-05-19': [
            { name: 'Harreh', clinic: 'Doctor’s Medical Hospital', date: '11:30 AM', status:'In Queue' },
            { name: 'Bertolto', clinic: 'Doctor’s Medical Hospital', date: '1:30 PM', status:'In Queue' },
            { name: 'Jam hakdog', clinic: 'Doctor’s Medical Hospital', date: '3:30 PM', status:'In Queue' }],
        '2021-05-20': [
            { name: 'Alexis', clinic: 'Doctor’s Medical Hospital', date: '8:30 AM', status:'In Queue' },
            { name: 'Dalisay', clinic: 'Doctor’s Medical Hospital', date: '10:30 AM', status:'In Queue' }],
    });

    return (
        <Agenda
            ref={refAgenda}
            items={items}
            renderItem={renderItem}
            renderEmptyData={() => { return ( 
              <View style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
                <Text appearance="hint" category="s1">
                  No scheduled appointments
                </Text>
              </View>
              )
            }}
            renderKnob={() => renderKnob(refAgenda)}
            pastScrollRange={10}
            futureScrollRange={10}
        />
    );
}

const AppointmentScreen = () => {
    return (
        <View style={{flex:1}}>
            <AgendaScreen />
        </View>
    );
};

export default AppointmentScreen;
