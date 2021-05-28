import { typeDefs as scalarTypeDefs } from "graphql-scalars";
import appointment from "../appointment/typeDef.js";
import enums from "../helpers/enums/typeDef.js";
import schedule from "../schedule/typeDef.js";
import patient from "../patient/typeDef.js";
import { gql } from "apollo-server-express";
import address from "../address/typeDef.js";
import signUp from "../signUp/typeDef.js";
import signIn from "../signIn/typeDef.js";
import doctor from "../doctor/typeDef.js";
import clinic from "../clinic/typeDef.js";
import user from "../user/typeDef.js";
import appointment from "../appointment/typeDef.js";

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
  enums,
  address,
  user,
  patient,
  doctor,
  clinic,
  schedule,
  signIn,
  signUp,
  appointment,
];

export default typeDefs;
