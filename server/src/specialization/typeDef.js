import { gql } from "apollo-server-express";

export default gql`
  type Specialization {
    uid: UUID!
    description: String!
    tag: String!
  }
`;
