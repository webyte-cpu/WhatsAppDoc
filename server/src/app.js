import "dotenv/config.js";
import express from "express";
import expressJwt from "express-jwt";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./rootTypeDef/typeDefs.js";
import resolvers from "./rootResolver/resolver.js";

const port = 4000;
const app = express();

app.use(
  expressJwt({
    secret: "supersecret",
    algorithms: ["HS256"],
    credentialsRequired: false,
  })
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    
    // try to retrieve a user with the token
    const user = req.user || {}

    // optionally block the user
    // we could also check user roles/permissions here
    if (!user) throw new AuthenticationError("you must be logged in");

    // add the user to the context
    return { user };
  },
});
server.applyMiddleware({ app });

app.listen({ port }, () =>
  console.log("Now browse to http://localhost:4000" + server.graphqlPath)
);
