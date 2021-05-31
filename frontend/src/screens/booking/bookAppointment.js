import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Platform } from 'react-native'
import { Calendar, Select, IndexPath, SelectItem, Divider, Button, Input, Text} from '@ui-kitten/components'
import SuccessModal from './successModal'
import { RenderDoctor } from  '../search/doctors/nearbyDoctors'

const AppointmentInfo = ({doctor}) => {
    const prefix = (prefix) => <Text category="s2" style={{ color: 'gray' }}>{prefix}</Text>;
    
    return (
        <View>
            <RenderDoctor disabled={true} item={doctor} />
            <Divider />
            <Input   
            style={styles.inputContainer}
            textStyle={styles.inputValue}
            disabled={true} 
            label='CLINIC'
            value={`Doctor's Medical Hospital`} />
            <Input
            style={styles.inputContainer}
            disabled={true}
            label='CONSULTATION FEE'
            value='500.00'
            textStyle={styles.inputValue}
            accessoryLeft={() => prefix('Php')} />
        </View>
    )
};

const BookingScreen = () => {
    const timeData = ['7:00 - 7:30', '7:30 - 8:00', '8:00 - 8:30', '8:30 - 9:00', '9:00 - 9:30']
    const doctorData = { firstName: 'Alexis', lastName:'Dalisay', specialization: 'Physician', rating: 5, exp: 2 }
    const [selectedTime, setSelectedTime] = useState(timeData[0])
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [visible, setVisible] = useState(false);

    const SelectTime = ({timeData}) => {
        const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));    
        const displayValue = timeData[selectedIndex.row];

        const renderOption = (title) => <SelectItem key={title} title={title} />
    
        return (
            <View style={{marginVertical:10}}>
                <Select
                label='TIME'
                value={displayValue}
                selectedIndex={selectedIndex}
                onSelect={index => setSelectedIndex(index)}
                onBlur={() => setSelectedTime(displayValue)}
                >
                    {timeData.map(renderOption)}
                </Select>
            </View>
        )
    }
    
    const SelectDayAppointment = () => {
        return (
            <View style={{alignSelf:'center', justifyContent:'center'}}>  
                <Calendar
                    style={styles.calendar}
                    date={selectedDate}
                    onSelect={nextDate => setSelectedDate(nextDate)}
                />
            </View>
        )
    }

    const handleClose = () => setVisible(false);
    const handleShow = () => {
        setVisible(true)
        console.log('data:',selectedTime,selectedDate.toLocaleDateString())
    }

    return (
        <ScrollView style={styles.container}>
            <AppointmentInfo doctor={doctorData} />
            <SelectTime timeData={timeData} />
            <SelectDayAppointment />
            <Button style={{marginVertical:15}} onPress={handleShow}>
                Book Appointment
             </Button>
            <SuccessModal isShown={visible} onHide={handleClose} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        padding: 20, 
        backgroundColor: 'white', 
        height: '100%' 
    },
    inputValue: {
        color: 'black', 
        fontWeight: 'bold' 
    },
    inputContainer:{
        backgroundColor: 'white', 
        marginVertical: 5
    },
    calendar:{
        width:350, 
    }
})

export default BookingScreen;