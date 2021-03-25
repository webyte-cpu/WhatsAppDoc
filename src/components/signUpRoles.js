import React, { useState } from 'react';
import { View, } from 'react-native'
import { Input, Text } from '@ui-kitten/components';


const SignUpPatient = () => {
    return (
        <>
            <Text category="h6" style={{ marginBottom: 20, marginTop: 20 }}>Address Information</Text>
            <Input
                label='City'
                placeholder="Enter City"
            />
            <Input
                label='Province'
                placeholder="Enter Province"
            />
            <Input
                label='Zip Code'
                placeholder="Enter Zip Code"
            />
            <Input
                label='Country'
                placeholder="Enter Country"
            />
        </>
    )
}

const SignUpDoctor = () => {
    return (
        <>
            <Text category="h6" style={{ marginBottom: 20, marginTop: 20 }}>Practitioner Information</Text>
            <Input
                label='Specialization'
                placeholder="Enter Specialization"
            />
            <Input
                label='License Number'
                placeholder="Enter License Number"
            />

            <Text category="h6" style={{ marginBottom: 20, marginTop: 20 }}>Address Information</Text>
            <Input
                label='City'
                placeholder="Enter City"
            />
            <Input
                label='Province'
                placeholder="Enter Province"
            />
            <Input
                label='Zip Code'
                placeholder="Enter Zip Code"
            />
            <Input
                label='Country'
                placeholder="Enter Country"
            />
        </>
    )
}

export { SignUpPatient, SignUpDoctor }