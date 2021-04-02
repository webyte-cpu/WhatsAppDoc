import { gql } from "apollo-server-core";
const admin = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "admin" type defines the queryable fields for every admin in our data source.
  type Admin {
    uid: UUID!
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "admin" query returns an array of zero or more admin (defined above).

  extend type Query {
    getAdmin(uid: UUID): [Admin]
  }

  extend type Mutation {
    createAdmin(
      uid: UUID!
      firstName: String!
      lastName: String!
      email: EmailAddress!
      password: String!
    ): Admin

    updateAdmin(
      uid: UUID!
      firstName: String!
      lastName: String!
      email: EmailAddress!
      password: String!
    ): Admin

    deleteAdmin(uid: UUID!): Admin
  }

  # type Subcription {

  # }
`;

export default admin;
