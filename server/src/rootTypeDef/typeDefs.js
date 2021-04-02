import { gql } from "apollo-server-express";
import { typeDefs as scalarTypeDefs } from "graphql-scalars";
import address from "../address/typeDef.js";
import admin from "../admin/typeDef.js";
import doctor from "../doctor/typeDef.js";
import patient from "../patient/typeDef.js";
import user from "../user/typeDef.js";

const rootTypeDefs = gql`
  type Query {
    root: String
  }
  type Mutation {
    root: String
  }
  type Subcription {
    root: String
  }
`;

const typeDefs = [
  rootTypeDefs,
  ...scalarTypeDefs,
  address,
  admin,
  user,
  patient,
  doctor,
];

export default typeDefs;
