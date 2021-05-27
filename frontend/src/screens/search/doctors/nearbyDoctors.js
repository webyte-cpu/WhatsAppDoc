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
import customStyle from "../../../../themes/styles";
import StarRatingComponent from 'react-star-rating-component';
import { useQuery } from '@apollo/client';
import { GET_DOCTORS } from './queries'
import Ratings from './doctorRatings'
import ProfileIcon from "../../../components/profileIcon";

const BookmarkIcon = (...props) => <Icon {...props} style={[props.style, {width:30, height:30}]} name='bookmark-outline' />
const ExperienceIcon =(...props) =>  <Icon {...props} style={[props.style, {width:15, height:15}]} fill='gray' name='briefcase-outline' /> 

const RenderDescription = ({item}) => {
    return(
        <View style={{justifyContent:'flex-start', alignItems:'flex-start'}}>
            {item.specialization}
            <Ratings rating={item.rating}/>
            <View style={{flexDirection:'row'}}> 
                <ExperienceIcon />
                {item.exp} Years of Experience
            </View>
        </View>
    )
}

const RenderDoctor = ({ item, index, disabled=false }) => {
    return item !== null ? (
        <>
            <ListItem
                disabled={disabled}
                key={index}
                testID={`doctor-${index}`}
                title={`${item.firstName} ${item.lastName}`}
                accessoryLeft={() => <ProfileIcon firstName={item.firstName} lastName={item.lastName} />}
                accessoryRight={() => <BookmarkIcon />}
                description={<RenderDescription item={item} />}
                onPress={() => console.log(item.firstName)}
                // accessoryRight={() => <RenderRating rating={item.rating} />}
                // description={`${item.specialization} \n${item.exp}`}
            />
            <Divider />
        </>
    ) : (
            <> </>
        );
};

const NearbyDoctors = () => {
    // const { loading, error, data } = useQuery(GET_DOCTORS, { pollInterval: 500 });
    // const [ doctors, setDoctors] = useState([{hello:"hello"}])

    // if (loading) return 'Loading...';
    // if (error) return `Error! ${error.message}`;

    // const dataDoctors = data.getDoctor
    // console.log(dataDoctors)
    // console.log(typeof(Doctors))


    const doctorData = [
        { firstName: 'Alexis', lastName:'Dalisay', specialization: 'Physician', rating: 5, exp: 2 },
        { firstName: 'Uchimaru', lastName:'Sho', specialization: 'Dentist', rating: 5, exp: 2 },
        { firstName: 'Reki', lastName:'Rawr', specialization: 'Psychologist', rating: 3, exp: 5 },
        { firstName: 'Snow', lastName:'Bhie', specialization: 'Neurologist', rating: 3, exp: 5 },
    ]

    return (
        <ScrollView style={customStyle.listBackground}>
            <View>
                <List testID="doctorList" data={doctorData} renderItem={RenderDoctor} />
            </View>
        </ScrollView>
    );
}

export { NearbyDoctors, RenderDoctor };