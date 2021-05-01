import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Tab, TabView, Icon, List, ListItem, Divider} from '@ui-kitten/components';
import DoctorDetails from './verification'
import { useQuery } from '@apollo/client';
import { GET_DOCTORS } from './queries'

const profileIcon = (props) => <Icon {...props} name='person' />;
const verifiedIcon = (props) => <Icon {...props} name='checkmark-circle-outline' />;
const pendingIcon = (props) => <Icon {...props} name='clock-outline' />;
const unverifiedIcon = (props) => <Icon {...props} name='close-outline' />;

const doctorStatus = (doctorVerificationStatus) => {
    let bgColor;
    switch (doctorVerificationStatus) {
        case "PENDING" : 
            bgColor = '#FFCD3F'
            break;
        case "VERIFIED" :
            bgColor = '#B0D239'
            break;
        case "UNVERIFIED" :
            bgColor = '#FF7661'
            break;
        default : break;
    }
    return <Text category='s2' style={{ color: 'white', backgroundColor:bgColor, margin: 5 }}> {doctorVerificationStatus} </Text>;
}

const Admin = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [doctorDetails, setDoctorDetails] = useState({})
    const [visible, setVisible] = useState(false);
    const { loading, error, data } = useQuery( GET_DOCTORS, {pollInterval: 500} );

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    const doctors = data.getDoctor

    const filterByStatus = (verificationStatus) => doctors.filter(doctor => doctor.verificationStatus === verificationStatus)
    
    const handleClose = () => setVisible(false);
    const handleShow = (doctor) => {
        setVisible(true)
        setDoctorDetails(doctor)
    }

    const renderItem = ({ item }) => (
        item === null ? <> </>
            :
            <ListItem
                testID="doctorDetails"
                title={`${item.firstName}`}
                description={`${item.specialization[0]}`}
                accessoryLeft={profileIcon}
                accessoryRight={() => doctorStatus(item.verificationStatus)}
                onPress={() => handleShow(item)}
            />
    );

    return (
        <ScrollView>
            <View>
                <TabView
                selectedIndex={selectedIndex}
                onSelect={index => setSelectedIndex(index)} >
                    <Tab title='PENDING' icon={pendingIcon} testID="pendingTab">
                        <List
                            testID='pendingList'
                            data={filterByStatus('PENDING')}
                            ItemSeparatorComponent={Divider}
                            renderItem={renderItem}
                        />
                    </Tab>
                    <Tab title='VERIFIED' icon={verifiedIcon} testID="verifiedTab">
                        <List
                            testID='verifiedList'
                            data={filterByStatus('VERIFIED')}
                            ItemSeparatorComponent={Divider}
                            renderItem={renderItem}
                        />
                    </Tab>
                    <Tab title='UNVERIFIED' icon={unverifiedIcon} testID="unverifiedTab">
                        <List
                            testID='unverifiedList'
                            data={filterByStatus('UNVERIFIED')}
                            ItemSeparatorComponent={Divider}
                            renderItem={renderItem}
                        />
                    </Tab>
                </TabView>
                <DoctorDetails doctor={doctorDetails} isShown={visible} onHide={handleClose} />
            </View>
        </ScrollView>
    );
};

export default Admin