import { resolvers as scalarResolvers } from "graphql-scalars";
import schedule from "../schedule/resolver.js";
import patient from "../patient/resolver.js";
import address from "../address/resolver.js";
import doctor from "../doctor/resolver.js";
import clinic from "../clinic/resolver.js";
import user from "../user/resolver.js";
const rootResolvers = [user, patient, doctor, address, clinic, schedule];
const resolvers = [...rootResolvers, scalarResolvers];
export default resolvers;


