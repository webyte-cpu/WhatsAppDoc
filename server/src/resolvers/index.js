import mutation from "./mutatation";
import query from "./query";
import subscription from "./subscription";

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.

const resolvers = {
  Query: query,
  Mutation: mutation,
  Subcription: subscription,
};

export default resolvers;
