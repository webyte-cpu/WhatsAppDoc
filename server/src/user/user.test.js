import { createTestClient } from "apollo-server-testing";
import { cleanDb, constructTestServer } from "../helpers/__utils.js";
import { GET_USER, SIGN_UP } from "./queries.js";
import EasyGraphQLTester from 'easygraphql-tester';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const schemaCode = fs.readFileSync(
  path.join(__dirname, ".", "user-schema.gql"),
  "utf8"
);

describe("Tests Queries and Mutations", () => {

  let tester;

  beforeAll(() => {
    tester = new EasyGraphQLTester(schemaCode);
  });

  it("Should pass with a valid query", () => {

    const getUsersQuery = `
    {
      getUser(uid: 3) {
        uid
        firstName
        MiddleName
        lastName
      }
    }      
    `;

    const getAllUserQuery = `
    {
      getAllUser {
        uid 
        firstName
        MiddleName
        lastName
      }
    }
    `;

    const viewerQuery = `
    {
      viewer {
        uid 
        firstName
        MiddleName
        lastName
      }
    }
    `

    tester.test(true, getUsersQuery);
    tester.test(true, getAllUserQuery);
    tester.test(true, viewerQuery);
  });

  it('Should pass if signIn query is correct', () => {
    const signIn = `
      mutation signIn(
        $email: String!,
        $password: String!
      ){
        signIn(email: $email, password: $password){
          uid
          firstName
          MiddleName
          lastName
        }
      }
    `

    tester.test(true, signIn, {
      email: 'kent@gmail.com',
      password: 'password'
    })
  });

  it('Should pass if signUp query is correct', () => {
    const signUp = `
      mutation signUp(
        $firstName: String!,
        $middleName: String,
        lastName: String!,
        password: String!
      ){
        signUp(
          firstName: $firstName,
          middleName: $middleName,
          lastName: $lastName,
          password: $password
          ){
            uid
            firstName
            middleName
          }
      }
    `

    tester.test(true, signUp, {
      firstName: "John",
      middleName: "J.",
      lastName: "Doe",
      password: "johndoe1"
    })
  })

  it("fetches single user", async () => {
    // create a test server to test against, using our production typeDefs,
    // resolvers, and dataSources.
    const { server } = constructTestServer();

    // use the test server to create a query function
    const { query } = createTestClient(server);

    // run query against the server and snapshot the output
    const res = await query({
      query: GET_USER,
      variables: { uid: "8b686839-4c94-48ac-ac51-86d36b7bf17c" },
    });
    expect(res).toMatchSnapshot();
  });

  it("it signs up user", async () => {
    afterAll(() => {
      return cleanDb(); // with that we are cleaning the database after all the tests have been executed
    });
    // create a test server to test against, using our production typeDefs,
    // resolvers, and dataSources.
    const { server } = constructTestServer();

    // use the test server to create a query function
    const { query } = createTestClient(server);

    // run query against the server and snapshot the output
    const res = await query({
      query: SIGN_UP,
      variables: {
        firstName: "Kyle",
        lastName: "Osunero",
        email: "kyle2020@webyte.org",
        password: "L3Tm31N",
        role: "ADMIN",
      },
    });
    expect(res).toMatchSnapshot();
  });
});
