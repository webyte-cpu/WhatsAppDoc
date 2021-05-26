import React, { useState } from "react";
import { View, ScrollView } from 'react-native'
import { Calendar, Select, IndexPath, SelectItem, Divider, Button, Input, Text, Icon } from '@ui-kitten/components'
import SuccessModal from './successModal'

// const Bookmark = (...props) => { return <Icon {...props} name='bookmark' /> }

const prefix = (prefix) => {
    return <Text category="s2" style={{ color: 'gray' }}>{prefix}</Text>;
};

const InfoScreen = () => {
    return (
        <View>
            <Divider />
            <Input style={{ backgroundColor: 'white', marginVertical: 5 }} disabled={true} label='CLINIC' />
            <Input
                style={{ backgroundColor: 'white', marginVertical: 5, color: 'black' }}
                disabled={true}
                label='CONSULTATION FEE'
                value={'500.00'}
                textStyle={{ color: 'black', fontWeight: 'bold' }}
                accessoryLeft={() => prefix('Php')} />
        </View>
    )
}

const BookingScreen = () => {
    const dummyData = ['7:00 - 7:30', '7:30 - 8:00', '8:00 - 8:30', '8:30 - 9:00', '9:00 - 9:30']
    const [visible, setVisible] = useState(false);

    const handleClose = () => setVisible(false);
    const handleShow = () => setVisible(true);

    const CalendarScreen = () => {
        const [selectedDate, setSelectedDate] = React.useState(new Date());
        return (
            <>
                <Text category='h6'>
                    Selected date: {selectedDate.toLocaleDateString()}
                </Text>
                <Calendar
                    date={selectedDate}
                    onSelect={nextDate => setSelectedDate(nextDate)}
                />
            </>
        )
    }

    const SelectTime = () => {
        const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));
        // const [selectedTime, setSelectedTime] = useState('')

        const displayValue = dummyData[selectedIndex.row];
        const renderOption = (title) => <SelectItem title={title} />

        return (
            <View style={{marginVertical:10}}>
                <Select
                    label='TIME'
                    value={displayValue}
                    selectedIndex={selectedIndex}
                    onSelect={index => setSelectedIndex(index)}
 
                >
                    {dummyData.map(renderOption)}
                </Select>
            </View>
        )
    }

    return (
        <ScrollView style={{ padding: 20, backgroundColor: 'white', height: '100%' }}>
            <InfoScreen />
            <SelectTime />
            <CalendarScreen />
            <Button onPress={handleShow}>
                Book Appointment
             </Button>
            <SuccessModal isShown={visible} onHide={handleClose} />
        </ScrollView>
    )
}

export default BookingScreen;