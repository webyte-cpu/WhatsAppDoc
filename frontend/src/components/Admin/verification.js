import React, { useState } from 'react';
import { 
    View, 
    StyleSheet, 
    ScrollView } 
    from 'react-native';
import { 
    Tab, 
    TabView, 
    Button, 
    Icon, List, 
    ListItem, 
    Divider } 
    from '@ui-kitten/components';
import DoctorDetails from './detailModal'
import { dummyData } from './dummyData'

const styles = StyleSheet.create({
    container: {
        marginTop: 30
    },
});

const profile = (props) => <Icon {...props} name='person' />;
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

    const detailBtn = (doctor) => (
        <Button 
        size='tiny' 
        appearance='ghost' 
        onPress={ () => handleShow(doctor) }>Details</Button>
    );

    const renderItem = ({ item }) => (
        <ListItem
            title={`${item.name}`}
            description={`${item.specialization}`}
            accessoryLeft={profile}
            accessoryRight={() => item.verification == 'Verified' ? <></> : detailBtn(item)}
            onPress={ () => handleShow(item) }
        />
    );

    return (
        <ScrollView>
        <View style={styles.container}>
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