import { gql } from "apollo-server-express";
import { typeDefs as scalarTypeDefs } from "graphql-scalars";
import admin from "./admin.js";
import doctor from "./doctor.js";
import user from "./users.js";
import patient from "./patient.js";

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
