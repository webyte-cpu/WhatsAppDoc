import * as yup from "yup";
import enums from "./enums";
import { VALID_PATTERNS, ERR_MSG } from "./validators";

// const patientSignUpSchema = yup.object({
//   contactNum: yup.string(),
//   civilStatus: yup.string(),
//   nationality: yup.string(),
// const {email ,password} = req.body
// });

const availabilitySchema = yup.object({
  scheduleSlotDuration: yup.number().required(),
  intervals: yup.array().of(yup.object({
    time: yup.array().of(yup.object({
      from: yup.number().required(),
      to: yup.number().required(),
    })),
    days: yup.array().of(yup.number()).required()
  }))
})

const schedulingNoticeSchema = yup.object({
  schedulingNotice: yup.number().label('Minimum scheduling notice').required()
})
const clinicAboutSchema = yup.object({
  consultationFee: yup.number().label("Consultation fee").required(),
  roomNumber: yup.string().label("Room Number")
});

const clinicNameSchema = yup.object({
  clinicName: yup.string().label("Clinic name").required(),
});

const addressSchema = yup.object({
  streetAddress: yup.string().label("Street Address").required(),
  city: yup.string().label("City").required(),
  province: yup.string().label("State/Province").required(),
  country: yup.string().label("Country").required(),
  zipCode: yup.string().label("Zipcode").required(),
});

const doctorSignUpSchema = yup.object({
  specialization: yup.string().label("Specialization").required(),
  licenseNum: yup.string().label("License Number").required(),
  licenseImg: yup.string().label("License Image").required(),
  expirationDate: yup.date().label("Expiration date").required(),
  verificationStatus: yup.string().label("Verification Status").required(),
});

const loginSchema = yup.object({
  email: yup.string().label("Email").email("Invalid email format").required(),
  password: yup.string().label("Password").required(),
});

const userSignUpSchema = yup.object({
  email: yup.string().label("Email").email("Invalid email format").required(),
  password: yup
    .string()
    .label("Password")
    .matches(VALID_PATTERNS.PASSWORD, ERR_MSG.PASSWORD)
    .required(),
  fname: yup.string().label("First name").required(),
  lname: yup.string().label("Last name").required(),
  midName: yup.string(),
  sex: yup.string().label("Sex").required(),
  birthdate: yup.date().label("Birthdate").required(),
  role: yup
    .string()
    .label("Role")
    .matches(VALID_PATTERNS.ROLE, "Invalid role")
    .required(),
});

export {
  loginSchema,
  userSignUpSchema,
  doctorSignUpSchema,
  addressSchema,
  clinicAboutSchema,
  clinicNameSchema,
  schedulingNoticeSchema,
  availabilitySchema
};
