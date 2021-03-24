import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Touchable } from 'react-native';
import { Tab, TabView, Button, Icon, List, ListItem, Divider } from '@ui-kitten/components';
import DoctorDetails from './detailModal'
import {dummyDataPending,dummyDataVerified} from './dummyData'

const styles = StyleSheet.create({
    container: {
        marginTop: 30
    },
    list:{
        height:'100%',
    }
});

const Admin = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [viewDoctor, setViewDoctor] = useState({})
    const [visible, setVisible] = useState(false);

    const handleClose = () => setVisible(false);

    const handeShow = (doctor) => {
        setVisible(true)
        setViewDoctor(doctor)
    }

    const verifiedIcon = (props) => (
        <Icon {...props} name='checkmark-circle-outline'/>
      );
      
      const pendingIcon = (props) => (
        <Icon {...props} name='clock-outline'/>
      );

    const detailBtn = (doctor) => (
        <Button 
        size='tiny' 
        appearance='ghost' 
        onPress={() => handeShow(doctor) }>Details</Button>
    );

    const profile = (props) => (
        <Icon {...props} name='person' />
    );

    const renderItem = ({ item, index }) => (
        <ListItem
            onPress={() => handeShow(item)}
            title={`${item.name}`}
            description={`${item.specialization}`}
            accessoryLeft={profile}
            accessoryRight={() => detailBtn(item)}
        />
    );

    return (
        <View style={styles.container}>
            <TabView
                selectedIndex={selectedIndex}
                onSelect={index => setSelectedIndex(index)} >
                <Tab title='PENDING' icon={pendingIcon}>
                    <List
                        style={styles.list}
                        data={dummyDataPending}
                        ItemSeparatorComponent={Divider}
                        renderItem={renderItem}
                    />
                </Tab>
                <Tab title='VERIFIED' icon={verifiedIcon} >
                    <List
                        style={styles.list}
                        data={dummyDataVerified}
                        ItemSeparatorComponent={Divider}
                        renderItem={renderItem}
                    />
                </Tab>
            </TabView>
            <DoctorDetails doctor={viewDoctor} isShown={visible} onHide={handleClose} />
        </View>
    );
};

export default Admin