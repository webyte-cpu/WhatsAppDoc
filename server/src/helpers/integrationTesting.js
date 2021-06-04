import { ApolloServer, context as defaultContext, server, typeDefs, resolvers } from "../app.js";
// import faker from "faker";
import pg from "../../db/index.js";
import knexCleaner from "knex-cleaner";
/**
 * Integration testing utils
 */

// const defaultMocks = {
//   UUID: () => faker.datatype.uuid(),
//   DateTime: () => faker.datatype.datetime(),
//   Password: () => faker.internet.password(12),
//   EmailAddress: () => faker.internet.email(),
// };

const constructTestServer = ({ context } = {}) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    // mocks: { ...mocks, ...defaultMocks },
    // mockEntireSchema: false,
    context: async () => ({ ...await defaultContext(), ...context() }),
  });
  
  return { server };
};

const cleanDb = () => {
  const options = {
    mode: "truncate",
    restartIdentity: true,
  };
  return knexCleaner.clean(pg, options);
};

export { constructTestServer, cleanDb };
