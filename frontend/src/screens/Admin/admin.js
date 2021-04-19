import React, { useState } from 'react';
import {
    View,
    ScrollView
}
    from 'react-native';
import {
    Text,
    Tab,
    TabView,
    Icon,
    List,
    ListItem,
    Divider
}
    from '@ui-kitten/components';
import { useTheme } from '@ui-kitten/components'
import DoctorDetails from './verification'
import { data } from './dummyDataAdmin'
import { gql, useQuery } from '@apollo/client';

const GET_DOCTORS = gql`
query {
  getAllDoctor{
    uid
    userFirstName
    verificationStatus
    about
  }
}
    `;


const profileIcon = (props) => <Icon {...props} name='person' />;
const verifiedIcon = (props) => <Icon {...props} name='checkmark-circle-outline' />;
const pendingIcon = (props) => <Icon {...props} name='clock-outline' />;



const Admin = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [viewDoctor, setViewDoctor] = useState({})
    const [visible, setVisible] = useState(false);
    const { loading, error, data } = useQuery(GET_DOCTORS);

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

  

    const doctors = data.getAllDoctor

    console.log(doctors)
    const pendingList = doctors.filter(doctor => doctor.verificationStatus == 'PENDING')
    const verifiedList = doctors.filter(doctor => doctor.verificationStatus == 'VERIFIED')

    console.log(verifiedList)

    const handleClose = () => setVisible(false);

    const handleShow = (doctor) => {
        setVisible(true)
        setViewDoctor(doctor)
    }

    const theme = useTheme();

    const detail = <Text category='s2' style={{ color: theme['color-primary-600'], marginRight: 10 }}> Details </Text>

    const renderItem = ({ item }) => (
        <ListItem
            title={`${item.userFirstName}`}
            description={`${item.about}`}
            accessoryLeft={profileIcon}
            accessoryRight={() => item.verificationStatus == 'VERIFIED' ? <></> : detail}
            onPress={() => handleShow(item)}
        />
    );

    return (
        <ScrollView>
            {/* <View style={{ marginTop: 30 }}>
                <TabView
                    selectedIndex={selectedIndex}
                    onSelect={index => setSelectedIndex(index)} >
                    <Tab title='PENDING' icon={pendingIcon}>
                        <List
                            data={pendingList}
                            ItemSeparatorComponent={Divider}
                            renderItem={renderItem}
                        />
                    </Tab>
                    <Tab title='VERIFIED' icon={verifiedIcon} >
                        <List
                            data={verifiedList}
                            ItemSeparatorComponent={Divider}
                            renderItem={renderItem}
                        />
                    </Tab>
                </TabView>
                <DoctorDetails doctor={viewDoctor} isShown={visible} onHide={handleClose} />
            </View> */}

            {verifiedList.map(doctor => (
                <View key={doctor.uid}>
                    <Text>name: {doctor.userFirstName} specilization: {doctor.about}</Text> 
                </View>
         
            ))}
        </ScrollView>
    );
};

export default Admin