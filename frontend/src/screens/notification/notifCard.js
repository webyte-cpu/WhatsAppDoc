import React, { useState, useEffect } from "react";
import { View, ScrollView, TouchableHighlight, StyleSheet } from "react-native";
import {
    Text
} from "@ui-kitten/components";



const NotifCard = ({ status, name, dateTime, clinic, body }) => {
    const [statusText, setStatusText] = useState("")

    const statusTextConverter = (status) => {
        if(status === "PENDING"){
            setStatusText("requested")
        }
        else if(status === "IN_QUEUE"){
            setStatusText("accepted")
        }
        else{
            setStatusText("cancelled")
        }
        
    }

    useEffect(() => {
        statusTextConverter(status)
    }, [])

    const onPressButton = () => {
        alert('You tapped the button!')
      }


    return (
        <>
            <View>
                <TouchableHighlight onPress={onPressButton} underlayColor="white">
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>{name} {statusText} {body} at {clinic} on {dateTime}</Text>
                    </View>
                </TouchableHighlight>
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
      width: 400,
      alignItems: 'center',
      backgroundColor: '#2196F3'
    },
    buttonText: {
      textAlign: 'center',
      padding: 20,
      color: 'white'
    }
  });

export default NotifCard;
