import * as yup from 'yup';

const strongPswdPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
const validRoles = /^(PATIENT|DOCTOR)$/;

// const addressSchema = yup.object({
//   address: yup.string(),
//   city: yup.string(),
//   province: yup.string(),
//   zipCode: yup.string(),
// });
// const patientSignUpSchema = yup.object({
//   contactNum: yup.string(),
//   civilStatus: yup.string(),
//   nationality: yup.string(),
// });

const doctorSignUpSchema = yup.object({
  specialization: yup.string().required('Specialization is required'),
  licenseNum: yup.string().required('License number is required'),
  licenseImg: yup.string().required('License image is required'),
  verificationStatus: yup.string().required(''),
});

const userSignUpSchema = yup.object({
  email: yup.string().label('Email').email('Invalid email format').required(),
  password: yup
    .string()
    .label('Password')
    .matches(
      strongPswdPattern,
      'Must contain at least a number, an uppercase and lowercase letter, and at least 8 or more characters'
    )
    .required(),
  fname: yup.string().label('First name').required(),
  lname: yup.string().label('Last name').required(),
  midName: yup.string(),
  sex: yup.string().label('Sex').required(),
  birthdate: yup.date().label('Birthdate').required(),
  role: yup
    .string()
    .label('Role')
    .matches(validRoles, 'Invalid role')
    .required(),
});

const loginSchema = yup.object({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email Address is required'),
  password: yup.string().required('Password is required'),
});

export { loginSchema, userSignUpSchema, doctorSignUpSchema };
