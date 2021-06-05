import { resolvers as scalarResolvers } from "graphql-scalars";
import notification from "../notification/resolver.js";
import appointment from "../appointment/resolver.js";
import schedule from "../schedule/resolver.js";
import patient from "../patient/resolver.js";
import address from "../address/resolver.js";
import signUp from "../signUp/resolver.js";
import signIn from "../signIn/resolver.js";
import doctor from "../doctor/resolver.js";
import clinic from "../clinic/resolver.js";
import user from "../user/resolver.js";

const rootResolvers = [
  user,
  patient,
  doctor,
  address,
  clinic,
  schedule,
  signIn,
  signUp,
  appointment,
  notification,
];

const resolvers = [...rootResolvers, scalarResolvers];
export default resolvers;
