import { resolvers as scalarResolvers } from "graphql-scalars";
import user from "../user/resolver.js";
import patient from "../patient/resolver.js";
import doctor from "../doctor/resolver.js";

const rootResolvers = [user, patient, doctor];

const resolvers = [...rootResolvers, scalarResolvers];
export default resolvers;
