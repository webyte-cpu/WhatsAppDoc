import React, { useState } from "react";
import { ScrollView, View, TouchableWithoutFeedback, StyleSheet } from "react-native";
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
import StarRatingComponent from 'react-star-rating-component';
import customStyle from "../../../../themes/styles";
import { useQuery } from '@apollo/client';
import { GET_DOCTORS } from './queries'

const NearbyDoctors = () => {
    // const { loading, error, data } = useQuery(GET_DOCTORS, { pollInterval: 500 });
    // const [ doctors, setDoctors] = useState([{hello:"hello"}])

    // if (loading) return 'Loading...';
    // if (error) return `Error! ${error.message}`;

    // const dataDoctors = data.getDoctor
    // console.log(dataDoctors)
    // console.log(typeof(Doctors))



    // return (
    //     <View>
    //       <Text>Test Component</Text>

    //       {
    //         doctors.map( (doctor) => {
    //           <Text>Helllllllo</Text>
    //         })
    //       }
    //     </View>

    // );

    const doctorData = [
        { name: 'Alexis', specialization: 'Physician', rating: 5, exp: 2 },
        { name: 'Uchimaru', specialization: 'Dentist', rating: 5, exp: 2 },
        { name: 'Reki', specialization: 'Psychologist', rating: 3, exp: 5 },
        { name: 'Snow', specialization: 'Neurologist', rating: 3, exp: 5 },
    ]

    const RenderRating = ({ rating }) => {
        return (
            <View>
                <StarRatingComponent    //https://github.com/voronianski/react-star-rating-component
                    name="ratings"
                    editing={false}
                    starCount={5}
                    value={rating}
                />
            </View>
        )

    }

    const renderDoctor = ({ item, index }) => {
        return item !== null ? (
            <>
                <ListItem
                    key={index}
                    testID={`doctor-${index}`}
                    title={`${item.name}`}
                    description={`
                    ${item.specialization}
                    ${<RenderRating rating={item.rating} />}
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