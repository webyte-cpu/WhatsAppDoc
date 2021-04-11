import React, { useState } from 'react';


const Form = ({ }) => {
    const [errorMsg, setErrorMsg] = useState({
        email: '',
        password: '',
        fname: '',
        lname: '',
        midName: '',
        contactNum: '',
        address: '',
        city: '',
        province: '',
        zipCode: '',
        specialization: '',
        licenseNum: '',
        licenseImg: '',
        verificationStatus: '',
    });

    const validations = () => ({
        email: {
            required: true,
            patternEmail: { regex: /\S+@\S+\.\S+/ },
        },
        password: {
            required: true,
            patternPassword: { regex: "^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$" },
            minlength: { requiredLength: 8 },
        },
        fname: { required: true, },
        lname: { required: true, },
        midName: { required: true, },
        contactNum: { required: true, },
        address: { required: true, },
        city: { required: true, },
        province: { required: true, },
        zipCode: { required: true, },
        specialization: { required: true, },
        licenseNum: { required: true, },
        licenseImg: { required: true, },
        verificationStatus: { required: true, },
    })
}