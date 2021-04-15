const fs = require("fs");
const path = require("path");
const EasyGraphQLTester = require("easygraphql-tester");
const resolvers = require("./resolver");
const { expect } = require("chai");

const schema = fs.readFileSync(
  path.join(__dirname, ".", "address-schema.gql"),
  "utf8"
);

let tester;

beforeAll(() => {
  tester = new EasyGraphQLTester(schema, resolvers);
});

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

describe("Address Query Testing", () => {
  it('Should pass if create query is correct', () => {
    tester.test(true, createAddress, {
      address: "Ungka II",
      city: "Pavia",
      province: "Iloilo",
      zipCode: "123",
      country: "Philippines",
      coordinates: "11234"
    })
  })

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
  })

  it('Should pass if delete query is correct', () => {
    tester.test(true, deleteAddress, {
      uid: 2
    })
  })

})