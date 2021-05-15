import React, { useState, useRef } from "react";
import { ScrollView, TouchableOpacity, View, StyleSheet } from "react-native";
import { Text, Card, Icon, useTheme } from "@ui-kitten/components";
import customStyle from "../../../themes/styles";
import {  Agenda } from 'react-native-calendars';

const AgendaScreen = () => {
  const refAgenda = useRef(null);  const [items, setItems] = useState({
      '2021-05-15': [
          {name: 'Ayesha', date:'7:00 AM'},
          {name: 'Danielle', date:'9:00 AM'}],
      '2021-05-17': [
          {name: 'Em', date:'1:00 PM'},
          {name: 'Mallare', date:'4:00 PM'}],
      '2021-05-18': [
          {name: 'Siroy', date:'7:00 AM'},
          {name: 'Manok', date:'7:30 AM'}],
      '2021-05-19': [
          {name: 'Harreh', date:'11:30 AM'},
          {name: 'Bertolto', date:'1:30 PM'},
          {name: 'Jam hakdog', date:'3:30 PM'}],
      '2021-05-20': [
          {name: 'Alexis', date:'8:30 AM'},
          {name: 'Dalisay', date:'10:30 AM'}],
    });

  const renderItem = (item) => {
    return(
      <TouchableOpacity style={{ marginRight: 10, marginTop: 17 }}>
        <Card>
        <View style={styles.itemContainer}>
            <Text>{item.name}</Text>
            <Text category='label'>{item.date}</Text>
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
        <Icon {...props} style={[props.style, { width: 20, height: 20, }]} name='arrow-ios-downward-outline' />
      </TouchableOpacity>
    )
  }
  const theme = useTheme();

  return (
      <Agenda
        ref={refAgenda}
        items={items}
        renderItem={renderItem}
        renderEmptyData={() => {return <View />}}
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

const styles = StyleSheet.create({
  itemContainer: {
    margin: 5,
    borderRadius: 15,
    justifyContent: 'center',
    // alignItems: 'center',
    flex: 1,
  },
});

export default AppointmentScreen;
