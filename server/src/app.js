import "dotenv/config.js";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import resolvers from "./resolvers/resolver.js";
import typeDefs from "./typeDefs/typeDefs.js";

// The ApolloServer constructor requires two parameters:
// your schema definition and your set of resolvers.

const server = new ApolloServer({ typeDefs, resolvers });
const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log("Now browse to http://localhost:4000" + server.graphqlPath)
);
