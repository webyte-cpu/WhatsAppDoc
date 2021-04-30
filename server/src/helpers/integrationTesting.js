import {
  typeDefs,
  resolvers,
  ApolloServer,
  context as defaultContext,
} from "../app.js";
import faker from "faker";
import pg from "../../db/index.js";
import knexCleaner from "knex-cleaner";
/**
 * Integration testing utils
 */

const defaultMocks = {
  UUID: () => faker.datatype.uuid(),
  DateTime: () => faker.datatype.datetime(),
  Password: () => faker.internet.password(12),
  EmailAddress: () => faker.internet.email(),
};

const constructTestServer = ({ context = defaultContext, mocks = {} } = {}) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    mocks: { ...mocks, ...defaultMocks },
    mockEntireSchema: false,
    context: context,
  });

  return { server };
};

const cleanDb = () => {
  const options = {
    mode: "truncate",
    restartIdentity: true,
  };
  
<<<<<<< Updated upstream
  knexCleaner.clean(pg, options).then(function () {
    console.log("your database is now clean");
  });
=======
  knexCleaner.clean(pg, options);
>>>>>>> Stashed changes
};

export { constructTestServer, cleanDb };
