import { ApolloServer } from "apollo-server-express";
import { validateToken } from "./helpers/index.js";
import resolvers from "./rootResolver/resolver.js";
import typeDefs from "./rootTypeDef/typeDefs.js";
import { PubSub } from "graphql-subscriptions";
import loader from "./helpers/loader.js";
import expressJwt from "express-jwt";
import express from "express";
import http from "http";
import cors from "cors";
import "dotenv/config.js";

const PORT = 4000;
const app = express();

app.use(cors());
app.use(
  expressJwt({
    secret: process.env.JWT_SECRET_KEY,
    algorithms: ["HS256"],
    credentialsRequired: false,
  })
);

const pubsub = new PubSub();
export const context = async ({ req, connection }) => {
  return { user: req?.user || connection?.context.user || {}, loader, pubsub };
};

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  subscriptions: {
    path: "/subscriptions",
    onConnect: (connectionParams, webSocket, context) => {
      console.log("Connected!🌟");
      if (connectionParams.Authorization) {
        return {
          user: validateToken(connectionParams.Authorization),
        };
      }

      throw new Error("Missing auth token!");
    },

    onDisconnect: (webSocket, context) => {
      console.log("Disconnected!");
    },
  },
});

export const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  const httpServer = http.createServer(app);
  server.installSubscriptionHandlers(httpServer);

  // Make sure to call listen on httpServer, NOT on app.
  await new Promise((resolve) => httpServer.listen(PORT, resolve));
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
  console.log(
    `🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`
  );
  return { httpServer };
};

startApolloServer();
export { typeDefs, ApolloServer, resolvers };
