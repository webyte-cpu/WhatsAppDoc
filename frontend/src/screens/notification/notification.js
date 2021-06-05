import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { useQuery } from "@apollo/client";
import LoadingScreen from "../../components/loadingScreen";
import { GET_APPOINTMENT } from "./queries";
import NotifCard from "./notifCard.js"
import { useAuth } from "../auth/utils/authProvider";
import enums from "../../../helpers/enums";

const Notification = ( {navigation}) => {

    const { appState } = useAuth();
    const { loading, error, data } = useQuery(GET_APPOINTMENT, { pollInterval: 500 });
    const user = appState.user

    if (loading) {
        return <LoadingScreen />;
    }

    if (error) return `Error! ${error.message}`;

    let appointments = data.getAllAppointment

    if(user.role === enums.role.DOCTOR){
        appointments = appointments.filter((appointment) => {
            return appointment.clinic.doctor.uid === user.uid 
            && appointment.status === enums.status.PENDING
        })
    }

    if(user.role === enums.role.PATIENT){
        appointments = appointments.filter((appointment) => {
            return appointment.patient.uid === user.uid && appointment.status !== enums.status.PENDING
        })
    }

    appointments = appointments.filter((appointment) => {
        return appointment.status !== enums.status.ON_GOING || appointment.status !== enums.status.DONE
    })


    const timeElapsedCalculator = (dateTime) => {
        const timeNow = new Date();
        const timeUpdated = new Date(dateTime);

        let timeDiff = timeNow - timeUpdated


        return Math.round(timeDiff / 60000);

    }
    

    return (
        <>
            <View>
                {appointments.map((appointment) => {
                    let name = ""
                    let body = ""
                    if(user.role === enums.role.DOCTOR){
                        name = appointment.patient.firstName
                        body = "an appointment"

                    }
                    else if (user.role === enums.role.PATIENT){
                        name = "Dr " + appointment.clinic.doctor.firstName
                        body = "your booking"
                    }
                    const date = new Date(appointment.dateTime);


                    return (
                        <View>
                            <NotifCard
                                status={appointment.status}
                                name = {name}
                                dateTime = {date.toUTCString()}
                                clinic = {appointment.clinic.address.address}
                                body = {body}
                                updatedAt = {timeElapsedCalculator(appointment.updatedAt)}
                                navigation ={navigation}

                             />
                        </View>
                    )
                })}

            </View>
        </>
    );
};

export default Notification;
