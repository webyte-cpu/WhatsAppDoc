import React from 'react';
import { StyleSheet, View, Image, Platform, Linking }from 'react-native';
import { Button, Card, Modal, Text,}from '@ui-kitten/components';
import { useMutation } from '@apollo/client';
import { UPDATE_DOCTOR } from './queries'

const openLink =(url) => { Platform.OS == 'web' ? window.open(url) : Linking.openURL(url) }
const linkToPRC = (
    <Button
    testID="linkPRCBtn"
    status='danger'
    style={{marginTop:20}}         
    size='medium' 
    appearance='outline'  
    onPress={() => openLink('https://online1.prc.gov.ph/Verification')}>
        Verify License Card at PRC site
    </Button>
)

const DoctorDetails = ({ doctor, isShown, onHide }) => {
    const [updateDoctor, { errorMutate }] = useMutation(UPDATE_DOCTOR)
    const updateDoctorStatus = (uidCode, verification) => {
        updateDoctor({
            variables: {
                uid: uidCode,
                verificationStatus: verification
            }
        });

        if (errorMutate) {
            console.log(errorMutate)
        }
    }
    
    const verifyBtn = () => {
        updateDoctorStatus(doctor.uid, 'VERIFIED')
        onHide()
    }
    const denyBtn = () => {
        updateDoctorStatus(doctor.uid, 'UNVERIFIED')
        onHide()
    }

    let color;
    doctor.verificationStatus === 'PENDING' ? color='#FFCD3F' : doctor.verificationStatus === 'VERIFIED' ? color='#B0D239' : color = '#FF7661';

    const Header = (props) => (
        <View {...props} style={{backgroundColor:color, padding:15}}>
            <Text category='h6'>{doctor.firstName}</Text>
            <Text category='s2'>{doctor.specialization[0]}</Text>
        </View>
    )
    const Footer = (props) => (
        doctor.verificationStatus === 'PENDING' 
        ? 
            <View {...props} style={styles.buttons}>
                <Button 
                testID="denyBtn"
                style={styles.button}
                onPress={denyBtn}>
                    Deny
                </Button>
                <Button 
                testID="verifyBtn"
                style={styles.button} 
                onPress={verifyBtn}>
                    Verify
                </Button>
            </View>
        // : <></>
        : <View {...props} style={styles.buttons}>
            <Button onPress={() => updateDoctorStatus(doctor.uid,'PENDING')}>Go to pending</Button>
        </View>
    )

    return (
        <Modal
        testID="doctorInformation"
        style={styles.container}
        visible={isShown}
        backdropStyle={styles.backdrop}
        onBackdropPress={onHide}>
            <Card 
            disabled={true} 
            header={Header} 
            footer={Footer}>
                <Text category='s1'>License Card Information </Text>
                <Image style={styles.image} source={{ uri: 'http://newstogov.com/wp-content/uploads/2019/10/prc1.jpg' }} />
                <Text category='s1'>Birthdate: 
                    {/* <Text> {doctor.birthdate}</Text> */}
                </Text>
                <Text category='s1'>License Number: 
                    <Text> {doctor.licenceNum}</Text>
                </Text>
                <Text category='s1'>License Expiration Date: 
                    <Text> {doctor.licenceExp}</Text>
                </Text>
                {linkToPRC}
            </Card>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 300,
        ...Platform.select({
            web: {
                width: 600,
            },
        }),
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    button: {
        marginHorizontal: 2,
    },
    buttons: {
        marginTop: 0,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 10
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
        ...Platform.select({
            web: {
                width: '100%',
                height: 300
            },
        }),
    },
});

export default DoctorDetails