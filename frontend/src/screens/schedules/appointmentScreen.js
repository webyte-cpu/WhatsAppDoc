import React, { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Text, Card, Icon } from "@ui-kitten/components";
import customStyle from "../../../themes/styles";
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
}

const AgendaScreen = () => {
  const [items, setItems] = useState({});

  const loadItems = (day) => {
    setTimeout(() => {
      for (let i = -15; i < 30; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        // console.log(new Date(day.timestamp))
        // console.log('time',time)
        const strTime = timeToString(time);
        // console.log('strTime',strTime)
        if (!items[strTime]) {
          items[strTime] = [];
          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            items[strTime].push({
              name: 'Item for ' + strTime + ' #' + j,
              height: Math.max(50, Math.floor(Math.random() * 150)),
            });
          }
        }
      }
      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      // console.log(newItems)
      setItems(newItems);
    }, 1000);
  };

  const renderItem = (item) => {
    return (
      <TouchableOpacity style={{ marginRight: 10, marginTop: 17 }}>
        <Card>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text>{item.name}</Text>
          </View>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={new Date()}
        renderItem={renderItem}
        pastScrollRange={10}
        futureScrollRange={10}
      // hideKnob={false}
      //   renderKnob={(props) => { 
      //     return (
      //         <TouchableOpacity /*onPress = {() => openCalendar ? setOpenCalendar(false) : setOpenCalendar(true)}*/>
      //           <Icon {...props} name='arrow-ios-downward-outline' />
      //         </TouchableOpacity>
      //     ); 
      // }}
      />
    </View>
  );
}


const AppointmentScreen = () => {

  return (
    // <ScrollView style={customStyle.listBackground}>
    <View style={{ height: 600 }}>
      {/* <Text>Appointment</Text> */}
      <AgendaScreen />
    </View>
    // </ScrollView> 
  );
};

export default AppointmentScreen;
