import React, { useState } from "react";
import { View, ScrollView, Text } from "react-native";
import { useQuery, useSubscription, gql } from "@apollo/client";
import LoadingScreen from "../../components/loadingScreen";
import { GET_APPOINTMENT } from "./queries";
import NotifCard from "./notifCard.js"
import { useAuth } from "../auth/utils/authProvider";
import enums from "../../../helpers/enums";

const AppointmentList = ({ dataFromQuery, navigation }) => {

    const { appState } = useAuth();
    // const { loading, error, data } = useQuery(GET_APPOINTMENT, { pollInterval: 500 });
    const user = appState.user

    // if (loading) {
    //     return <LoadingScreen />;
    // }

    // if (error) return `Error! ${error.message}`;

    // let appointments = data.getAllAppointment



    const timeElapsedCalculator = (dateTime) => {
        const timeNow = new Date();
        const timeUpdated = new Date(dateTime);


        let timeDiff = timeNow - timeUpdated


        return Math.round(timeDiff / 60000);

    }


    if (user.role === enums.role.DOCTOR) {
        let dataRetrieved = []

        dataFromQuery.forEach((uid) => {

            dataRetrieved.push(uid.doctorClinicUid)

        })

        const subscriptionQuery = gql`
        subscription newAppointment($uids: [UUID!]) {
          newAppointment(doctorClinicUids: $uids) {
            patientUid
            doctorClinicUid
            status
            dateTime
          patient{
              uid
            firstName
          }
          clinic{
            address{
              address
            }
            
            doctor{
                uid
                firstName
            }
          }
          }
        }
      `;










        const appointment = useSubscription(subscriptionQuery, {
            variables: { uids: dataRetrieved },
        });

        if (appointment.loading) {
            return <Text>Loading...</Text>
        }
    
        if (appointment.error) {
            return <Text>Eror 404 not found</Text>
        }

        appointments = appointment.data.newAppointment
    }



    let appointments

    if (user.role === enums.role.PATIENT) {

        const { loading, error, data } = useQuery(GET_APPOINTMENT, { pollInterval: 500 });


        if (loading) {
            return <LoadingScreen />;
        }
    
        if (error) return `Error! ${error.message}`;

        appointments = data.getAllAppointment

    }



    if (user.role === enums.role.DOCTOR) {

        appointments = appointments.filter((appointment) => {

            return appointment.clinic.doctor.uid === user.uid
                && appointment.status === enums.status.PENDING
        })
    }

    if (user.role === enums.role.PATIENT) {
        appointments = appointments.filter((appointment) => {
            return appointment.patient.uid === user.uid && appointment.status !== enums.status.PENDING
        })
    }

    appointments = appointments.filter((appointment) => {
        return appointment.status !== enums.status.ON_GOING || appointment.status !== enums.status.DONE
    })



    return (
        <>
            <View>
                {appointments.map((appointment) => {
                    let name = ""
                    let body = ""
                    if (user.role === enums.role.DOCTOR) {
                        name = appointment.patient.firstName
                        body = "an appointment"

                    }
                    else if (user.role === enums.role.PATIENT) {
                        name = "Dr " + appointment.clinic.doctor.firstName
                        body = "your booking"
                    }
                    const date = new Date(appointment.dateTime);



                    return (
                        <View>
                            <NotifCard
                                status={appointment.status}
                                name={name}
                                dateTime={date.toUTCString()}
                                clinic={appointment.clinic.address.address}
                                body={body}
                                updatedAt={timeElapsedCalculator(appointment.updatedAt)}
                                navigation={navigation}

                            />
                        </View>
                    )
                })}


            </View>
        </>
    );
};

export default AppointmentList;
