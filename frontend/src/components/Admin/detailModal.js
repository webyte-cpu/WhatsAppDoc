import React from 'react';
import {
    StyleSheet,
    View,
    Image,
    Platform,
    Linking,
}
    from 'react-native';
import {
    Button,
    Card,
    Modal,
    Text,
}
    from '@ui-kitten/components';

const openLink =(url) => { Platform.OS == 'web' ? window.open(url) : Linking.openURL(url) }

const verifyLicenseBtn = (
    <Button
    status='danger'
    style={{marginTop:20}}         
    size='medium' 
    appearance='outline'  
    onPress={() => openLink('https://online1.prc.gov.ph/Verification')}>
        Verify License Card at PRC site
    </Button>
)

const DoctorDetails = ({ doctor, isShown, onHide }) => {

    const Header = (props) => (
        <View {...props}>
            <Text category='h6'>{doctor.name}</Text>
            <Text category='s2'>{doctor.specialization}</Text>
        </View>
    )

    const Footer = (props) => (
        doctor.verification == 'Verified' 
        ? 
            <></> 
        :
            <View {...props} style={styles.buttons}>
                <Button 
                style={styles.button}
                onPress={onHide}>
                    Deny
                </Button>
                <Button 
                style={styles.button} 
                onPress={onHide}>
                    Verify
                </Button>
            </View>
    )

    return (
        <Modal
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
                    <Text> {doctor.birthdate}</Text>
                </Text>
                {verifyLicenseBtn}
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