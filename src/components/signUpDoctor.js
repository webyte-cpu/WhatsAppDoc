import React from 'react';
import { Input, Text } from '@ui-kitten/components';


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
        </>
    )
}

export default SignUpDoctor