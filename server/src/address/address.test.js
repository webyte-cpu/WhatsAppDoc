import EasyGraphQLTester from 'easygraphql-tester'
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const schemaCode = fs.readFileSync(
  path.join(__dirname, ".", "address-schema.gql"),
  "utf8"
);

const createAddress = `
  mutation createAddress(
    $address: String!,
    $city: String!,
    $province: String!,
    $zipCode: String!,
    $country: String!,
    $coordinates: String
  ){
    createAddress(
      address: $address, 
      city: $city, 
      province: $province, 
      zipCode: $zipCode,
      country: $country,
      coordinates: $coordinates
    ) {
      city
      coordinates
    }
  }
`

const updateAddress = `
  mutation createAddress(
    $uid: ID!,
    $address: String!,
    $city: String!,
    $province: String!,
    $zipCode: String!,
    $country: String!,
    $coordinates: String
  ){
    updateAddress(
      uid: $uid,
      address: $address, 
      city: $city, 
      province: $province, 
      zipCode: $zipCode,
      country: $country,
      coordinates: $coordinates
    ) {
      uid
      coordinates
    }
  } 
`

const deleteAddress = `
  mutation deleteAddress(
    $uid: ID!
  ){
    deleteAddress(
      uid: $uid
    ) {
      uid
      coordinates
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
      getAddress(uid: 3) {
        address
        city
        province
      }
    }      
    `;
    tester.test(true, query);
  });

  it('Should fail if the query is invalid', () => {
    const invalidQuery = `
        {
          getAddress(uid: 3) {
            address
            city
            province
            user
          }
        }
      `

    tester.test(false, invalidQuery)
  })

  it('Should pass if create query is correct', () => {
    tester.test(true, createAddress, {
      address: "Ungka II",
      city: "Pavia",
      province: "Iloilo",
      zipCode: "123",
      country: "Philippines",
      coordinates: "11234"
    })
  });

  it('Should pass if update query is correct', () => {
    tester.test(true, updateAddress, {   
      uid: 2,
      address: "Ungka II",
      city: "Pavia",
      province: "Iloilo",
      zipCode: "123",
      country: "Philippines",
      coordinates: "11234"
    })
  });

  it('Should pass if delete query is correct', () => {
    tester.test(true, deleteAddress, {
      uid: 2
    })
  });
})