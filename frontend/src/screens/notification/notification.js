import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { useQuery } from "@apollo/client";
import LoadingScreen from "../../components/loadingScreen";
import { GET_APPOINTMENT } from "./queries";
import NotifCard from "./notifCard.js"
import { useAuth } from "../auth/utils/authProvider";
import enums from "../../../helpers/enums";

const Notification = () => {

    const { appState } = useAuth();
    const { loading, error, data } = useQuery(GET_APPOINTMENT, { pollInterval: 500 });
    const user = appState.user

    if (loading) {
        return <LoadingScreen />;
    }

    // TODO: Proper error handling
    if (error) return `Error! ${error.message}`;

    let appointments = data.getAllAppointment

    if(user.role === enums.role.DOCTOR){
        appointments = appointments.filter((appointment) => {
            return appointment.clinic.doctor.uid === user.uid && appointment.status === enums.status.PENDING
        })
    }

    if(user.role === enums.role.PATIENT){
        appointments = appointments.filter((appointment) => {
            return appointment.patient.uid === user.uid && appointment.status !== enums.status.PENDING
        })
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
                    console.log(appointment.patient.uid === user.uid)
                    return (
                        <View>
                            <NotifCard
                                status={appointment.status}
                                name = {name}
                                dateTime = {date.toUTCString()}
                                clinic = {appointment.clinic.address.address}
                                body = {body}
                             />
                        </View>
                    )
                })}

            </View>
        </>
    );
};

export default Notification;
