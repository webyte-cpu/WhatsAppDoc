import { resolvers as scalarResolvers } from "graphql-scalars";

import admin from "../admin/resolver.js";
import user from "../user/resolver.js";
import patient from "../patient/resolver.js";
import doctor from "../doctor/resolver.js";
// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.

const rootResolvers = [user, admin, patient, doctor];

const resolvers = [...rootResolvers, scalarResolvers];
export default resolvers;
