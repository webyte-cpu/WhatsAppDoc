import { gql } from "apollo-server-express";
import { typeDefs as scalarTypeDefs } from "graphql-scalars";
import admin from "./admin.js.js.js";
import doctor from "./doctor.js.js.js";
import user from "./users.js.js.js";
import patient from "../patient/typeDef.js";

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
  user,
  admin,
  doctor,
  patient,
];

export default typeDefs;
