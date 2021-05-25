import React, { Component } from 'react'
import { View, Placform, StyleSheet, Text } from 'react-native'
import { Icon } from '@ui-kitten/components'
import StarRatingComponent from 'react-star-rating-component';

const Rating = () => {
    return (
        <View style={{ alignItems: 'center' }}>
            <StarRatingComponent
            name="rating"
            editing={false}
            starCount={5}
            value={3}
            />
        </View>
    )

}

export default Rating;
