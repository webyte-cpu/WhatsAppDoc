const { createTestClient } =  require('apollo-server-testing');
const { resolvers } = require('./resolver');
const { address } = require('./typeDef');
const { gql } = require("apollo-server-express");

const CREATE_ADDRESS = gql(`
  mutation create (
    $address: String!
    $city: String!
    $province: String!
    $zipCode: String!
    $country: String!
    $coordinates: String
  ) {
    create(address: $address, city: $city, province: $province, zipcode: $zipcode, country: $country, coordinates: $coordinates) {
      address
      city
      province
      zipCode
      country
      coordinates
    }
  }
`)

describe("create address", () => {
  it('Check if type Address has correct fields', () => {
    expect(address.Address).toBe(gql`
      type Address {
        uid: UUID!
        address: String!
        city: String!
        province: String!
        zipCode: String!
        country: String!
        coordinates: String
       }
    `)
  })
})