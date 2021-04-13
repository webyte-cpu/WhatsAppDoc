import React, { useState } from 'react';
import { 
    View, 
    ScrollView } 
    from 'react-native';
import { 
    Text,
    Tab, 
    TabView, 
    Icon, 
    List, 
    ListItem, 
    Divider} 
    from '@ui-kitten/components';
import {useTheme} from '@ui-kitten/components'
import DoctorDetails from './verification'
import { dummyData } from './dummyDataAdmin'

const profileIcon = (props) => <Icon {...props} name='person' />;
const verifiedIcon = (props) => <Icon {...props} name='checkmark-circle-outline'/>;
const pendingIcon = (props) => <Icon {...props} name='clock-outline'/>;

const pendingList = dummyData.filter(doctor => doctor.verification == 'Pending')
const verifiedList = dummyData.filter(doctor => doctor.verification == 'Verified')

const Admin = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [viewDoctor, setViewDoctor] = useState({})
    const [visible, setVisible] = useState(false);

    const handleClose = () => setVisible(false);

    const handleShow = (doctor) => {
        setVisible(true)
        setViewDoctor(doctor)
    }

    const theme = useTheme();

    const detail = <Text category='s2' style={{color:theme['color-primary-600'], marginRight:10}}> Details </Text>

    const renderItem = ({ item }) => (
        <ListItem
            title={`${item.name}`}
            description={`${item.specialization}`}
            accessoryLeft={profileIcon}
            accessoryRight={() => item.verification == 'Verified' ? <></> : detail}
            onPress={ () => handleShow(item) }
        />
    );

    return (
        <ScrollView>
        <View style={{marginTop: 30}}>
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
        </View>
        </ScrollView>
    );
};

export default Admin