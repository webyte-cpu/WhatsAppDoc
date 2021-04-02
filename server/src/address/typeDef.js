import { gql } from "apollo-server-express";

const address = gql`
  type Address {
    uid: UUID!
    street: String!
    city: String!
    province: String!
    zipCode: String!
    country: String!
    coordinates: String
  }

  input AddressInput {
    street: String!
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
      street: String!
      city: String!
      province: String!
      zipCode: String!
      country: String!
      coordinates: String
    ): Address
    updateAddress(
      uid: UUID!
      street: String!
      city: String!
      province: String!
      zipCode: String!
      country: String!
      coordinates: String
    ): Address
    deleteAddress(uid:UUID!): Address
  }
`;

export default address;
