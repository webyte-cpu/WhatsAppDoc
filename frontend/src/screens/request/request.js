import React, { useState } from "react";
import { AppRoute } from "../../navigation/app-routes";
import { useAuth } from "../auth/utils/authProvider";
import { ScrollView, View, TouchableWithoutFeedback, StyleSheet, Alert } from "react-native";
import {
    Text,
    Button,
    List,
    Icon,
    Popover,
    Divider,
    ListItem,
    Tab,
    TabBar,
    useTheme,
    Modal,
    Card,
} from "@ui-kitten/components";
import customStyle from "../../../themes/styles";
import enums from "../../../helpers/enums";
import TimeAgo from 'javascript-time-ago'       //https://github.com/catamphetamine/javascript-time-ago
import en from 'javascript-time-ago/locale/en'
import { GET_ALL_APPOINTMENT, UPDATE_APPOINTMENT_MUTATION } from "./queries"
import { useQuery, useMutation } from "@apollo/client";


const RequestPage = ({ navigation }) => {
    const { appState } = useAuth();
    const user = appState.user

  const [updateAppointment, { errorMutate }] = useMutation(UPDATE_APPOINTMENT_MUTATION)
    const { loading, error, data } = useQuery(GET_ALL_APPOINTMENT);
    if (loading) return <p>Loading...</p>
    if (error) {
        console.log(error)
        return (null)
    } 

    const handleAppointmentReject = (uid) => {

        updateAppointment({
            variables: {
                uid: uid, status: enums.status.CANCELLED
            }
        });

        if (errorMutate) {
            console.log(errorMutate)
        }
    }

    const handleAppointmentAccept = (uid) => {

        updateAppointment({
            variables: {
                uid: uid, status: enums.status.IN_QUEUE
            }
        });

        if (errorMutate) {
            console.log(errorMutate)
        }
    }

   

    let items = data.getAllAppointment

    console.log(user.role)



    if (user.role === enums.role.DOCTOR) {
        items = items.filter((appointment) => {
            return appointment.clinic.doctor.uid === user.uid
        })

    }
    else {

        items = items.filter((appointment) => {
            return appointment.patient.uid === user.uid && appointment.status
        })

    }

    TimeAgo.addLocale(en)

    const theme = useTheme();

    // const patientData = [
    //     { firstName: 'Alexis', lastName: 'Dalisay', clinic: 'Med Hospital', createdAt: '2021-6-05', appointmentDateTime: '2021-6-07 21:32:00', status: 'Pending' },
    //     { firstName: 'Uchimaru', lastName: 'Sho', clinic: 'Romblon', createdAt: '2021-3-26', appointmentDateTime: '2021-3-27 16:32:00', status: 'Accepted' },
    //     { firstName: 'Reki', lastName: 'Rawr', clinic: 'Gen Clinic', createdAt: '2021-3-27', appointmentDateTime: '2021-3-29 07:32:00', status: 'Pending' },
    //     { firstName: 'Snow', lastName: 'Bhie', clinic: 'Clinic Nila', createdAt: '2021-3-24', appointmentDateTime: '2021-3-28 08:32:00', status: 'Accepted' },
    // ]

    const LocationIcon = (...props) => <Icon {...props} style={[props.style, { width: 15, height: 15, padding: 5 }]} fill='#000045' name='navigation-2-outline' />
    const TimeIcon = (...props) => <Icon {...props} style={[props.style, { width: 15, height: 15, padding: 5 }]} fill='#000045' name='clock-outline' />
    const Time = (item) => { return (<View><TimeIcon />{item.time}</View>) }

    const GetWeekDays = ({ date }) => {
        date = new Date(date)
        const weekday = date.toLocaleString('en-US', {
            weekday: 'short',
        })
        const day = date.toLocaleString('en-US', {
            day: 'numeric',
        })

        return (
            <View style={{
                width: 50,
                height: 70,
                background: '#4A40D5',
                borderRadius: 10,
                textAlign: "center",
            }}>
                <Text style={{
                    marginTop: 10,
                    color: '#FFFFFF',
                    fontSize: 10,
                    fontWeight: "bold"
                }}>{weekday}</Text>
                <Text style={{
                    color: '#FFFFFF',
                    fontSize: 22,
                    fontWeight: "bold"
                }}>{day}</Text>
            </View>
        )

    }
    const Status = ({ title }) => {
        const status = title
        return (
            <View>
                <Tab
                    title={status}
                    style={{
                        backgroundColor: theme["color-primary-light"],
                        paddingVertical: 3,
                        paddingHorizontal: 10,
                        borderRadius: 5,
                    }}
                >
                </Tab>
            </View>

        )
    }

    const GetTimeAgo = ({ dateTime }) => {
        const timeCreated = new Date(dateTime)
        const timeAgo = new TimeAgo('en-US')
        const now = new Date()
        const before = timeCreated.getTime()
        const getMiliSec = now - before

        const day = timeAgo.format(new Date() - getMiliSec, 'twitter')

        return (
            <View style={{ flex: 1, padding: 5 }}>
                <Text style={{ textAlign: "right", color: "#A9A9A9" }}>
                    {day}
                </Text>
            </View>
        )

    }


    const RenderAccessoryRight = ({ item }) => {
        const isDisabled = item.status !== "PENDING"
        console.log(item.status)
        console.log(isDisabled)

        return (
            <View style={{ padding: 2 }}>
                <View style={{ flexDirection: 'row', padding: 5 }}>
                    <Status title={item.status}></Status>
                    <GetTimeAgo dateTime={item.dateTime} />
                </View>
                <View style={styles.buttons}>
                    <Button
                        testID="acceptBtn"
                        style={styles.button}
                        status="success"
                        appearance="outline"
                        // disabled={item.status!=="PENDING"}
                        disabled={isDisabled}
                        onPress={handleAppointmentAccept(item.uid)}
                    >
                        Accept
                      </Button>
                    <Button
                        testID="cancelBtn"
                        style={styles.button}
                        status="danger"
                        appearance="outline"
                        disabled={isDisabled}
                        onPress={handleAppointmentReject(item.uid)}
                    >
                        Cancel
                      </Button>
                </View>

            </View>
        )
    }

    const GetTime = ({ dateTime }) => {
        const dateCreated = new Date(dateTime)
        const hours = dateCreated.getHours() > 12 ? dateCreated.getHours() - 12 : dateCreated.getHours();
        const am_pm = dateCreated.getHours() >= 12 ? "PM" : "AM";
        const minutes = dateCreated.getMinutes() < 10 ? "0" + dateCreated.getMinutes() : dateCreated.getMinutes();
        const getTime = `${hours}:${minutes} ${am_pm}`
        return (
            <View>
                <Text>{getTime}</Text>
            </View>
        )
    }

    const RenderDescription = ({ item }) => {
        console.log("clinic: "+item.clinic.name) 

        return (
            <View style={{ flexDirection: 'col' }}>

                <View style={{ flexDirection: 'row', color: '#000045' }}>
                    <LocationIcon />
                    <Text>{item.clinic.name}</Text>
                </View>
                <View style={{ flexDirection: 'row', color: '#000045' }}>
                    <TimeIcon /><GetTime dateTime={item.dateTime} />
                </View>
            </View>
        );
    };

    const renderPatient = ({ item, index }) => {
        console.log(item)
    console.log("first name: "+item.patient.firstName) 

        return item !== null ? (
            <>
                <ListItem
                    key={index}
                    testID={`patient-${index}`}
                    title={`${item.patient.firstName} ${item.patient.lastName}`}
                    accessoryLeft={() => <GetWeekDays date={item.dateTime} />}
                    accessoryRight={() => <RenderAccessoryRight item={item} />}
                    description={<RenderDescription item={item} />}
                />
                <Divider />
            </>
        ) : (
                <> </>
            );
    };

    return (
        <ScrollView style={customStyle.listBackground}>
            <View>
                <List testID="patientList" data={items} renderItem={renderPatient} />
            </View>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    button: {
        paddingVertical: 1,
        paddingHorizontal: 10,

    },
    buttons: {
        flexDirection: "row",
    },
});

export default RequestPage;