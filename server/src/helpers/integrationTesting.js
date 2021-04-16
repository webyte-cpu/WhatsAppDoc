import {
  typeDefs,
  resolvers,
  ApolloServer,
  context as defaultContext,
} from "../app.js";

/**
 * Integration testing utils
 */

const defaultMocks = {
  UUID: () => "8bb11d0d-21eb-41f6-b476-aa28f9ee6db9",
  DateTime: () => new Date("2021-04-15"),
  Password: () => "helloWorld1234",
  EmailAddress: () => "kyle@webyte.org",
};

const constructTestServer = ({ context, mocks }) => {
  const combinedMock = { ...(mocks || {}), ...defaultMocks };

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    mocks: combinedMock,
    mockEntireSchema: false,
    context: context || defaultContext,
  });

  return { server };
};

export default constructTestServer;
