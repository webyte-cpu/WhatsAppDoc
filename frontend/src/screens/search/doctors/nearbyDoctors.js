import React, { useState } from "react";
import { ScrollView, View, TouchableWithoutFeedback, StyleSheet} from "react-native";
import {
    Text,
    Button,
    List,
    Icon,
    Popover,
    Divider,
    ListItem,
    useTheme,
    Modal,
    Card,
} from "@ui-kitten/components";
import Stars from 'react-native-stars';
import customStyle from "../../../themes/styles";

const NearbyDoctors = (props) => {

    const doctorData = [
        { name: 'Alexis', title: 'Physician', rating: 5, exp: 2 },
        { name: 'Uchimaru', title: 'Dentist', rating: 5, exp: 2 },
        { name: 'Reki', title: 'Psychologist', rating: 3, exp: 5 },
        { name: 'Snow', title: 'Neurologist', rating: 3, exp: 5 },
    ]

    // const renderRating = ({ item }) => {
    //     return (
    //         <>
    //             <Rating>

    //             </Rating>
    //         </>
    //     )
    // }

    const renderDoctor = ({ item, index }) => {
        return item !== null ? (
            <>
                <ListItem
                    key={index}
                    testID={`doctor-${index}`}
                    title={`${item.name}`}
                    description={`
                    ${item.title}
                    ${item.rating}
                    ${item.exp}`}
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
                <List testID="doctorList" data={doctorData} renderItem={renderDoctor} />
            </View>
        </ScrollView>
    );
}

export default NearbyDoctors;

const styles = StyleSheet.create({
    myStarStyle: {
        color: 'yellow',
        backgroundColor: 'transparent',
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    myEmptyStarStyle: {
        color: 'white',
    }
});