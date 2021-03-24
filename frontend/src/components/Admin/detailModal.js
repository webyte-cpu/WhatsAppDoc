import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Modal, Text } from '@ui-kitten/components';

const styles = StyleSheet.create({
    container: {
        width: 300
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    button: {
        width: 120,
        margin:2
    },
    buttons: {
        marginTop:0,
        flexDirection: 'row',
        flexWrap: 'wrap',
    }
});

const DoctorDetails = ({ doctor, isShown, onHide }) => {

    return (
        <Modal
            style={styles.container}
            visible={isShown}
            backdropStyle={styles.backdrop}
            onBackdropPress={onHide}>
            <Card disabled={true} >
                <Text>Name: {doctor.name}</Text>
                <Text>Specialization: {doctor.specialization}</Text>
                <Text>Address: N/A</Text>
                <Text>Birthdate: N/A</Text>
                <Text>License Number: N/A</Text>
                <View style={styles.buttons}>
                    <Button style={styles.button} onPress={onHide}>
                        Deny
                    </Button>
                    <Button style={styles.button} onPress={onHide}>
                        Verify
                    </Button>
                </View>
            </Card>
        </Modal>
    );
};

export default DoctorDetails