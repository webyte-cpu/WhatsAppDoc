import { resolvers as scalarResolvers } from "graphql-scalars";
import user from "../user/resolver.js";
import patient from "../patient/resolver.js";
import doctor from "../doctor/resolver.js";
import address from "../address/resolver.js";
import schedule from "../schedule/resolver.js";

import { resolvers as customerScalarResolvers } from "../customScalar/index.js";

const rootResolvers = [user, patient, doctor, address, schedule];

const resolvers = [...rootResolvers, scalarResolvers, customerScalarResolvers];
export default resolvers;
