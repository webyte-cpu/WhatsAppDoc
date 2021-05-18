import React, { useState, useRef } from "react";
import { ScrollView, TouchableOpacity, View, StyleSheet } from "react-native";
import { Text, Card, Icon, useTheme } from "@ui-kitten/components";
import customStyle from "../../../themes/styles";
import { Agenda } from 'react-native-calendars';


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
      <Text category='h6' style={customStyle.agendaItem}>{name}</Text>
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

const TimeIcon = (props) => {
  return <Icon {...props} style={[props.style, { width: 15, height: 12}]} fill='white' name="clock-outline" />
};

const LocationIcon = (props) => {
  return <Icon {...props} style={[props.style, { width: 15, height: 12}]} fill='white' name="navigation-2-outline" />
};

const renderItem = (item) => {
  return (
      <TouchableOpacity style={{ marginRight: 10, marginTop: 17 }}>
          <Card 
          disabled={true}
          header= {() => <Header name={item.name} status={item.status} />}
          style={{ background: '#4A40D5', height: 150, }}
          >
              <View style={customStyle.agendaContainer}>
                <View style={{flexDirection: "row"}}>
                  <Text category='s1' style={customStyle.agendaItem}><LocationIcon /> {item.clinic} </Text>
                </View>
                <View style={{flexDirection: "row"}}>
                  
                  <Text category='s2' style={customStyle.agendaItem}><TimeIcon /> {item.date}</Text>
                  </View>
              </View>
          </Card>
      </TouchableOpacity>
  )
}

const openCalendar = () => {
  // let initPos = refAgenda.current.initialScrollPadPosition()
  refAgenda.current.setScrollPadPosition(0, true);
  refAgenda.current.enableCalendarScrolling();
}

const Knob = (props) => {
  return (
      <TouchableOpacity onPress={openCalendar} >
          <Icon {...props} style={[props.style, { width: 20, height: 20,}]} name='arrow-ios-downward-outline' />
      </TouchableOpacity>
  )
}

const AgendaScreen = () => {
    const refAgenda = useRef(null); const [items, setItems] = useState({
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
            renderEmptyData={() => { return <View /> }}
            renderKnob={() => <Knob />}
            pastScrollRange={10}
            futureScrollRange={10}
        />
    );
}

const AppointmentScreen = () => {

    return (
        // <ScrollView style={customStyle.listBackground}>
        <View style={{ flex: 1 }}>
            {/* <Text>Appointment</Text> */}
            <AgendaScreen />
        </View>
        // </ScrollView> 
    );
};

export default AppointmentScreen;
