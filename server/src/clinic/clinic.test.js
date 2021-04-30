<<<<<<< Updated upstream
import EasyGraphQLTester from 'easygraphql-tester'
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const schemaCode = fs.readFileSync(
  path.join(__dirname, ".", "clinic-schema.gql"),
  "utf8"
);

const createClinic =`
  mutation createClinic(
    $address: String!,
    $firstName: String!,
    $lastName: String!,
    $email: String!,
    $password: String!,
    $sex: String!,
    $phoneNumber: String,
    $weight: Float,
    $height: Float,
    $civilStatus: String,
    $nationality: String,
    $isClinic: Boolean,
    $licenceNo: String!,
    $experience: Int!,
    $rating: Int,
    $verificationStatus: VerificationStatus,
    $about: String,
    $bio: String
  ) {
    createClinic(
      address: $address,
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
      verificationStatus: $verificationStatus,
      about: $about,
      bio: $bio
    ) {
      name
      roomNumber
      address
    }
  }
`

const updateClinic = `
  mutation updateClinic(
    $address: String!,
    $firstName: String!,
    $lastName: String!,
    $email: String!,
    $password: String!,
    $sex: String!,
    $phoneNumber: String,
    $weight: Float,
    $height: Float,
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
    updateClinic(
      address: $address,
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
      verificationStatus: $verificationStatus,
      about: $about,
      bio: $bio
    ) {
      name
      roomNumber
      address
    }
  }
`

const deleteClinic = `
  mutation deleteClinic(
    $uid: ID!
  ){
    deleteClinic(
      uid: $uid
    ){
      uid
      name
      roomNumber
    }
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

  it("Should pass if create query is correct", () => {
    tester.test(true, createClinic, {
      address: "Iloilo City",
      firstName: "John",
      lastName: "Doe",
      email: "JohnDoe@gmail.com",
      password: "password",
      sex: "Male",
      phoneNumber: "09312345831",
      weight: 46.0,
      height: 136.0,
      civilStatus: "Single",
      nationality: "Filipino",
      isClinic: true,
      licenceNo: "331-31-30",
      experience: 2,
      rating: 9,
      verificationStatus: "VERIFIED",
      about: "Test Doc",
      bio: "Im a test doc"
    })
  })

  it("Should pass if update query is correct", () => {
    tester.test(true, updateClinic, {
      address: "Iloilo City",
      firstName: "John",
      lastName: "Doe",
      email: "JohnDoe@gmail.com",
      password: "password",
      sex: "Male",
      phoneNumber: "09312345831",
      weight: 46.0,
      height: 136.0,
      civilStatus: "Single",
      nationality: "Filipino",
      isClinic: true,
      licenceNo: "331-31-30",
      experience: 2,
      rating: 9,
      verificationStatus: "VERIFIED",
      about: "Test Doc",
      bio: "Im a test Doc"
    })
  })

  it("Should pass if delete query is correct", () => {
    tester.test(true, deleteClinic, {
      uid: 3
    })
  })

})
=======
>>>>>>> Stashed changes
describe('My work', () => {
    test('works', () => {
      expect(2).toEqual(2)
    })
<<<<<<< Updated upstream
  })
=======
  })
>>>>>>> Stashed changes
