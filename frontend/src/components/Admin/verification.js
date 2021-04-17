import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Touchable, Text } from 'react-native';
import { Tab, TabView, Button, Icon, List, ListItem, Divider } from '@ui-kitten/components';
import DoctorDetails from './detailModal'
import { dummyDataPending, dummyDataVerified } from './dummyData'
import { gql, useQuery } from '@apollo/client';

const GET_DOCTORS = gql`
  query getDoctors{
    doctors{
        id
        name
        specialization
  }
  }  

`;


const styles = StyleSheet.create({
    container: {
        marginTop: 30
    },
    list: {
        height: '100%',
    }
});

// const Admin = () => {
//     const [selectedIndex, setSelectedIndex] = useState(0);
//     const [viewDoctor, setViewDoctor] = useState({})
//     const [visible, setVisible] = useState(false);

//     const handleClose = () => setVisible(false);

//     const handeShow = (doctor) => {
//         setVisible(true)
//         setViewDoctor(doctor)
//     }

//     const verifiedIcon = (props) => (
//         <Icon {...props} name='checkmark-circle-outline' />
//     );

//     const pendingIcon = (props) => (
//         <Icon {...props} name='clock-outline' />
//     );

//     const detailBtn = (doctor) => (
//         <Button
//             size='tiny'
//             appearance='ghost'
//             onPress={() => handeShow(doctor)}>Details</Button>
//     );

//     const profile = (props) => (
//         <Icon {...props} name='person' />
//     );

//     const renderItem = ({ item, index }) => (
//         <ListItem
//             onPress={() => handeShow(item)}
//             title={`${item.name}`}
//             description={`${item.specialization}`}
//             accessoryLeft={profile}
//             accessoryRight={() => detailBtn(item)}
//         />
//     );

//     return (
//         <View style={styles.container}>
//             <TabView
//                 selectedIndex={selectedIndex}
//                 onSelect={index => setSelectedIndex(index)} >
//                 <Tab title='PENDING' icon={pendingIcon}>
//                     <List
//                         style={styles.list}
//                         data={dummyDataPending}
//                         ItemSeparatorComponent={Divider}
//                         renderItem={renderItem}
//                     />
//                 </Tab>
//                 <Tab title='VERIFIED' icon={verifiedIcon} >
//                     <List
//                         style={styles.list}
//                         data={dummyDataVerified}
//                         ItemSeparatorComponent={Divider}
//                         renderItem={renderItem}
//                     />
//                 </Tab>
//             </TabView>
//             <DoctorDetails doctor={viewDoctor} isShown={visible} onHide={handleClose} />
//         </View>
//     );
// };

function Admin() {
    const { loading, error, data } = useQuery(GET_DOCTORS);

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    console.log(data)

    return (
        <View style={styles.container}>
            <Text>Verified Doctors:</Text>
            {data.doctors.map(doctor => (
                <View key={doctor.id} styles={styles.container}>
                    <Text>name: {doctor.name} specilization: {doctor.specialization}</Text> 
                </View>
         
            ))}
        </View>


    );
}

export default Admin