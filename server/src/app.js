import { ApolloServer } from "apollo-server-express";
import resolvers from "./rootResolver/resolver.js";
import typeDefs from "./rootTypeDef/typeDefs.js";
import expressJwt from "express-jwt";
import express from "express";
import cors from "cors";
import "dotenv/config.js";

const port = 4000;
const app = express();
app.use(cors());
app.use(
  // decode JWT Token, store in req.user
  expressJwt({
    secret: process.env.JWT_SECRET_KEY,
    algorithms: ["HS256"],
    credentialsRequired: false,
  })
);

const context = async ({ req }) => {
  return {
    user: req?.user || {},
  };
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  formatError: (err) => {
    // Don't give the specific errors to the client.
    if (err.message.startsWith("Database Error: ")) {
      return new Error("Internal server error");
    }

    // Otherwise return the original error. The error can also
    // be manipulated in other ways, as long as it's returned.
    return err;
  },
});

server.applyMiddleware({ app });

app.listen({ port }, () =>
  console.log(`Now browse to http://localhost:${port}` + server.graphqlPath)
);

export { typeDefs, resolvers, server, ApolloServer, context };
