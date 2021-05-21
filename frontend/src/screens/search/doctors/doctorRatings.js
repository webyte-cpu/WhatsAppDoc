import React, { Component } from 'react'
import { View, Placform, StyleSheet, Text } from 'react-native'
import Stars from 'react-native-stars';
import { Icon } from '@ui-kitten/components'

const Rating = (props) => {
    return (
        <View style={{ alignItems: 'center' }}>
            <Stars
                default={0}
                count={5}
                half={false}
                starSize={20} 
                fullStar={<Icon {...props} name={'star'}  style={[props.style, styles.fill]}/>}
                emptyStar={<Icon {...props} name={'star-outline'} style={[props.style, styles.fill, styles.outline]} />}
            // halfStar={<Icon name={'star-half'} style={[props.style, styles.myEmptyStarStyle]} />}
            />
        </View>
    )

}

const styles = StyleSheet.create({
    fill: {
        color: '#FFB551',
        backgroundColor: 'transparent',
        textShadowColor: 'black',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    outline: {
        color: 'white',
    }
});

export default Rating;
