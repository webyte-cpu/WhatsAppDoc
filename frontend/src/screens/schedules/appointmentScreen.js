import React, { useState } from "react";
import { ScrollView, TouchableOpacity, View, StyleSheet } from "react-native";
import { Text, Card, Icon } from "@ui-kitten/components";
import customStyle from "../../../themes/styles";
import {  Agenda } from 'react-native-calendars';

const AgendaScreen = () => {
  const [items, setItems] = useState({
      '2021-05-14': [
          {name: 'Ayesha', date:'May 14 7:00 - 7:30'},
          {name: 'Danielle', date:'May 14 9:00 - 9:30'}],
      '2021-05-15': [
          {name: 'Em', date:'May 15 1:00 - 1:30'},
          {name: 'Mallare', date:'May 15 4:00 - 4:30'}],
      '2021-05-16': [
          {name: 'Siroy', date:'May 16 7:00 - 7:30'},
          {name: 'Manok', date:'May 16 7:30 - 8:00'}],
      '2021-05-17': [
          {name: 'Harreh', date:'May 17 11:30 - 12:00'},
          {name: 'Bertolto', date:'May 17 1:30 - 2:00'},
          {name: 'Jam hakdog', date:'May 17 3:30 - 4:00'}],
      '2021-05-18': [
          {name: 'Alexis', date:'May 18 8:30 - 9:00'},
          {name: 'Dalisay', date:'May 18 10:30 - 11:00'}],
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

  return (
      <Agenda
        items={items}
        renderItem={renderItem}
        pastScrollRange={10}
        futureScrollRange={10}
      // hideKnob={false}
      //   renderKnob={(props) => { 
      //     return (
      //       <View>
      //         <TouchableOpacity /*onPress = {() => openCalendar ? setOpenCalendar(false) : setOpenCalendar(true)}*/>
      //           <Icon {...props} name='arrow-ios-downward-outline' />
      //         </TouchableOpacity>
      //       </View>
      //     ); 
      // }}
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
    alignItems: 'center',
    flex: 1,
  },
});

export default AppointmentScreen;
