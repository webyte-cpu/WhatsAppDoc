import React, { useState } from 'react';
import { View, ScrollView, } from 'react-native';
import { Tab, TabView } from '@ui-kitten/components';
import About from './about'
import Availability from './availability'
import Limits from './limits'

const AppointmentProperties = ({navigation}) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <ScrollView>
            <View>
                <TabView
                    selectedIndex={selectedIndex}
                    onSelect={index => setSelectedIndex(index)}
                >
                <Tab title='About'>
                    <About />
                </Tab>
                <Tab title='Availability'>
                    <Availability />
                </Tab>
                <Tab title='Limits'>
                    <Limits />
                </Tab>
                </TabView>
            </View>
        </ScrollView>
    )
}

export default AppointmentProperties