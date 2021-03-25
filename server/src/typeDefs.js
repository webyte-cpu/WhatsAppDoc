// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
import { gql } from "apollo-server-express";

// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "admin" type defines the queryable fields for every admin in our data source.
  type Admin {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  type User{
    addressUid:
    firstName: String
    lastName: String
    email: String!
    password: String!
    sex: String
    birthdate: String
    phoneNumber: String
    weight: string
    height: String
    civilStatus: String
    nationality: String
    isDoctor: Boolean
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "admin" query returns an array of zero or more admin (defined above).

  type Query {
    admin: [Admin]
    user: [User]
  }

  type Mutation {
     hello: books(title,author)
  }

  type Subcription {

  }
`;

export default typeDefs;
