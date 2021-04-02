import "dotenv/config.js";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./rootTypeDef/typeDefs.js";
import resolvers from "./rootResolver/resolver.js";

// The ApolloServer constructor requires two parameters:
// your schema definition and your set of resolvers.

const server = new ApolloServer({ typeDefs, resolvers });
const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log("Now browse to http://localhost:4000" + server.graphqlPath)
);
