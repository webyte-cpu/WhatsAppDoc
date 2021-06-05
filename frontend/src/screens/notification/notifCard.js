import React, { useState, useEffect } from "react";
import { View,Text, ScrollView, TouchableHighlight, StyleSheet } from "react-native";
import { AppRoute } from "../../navigation/app-routes";




const NotifCard = ({ status, name, dateTime, clinic, body, updatedAt, navigation }) => {
    const [statusText, setStatusText] = useState("")
    let timeText = updatedAt + " min ago"

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

        if(status === "PENDING"){
            navigation.navigate(AppRoute.REQUEST)
        }
        else if(status === "IN_QUEUE"){
            navigation.navigate(AppRoute.SCHEDULE)
        }
        else{
            navigation.navigate(AppRoute.REQUEST)
        }

        
      }
    
    if(updatedAt <= 0){
        timeText = "just now"
    }


    return (
        <>
            <View>
                <TouchableHighlight onPress={onPressButton} underlayColor="white">

                    <View style={styles.button}>
                        <Text style={styles.buttonText}>{name} {statusText} {body} at {clinic} on {dateTime}</Text>
                        <Text style={styles.buttonText}>{timeText}</Text>
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
      width: "100%",
      alignItems: 'left',
      backgroundColor: 'white'
    },
    buttonText: {
      textAlign: 'left',
      padding: 5,
      color: 'black'
    }
  });

export default NotifCard;
