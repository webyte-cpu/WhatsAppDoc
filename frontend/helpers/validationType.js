import * as yup from 'yup';
import enums from './enums';
import { VALID_PATTERNS, ERR_MSG } from './validators';

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
// const {email ,password} = req.body
// });

const doctorSignUpSchema = yup.object({
  specialization: yup.string().label('Specialization').required(),
  licenseNum: yup.string().label('License Number').required(),
  licenseImg: yup.string().label('License Image').required(),
  expirationDate: yup.date().label('Expiration date').required(),
  verificationStatus: yup.string().label('Verification Status').required(),
});

const loginSchema = yup.object({
  email: yup.string().label('Email').email('Invalid email format').required(),
  password: yup.string().label('Password').required(),
});

const userSignUpSchema = yup.object({
  email: yup.string().label('Email').email('Invalid email format').required(),
  password: yup
    .string()
    .label('Password')
    .matches(VALID_PATTERNS.PASSWORD, ERR_MSG.PASSWORD)
    .required(),
  fname: yup.string().label('First name').required(),
  lname: yup.string().label('Last name').required(),
  midName: yup.string(),
  sex: yup.string().label('Sex').required(),
  birthdate: yup.date().label('Birthdate').required(),
  role: yup
    .string()
    .label('Role')
    .matches(VALID_PATTERNS.ROLE, 'Invalid role')
    .required(),
});

export { loginSchema, userSignUpSchema, doctorSignUpSchema };
