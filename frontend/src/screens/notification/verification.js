import React, { useState } from "react";
import { View, ScrollView, Text, TouchableHighlight,StyleSheet } from "react-native";
import { useQuery, useSubscription, gql } from "@apollo/client";
import LoadingScreen from "../../components/loadingScreen";
import { GET_APPOINTMENT } from "./queries";
import NotifCard from "./notifCard.js"
import { useAuth } from "../auth/utils/authProvider";
import enums from "../../../helpers/enums";

const VerificationList = ({ navigation }) => {

    const { appState } = useAuth();
    // const { loading, error, data } = useQuery(GET_APPOINTMENT, { pollInterval: 500 });
    const user = appState.user


    const notificationQuery = gql`
    subscription newNotification {
        newNotification{
            title
            description
            isSeen
            isArchived
            createdAt
         }
    }
    
    `

    const notifications = useSubscription(notificationQuery);

    if (notifications.loading) {
        return <Text>Loading...</Text>
    }

    if (notifications.error) {
        return <Text>Eror 404 not found</Text>
    }

    const data = notifications.data.newNotification


    return (
        <>
            <View>

                {data.map((notif) => {
                    return (
                        <TouchableHighlight underlayColor="white">

                        <View style={styles.button}>
                            <Text style={styles.buttonText}>{notif.description}</Text>
                      
                        </View>
    
                    </TouchableHighlight>
                    )
                })}

            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
      paddingTop: 60,
      alignItems: 'center'
    },
    button: {
      marginBottom: 30,
      width: "100%",
      alignItems: 'flex-start',
      backgroundColor: 'white'
    },
    buttonText: {
      textAlign: 'left',
      padding: 5,
      color: 'black'
    }
  });
  
export default VerificationList;
