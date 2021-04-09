import { gql } from "apollo-server-core";
import Password from "./password.js";

const resolvers = {
    Password
};
const typeDef = gql`

scalar Password

`

export { typeDef, resolvers };
