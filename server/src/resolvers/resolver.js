import mutation from "./mutatation.js";
import query from "./query.js";
import subscription from "./subscription.js";
import { resolvers as scalarResolvers } from "graphql-scalars";
// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.

const rootResolvers = {
  Query: query,
  Mutation: mutation,
  // Subcription: subscription,
};

const resolvers = [rootResolvers, scalarResolvers];
export default resolvers;
