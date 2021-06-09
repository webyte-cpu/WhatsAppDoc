import React, { useState } from "react";
import { View, ScrollView, Text } from "react-native";
import { useQuery, useSubscription, gql } from "@apollo/client";
import LoadingScreen from "../../components/loadingScreen";
import { GET_APPOINTMENT } from "./queries";
import NotifCard from "./notifCard.js"
import { useAuth } from "../auth/utils/authProvider";
import enums from "../../../helpers/enums";
import Appointment from "./appointment.js"
import AppointmentList from "./appointment.js";

const Notification = ({ navigation }) => {

    // const { appState } = useAuth();
    // const { loading, error, data } = useQuery(GET_APPOINTMENT, { pollInterval: 500 });
    // const user = appState.user

    // if (loading) {
    //     return <LoadingScreen />;
    // }

    // if (error) return `Error! ${error.message}`;

    // let appointments = data.getAllAppointment


    // const timeElapsedCalculator = (dateTime) => {
    //     const timeNow = new Date();
    //     const timeUpdated = new Date(dateTime);

    //     let timeDiff = timeNow - timeUpdated


    //     return Math.round(timeDiff / 60000);

    // }

    const { appState } = useAuth();

    const user = appState.user


    let doctorClinicUids = ""

    if(user.role === enums.role.DOCTOR){
       
        const query = gql`
        query getDoctorClinics {
            getDoctor {
            clinic {
                doctorClinicUid
            }
            }
        }
    `;
    
    
        const { loading ,error, data } = useQuery(query)
    
        if(loading){
            return <LoadingScreen />
        }
    
        if(error) return `Error! ${error.message}`
    
        doctorClinicUids = data.getDoctor.clinic
    }






    return (
        <>
            <View>

                <AppointmentList dataFromQuery={doctorClinicUids} navigation={navigation}/>

      

            </View>
        </>
    );
};

export default Notification;
