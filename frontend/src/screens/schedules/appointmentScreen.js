import React, { useState, useRef } from "react";
import { ScrollView, TouchableOpacity, View, StyleSheet } from "react-native";
import { Text, Card, Icon, useTheme } from "@ui-kitten/components";
import customStyle from "../../../themes/styles";
import { Agenda } from 'react-native-calendars';

const AgendaScreen = () => {
    const refAgenda = useRef(null); const [items, setItems] = useState({
        '2021-05-15': [
            { name: 'Ayesha', clinic: 'Doctor’s Medical Hospital', date: '7:00 AM' },
            { name: 'Danielle', clinic: 'Doctor’s Medical Hospital', date: '9:00 AM' }],
        '2021-05-17': [
            { name: 'Em', clinic: 'Doctor’s Medical Hospital', date: '1:00 PM' },
            { name: 'Mallare', clinic: 'Doctor’s Medical Hospital', date: '4:00 PM' }],
        '2021-05-18': [
            { name: 'Siroy', clinic: 'Doctor’s Medical Hospital', date: '7:00 AM' },
            { name: 'Manok', clinic: 'Doctor’s Medical Hospital', date: '7:30 AM' }],
        '2021-05-19': [
            { name: 'Harreh', clinic: 'Doctor’s Medical Hospital', date: '11:30 AM' },
            { name: 'Bertolto', clinic: 'Doctor’s Medical Hospital', date: '1:30 PM' },
            { name: 'Jam hakdog', clinic: 'Doctor’s Medical Hospital', date: '3:30 PM' }],
        '2021-05-20': [
            { name: 'Alexis', clinic: 'Doctor’s Medical Hospital', date: '8:30 AM' },
            { name: 'Dalisay', clinic: 'Doctor’s Medical Hospital', date: '10:30 AM' }],
    });

    const renderItem = (item) => {
        return (
            <TouchableOpacity style={{ marginRight: 10, marginTop: 17 }}>
                <Card style={{ background: '#4A40D5', height: 100, }}>
                    <View style={customStyle.agendaContainer}>
                        <Text category='h6' style={customStyle.agendaPatientName}>{item.name}</Text>
                        <Text style={customStyle.agendaClinic}>{item.clinic}</Text>
                        <Text category='label' style={customStyle.agendaClinic} >{item.date}</Text>
                        {/* <Icon style={{ width: 20, height: 20, color: '#FFFFFF'}} name='clock-outline' /> */}
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
    const theme = useTheme();

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
