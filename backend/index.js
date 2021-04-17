const { ApolloServer, gql } = require('apollo-server');

const knex = require('knex')({
  client: "pg",
  connection: {
    host: "localhost",
    user: "postgres",
    password: "postgres",
    database: "admin"
  }
});

const typeDefs = gql`
  type Doctor {
    id: Int!
    name: String!
    specialization: String!
    is_verified: Int!

  }

  type Query {
    doctors: [Doctor]
    getVerified: [Doctor]
    getUnVerified: [Doctor]
  }

  type Mutation {
    createDoctor(
      name: String!,
      specialization: String!
      is_verified: Int!,
    ): Doctor
  }

`;

const resolvers = {
  Mutation: {
    createDoctor: 
      async (_, { name, is_verified }) => {
        const [doctor] = await knex("doctor")
        .insert({name, is_verified })
        .returning("*")
        
        return(doctor);
      }
  },

  Query: {
    doctors: () => knex("doctors").select("*"),
    getVerified: () => knex("doctors").where("is_verified", 0).select("*"),
    getUnVerified: () => knex("doctors").where("is_verified", 1).select("*")
  }
}

const server = new ApolloServer({ 
  cors: true,
  typeDefs, 
  resolvers, 
  context: ({ req, res }) => ({ req, res }) 
});

server.listen().then(({ url }) => console.log(`server started at ${url}`));
