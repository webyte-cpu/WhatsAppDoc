import { gql } from "apollo-server-express";

export default gql`
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
    uid: UUID
    address: String
    city: String
    province: String
    zipCode: String
    country: String
    coordinates: String
  }

  extend type Query {
    getAddress(uid: UUID): Address
    getAllAddresses: [Address]
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
      address: String
      city: String
      province: String
      zipCode: String
      country: String
      coordinates: String
    ): Address
    deleteAddress(uid: UUID!): Address
  }
`;
