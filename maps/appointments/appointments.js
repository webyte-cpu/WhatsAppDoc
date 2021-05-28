import { useQuery, useMutation } from "@apollo/client";

import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { GET_APPOINTMENTS } from "./queries.js"
import { UPDATE_APPOINTMENT } from "./queries.js"




const Appointments = () => {
    const { loading, error, data } = useQuery(GET_APPOINTMENTS, { pollInterval: 500 });
    const [updateAppointment, { variables }] = useMutation(UPDATE_APPOINTMENT)

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    const appointmentData = data.getAppointment
    console.log(appointmentData)

    return (
        <View>
            <Text>{appointmentData.status}</Text>
            <Button
                onPress={e => {
                    e.preventDefault();
                    updateAppointment({ variables: { uid: "031241ef-e400-453d-561e-563190fe45a2", status: "CANCELLED" } }) //grab uid from localstoare or cache storage
                }}
                title="Click to reject"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />

            <Button
                onPress={e => {
                    e.preventDefault();
                    updateAppointment({ variables: { uid: "031241ef-e400-453d-561e-563190fe45a2", status: "PENDING" } }) //grab uid from localstoare or cache storage
                }}
                title="Click to pending"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />
            <Text>Check Console log</Text>
        </View>
    )
}

export default Appointments;