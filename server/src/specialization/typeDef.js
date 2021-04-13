import { gql } from "apollo-server-express";

const specialization = gql`
  type Specialization {
    uid: UUID!
    description: String!
    tag: String!
  }
`;

export default specialization;
