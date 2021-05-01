import React, { useState } from 'react';
import {
    View,
    ScrollView,
    Button
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
import { gql, useQuery, useMutation } from '@apollo/client';

const GET_DOCTORS = gql`
query {
  getAllDoctor{
    uid
    firstName
   	lastName
    verificationStatus
  }
}
    `;

const UPDATE_DOCTOR = gql`
    mutation updateDoctor($uid:UUID!, $verificationStatus: VerificationStatus ){
        updateDoctor(uid: $uid , verificationStatus: $verificationStatus){
            uid
        }
    }
`


const profileIcon = (props) => <Icon {...props} name='person' />;
const verifiedIcon = (props) => <Icon {...props} name='checkmark-circle-outline' />;
const pendingIcon = (props) => <Icon {...props} name='clock-outline' />;


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



const Admin = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [viewDoctor, setViewDoctor] = useState({})
    const [visible, setVisible] = useState(false);
    const { loading, error, data } = useQuery(GET_DOCTORS);

    const [updateDoctor, { errorMutate }] = useMutation(UPDATE_DOCTOR)
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;


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




    const doctors = data.getAllDoctor


    const pendingList = doctors.filter(doctor => doctor.verificationStatus == 'PENDING')
    const verifiedList = doctors.filter(doctor => doctor.verificationStatus == 'VERIFIED')
    const unverifiedList = doctors.filter(doctor => doctor.verificationStatus == 'UNVERIFIED')


    const handleShow = (doctor) => {
        setVisible(true)
        setViewDoctor(doctor)
    }

    const theme = useTheme();

    const detail = <Text category='s2' style={{ color: theme['color-primary-600'], marginRight: 10 }}> Details </Text>

    // const renderItem = ({ item }) => (
    //     <ListItem
    //         title={`${item.userFirstName}`}
    //         description={`${item.about}`}
    //         accessoryLeft={profileIcon}
    //         accessoryRight={() => item.verificationStatus == 'VERIFIED' ? <></> : detail}
    //         onPress={() => handleShow(item)}
    //     />
    // );

    return (
        <ScrollView
            contentContainerStyle={{
                backgroundColor: "white",
                paddingTop: 10,
                paddingHorizontal: 10,
            }}
        >
            {/* <Text testID="welcome-header" category="h1" style={{ marginBottom: 10 }}>
                Welcome, {fname}
            </Text> */}
            <Divider />
            <View>
                {/* <TabView
                    selectedIndex={selectedIndex}
                    onSelect={index => setSelectedIndex(index)} >
                    <Tab title='VERIFIED' icon={verifiedIcon} >
                        {verifiedList.map(doctor => (
                            
                            <View key={doctor.uid}>
                                <ListItem
                                    title={`${doctor.userFirstName}`}
                                    description={`${doctor.about}`}
                                    accessoryLeft={profileIcon}
                                    accessoryRight={() => doctor.verificationStatus == 'VERIFIED' ? <></> : detail}
                                    // onPress={() => handleShow()}
                                />

                            </View>

                        ))}

                    </Tab>

                </TabView>
                <DoctorDetails doctor={viewDoctor} isShown={visible} onHide={handleClose} /> */}

                <Text>Verified</Text>
                {verifiedList.map(doctor => (

                    <View key={doctor.uid}>
                        <ListItem
                            title={`${doctor.firstName}`}
                            description={`${doctor.verificationStatus}`}
                            accessoryLeft={profileIcon}
                            accessoryRight={() => doctor.verificationStatus == 'VERIFIED' ? <></> : detail}

                        // <Button
                        // onPress={onPressLearnMore}
                        // title="Learn More"
                        // color="#841584"
                        // accessibilityLabel="Learn more about this purple button"
                        // />


                        />



                        <Button onPress={() => updateDoctorStatus(doctor.uid, 'PENDING')} title="move to pending" />
                    </View>

                ))}

                <Text>Unverified</Text>

                {unverifiedList.map(doctor => (

                    <View key={doctor.uid}>
                        <ListItem
                            title={`${doctor.firstName}`}
                            description={`${doctor.verificationStatus}`}
                            accessoryLeft={profileIcon}
                            accessoryRight={() => doctor.verificationStatus == 'UNVERIFIED' ? <></> : detail}
                        // onPress={() => handleShow()}
                        />
                        <Button onPress={() => updateDoctorStatus(doctor.uid, 'VERIFIED')} title="move to verified" />
                    </View>

                ))}

                <Text>Pending</Text>

                {pendingList.map(doctor => (

                    <View key={doctor.uid}>
                        <ListItem
                            title={`${doctor.firstName}`}
                            description={`${doctor.verificationStatus}`}
                            accessoryLeft={profileIcon}
                            accessoryRight={() => doctor.verificationStatus == 'PENDING' ? <></> : detail}
                        // onPress={() => handleShow()}
                        />

                        <Button onPress={() => updateDoctorStatus(doctor.uid, 'UNVERIFIED')} title="REJECT" />
                    </View>

                ))}

            </View>


        </ScrollView>
    );
};

export default Admin