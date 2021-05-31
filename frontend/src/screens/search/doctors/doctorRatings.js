import React from 'react'
import { View } from 'react-native'
import StarRatingComponent from 'react-star-rating-component';

const Rating = ({ rating }) => {
    return (
        <>
            <StarRatingComponent    //https://github.com/voronianski/react-star-rating-component
                name="ratings"
                editing={false}
                starCount={5}
                value={rating}
            />
        </>
    )

}

export default Rating;
