import React, {useState} from "react";
import { View, StyleSheet } from 'react-native'
import { Modal, Button, Card, Icon, Text, useTheme, SelectItem, Select } from '@ui-kitten/components'
import {UPDATE_APPOINTMENT_MUTATION} from "./utils/queries"
import { useMutation } from "@apollo/client";

const CloseIcon = (props) => { return <Icon {...props} style={[props.style, styles.closeIcon], { alignItems: "right" }} name='close-outline' /> }






const onSave = (updateAppointment,uid,value) => {

    console.log(value)
    updateAppointment(uid, value.replace(" ", "_"))

}
const Footer = ({ onHide, value, updateAppointment, uid }) => {
    return (
        <View style={{ flexDirection: 'row' }}>
            <Button onPress={onHide}>Cancel</Button>
            <Button status="success" onPress={() => {
                onSave(updateAppointment, uid, value)
                onHide()
            }}>Save</Button>
        </View>


    )
}

const StatusModal = ({ isShown, onHide, statusPreValue, uid }) => {
  
    const status = ['IN QUEUE' , 'PENDING', 'CANCELLED', 'DONE']
    const [updateAppointment] = useMutation(UPDATE_APPOINTMENT_MUTATION);

    const updateAppointmentStatus = (uidCode, status) => {
        
        updateAppointment({
        variables: {
            uid: uidCode,
            status: status,
        },
        });
    };

    const [selectedStatus, setSelectedStatus] = useState(statusPreValue); // string
    const [selectedIndex, setSelectedIndex] = useState();

    const SelectStatus = () => {
        const value = selectedIndex
        const displayValue = value

     
        const renderOption = (status, index) => (
            <SelectItem
                key={index}
                title={`${status}`}
            />
        );

        return (
            <View style={{ marginVertical: 10 }}>
                <Select
                    label="STATUS"
                    placeholder={selectedStatus}
                    value={displayValue}
                    selectedIndex={selectedIndex}
                    onSelect={(index) => {
                        
                        {console.log(index)}
                        setSelectedStatus(status[index - 1])
                    }}
                >
                    {status.map(renderOption)}
                </Select>
            </View>
        )
    }


    return (
        <View>
            <Modal
                visible={isShown}
                backdropStyle={styles.backdrop}
                onBackdropPress={onHide}>
                <Card
                    disabled={true}
                    footer={() => <Footer onHide={onHide} value={selectedStatus} uid = {uid} updateAppointment={updateAppointmentStatus} />}
                >
                    <View style={styles.container}>
                        <CloseIcon/>
                        <Text style={styles.text} category='h5'>Status</Text>

                        <SelectStatus />

                    </View>
                </Card>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    closeIcon: {
        width: 20,
        height: 20,
    },
    text: {
        textAlign: 'left'
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    }
});

export default StatusModal;