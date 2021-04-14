const { gql } = require ("apollo-server-express");

const address = gql`
  type Address {
    uid: UUID!
    address: String!
    city: String!
    province: String!
    zipCode: String!
    country: String!
    coordinates: String
  }

  input AddressInput {
    address: String!
    city: String!
    province: String!
    zipCode: String!
    country: String!
    coordinates: String
  }

  extend type Query {
    getAddress(uid: UUID): Address
  }

  extend type Mutation {
    createAddress(
      address: String!
      city: String!
      province: String!
      zipCode: String!
      country: String!
      coordinates: String
    ): Address
    updateAddress(
      uid: UUID!
      address: String!
      city: String!
      province: String!
      zipCode: String!
      country: String!
      coordinates: String
    ): Address
    deleteAddress(uid:UUID!): Address
  }
`;

module.exports = { address };
