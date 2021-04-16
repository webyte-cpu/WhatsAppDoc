const EasyGraphQLTester = require('easygraphql-tester')
const fs = require('fs')
const path = require('path')

const schemaCode = fs.readFileSync(
  path.join(__dirname, ".", "clinic-schema.gql"),
  "utf8"
);

const createClinic =`
  mutation createClinic(
    $address: String
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $sex: String
    $phoneNumber: String
    $weight: Float
    $height: Float
    $civilStatus: String
    $nationality: String
    $isClinic: Boolean
    $licenceNo: String!
    $experience: Int!
    $rating: Int
    $verificationStatus: VerificationStatus
    $about: String
    $bio: String
  ) {
    address: $address
    firstName: $firstName,
    lastName: $lastName,
    email: $email,
    password: $password,
    sex: $sex,
    phoneNumber: $phoneNumber,
    weight: $weight,
    height: $height,
    civilStatus: $civilStatus,
    nationality: $nationality,
    isClinic: $isClinic,
    licenceNo: $licenceNo,
    experience: $experience,
    rating: $rating,
    verificationStatus: $verificationStatus
    about: $about
    bio: $bio
  }
`

const updateClinic = `
  mutation updateClinic(
    $address: String!
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $sex: String
    $phoneNumber: String
    $weight: PositiveFloat
    $height: PositiveFloat
    $civilStatus: String
    $nationality: String
    $isClinic: Boolean
    $licenceNo: String!
    $experience: Int!
    $rating: Int
    $verificationStatus: VerificationStatus
    $about: String
    $bio: String
  ) {
    address: $addressInput
    firstName: $firstName
    lastName: $lastName
    email: $email
    password: $password
    sex: $sex
    phoneNumber: $phoneNumber
    weight: $weight
    height: $height
    civilStatus: $civilStatus
    nationality: $nationality
    isClinic: $isClinic
    licenceNo: $licenceNo
    experience: $experience
    rating: $rating
    verificationStatus: $verificationStatus
    about: $about
    bio: $bio
  }
`



describe("Test Queries and Mutations", () => {
  let tester;

  beforeAll(() => {
    tester = new EasyGraphQLTester(schemaCode);
  });

  it("Should pass with a valid query", () => {
      
    const query = `
    {
      getClinic(uid: 3) {
        name
        roomNumber
        address
      }
    }      
    `;

    tester.test(true, query);
  });

})