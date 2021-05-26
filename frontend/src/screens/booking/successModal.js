import React from "react";
import { View, StyleSheet } from 'react-native'
import { Modal, Button, Card, Icon, Text, useTheme } from '@ui-kitten/components'


const CheckIcon = (...props) => {
    const theme = useTheme()
    return <Icon {...props} style={[props.style, styles.checkIcon]} fill={theme['color-success-400']} name='checkmark-circle-2' />
}

const CloseIcon = (...props) => { return <Icon {...props} style={[props.style, styles.closeIcon]}  name='close-outline'/> }

const Header = ({ onHide }) => {
    return (
        <View style={{alignItems:'flex-end'}}>
            <Button appearance='ghost' onPress={onHide}>
                <CloseIcon />
            </Button>
        </View>
    )
}

const SuccessModal = ({ isShown, onHide }) => {
    return (
        <View>
            <Modal
            visible={isShown}
            backdropStyle={styles.backdrop}
            onBackdropPress={() => setVisible(false)}>
                <Card
                disabled={true}
                header= {() => <Header onHide={onHide} />}
                >   
                <View style={styles.container}>
                    <CheckIcon />
                    <Text style={styles.text} category='h5'>Booking Request Sent!</Text>
                    <Text style={styles.text} category='label'>Please allow 1hour/s for the doctor to confirm</Text>
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
    checkIcon:{
        width: 80, 
        height: 80, 
        marginBottom:15 
    },
    closeIcon: {
        width: 20, 
        height: 20, 
    },
    text:{
        textAlign:'center'
    },
    container:{
        alignItems:'center', 
        justifyContent:'center', 
        padding: 20
    }
});

export default SuccessModal;