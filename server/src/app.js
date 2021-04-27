import { ApolloServer } from "apollo-server-express";
import resolvers from "./rootResolver/resolver.js";
import typeDefs from "./rootTypeDef/typeDefs.js";
import expressJwt from "express-jwt";
import express from "express";
import "dotenv/config.js";

const port = 4000;
const app = express();
app.use(
  expressJwt({
    secret: process.env.JWT_SECRET_KEY,
    algorithms: ["HS256"],
    credentialsRequired: false,
  })
);

const context = async ({ req }) => {
  return { user: req?.user || {} };
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
});

server.applyMiddleware({ app });

app.listen({ port }, () =>
  console.log(`Now browse to http://localhost:${port}` + server.graphqlPath)
);

export { typeDefs, resolvers, server, ApolloServer, context };
