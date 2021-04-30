import { createTestClient } from "apollo-server-testing";
import { cleanDb, constructTestServer } from "../helpers/__utils.js";
<<<<<<< Updated upstream
import { GET_USER, SIGN_UP, SIGN_IN } from "./queries.js";
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
        $lastName: String!,
        $password: String!
      ){
        signUp(
          firstName: $firstName,
          middleName: $middleName,
          lastName: $lastName,
          password: $password
          ){
            uid
            firstName
            MiddleName
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

  it('Should pass if updateUser query is correct', () => {
    const updateUser = `
    mutation updateUser(
      $firstName: String!,
      $MiddleName: String,
      $lastName: String!,
      $password: String!
    ){
      updateUser(
        firstName: $firstName,
        MiddleName: $MiddleName,
        lastName: $lastName,
        password: $password
      ){
        uid
      }
    }
    `

    tester.test(true, updateUser, {
      firstName: "John",
      MiddleName: "D.",
      lastName: "Doe",
      password: "johnDoe"
    })
  })

  it('Should pass if deleteUser query is correct', () => {
    const deleteUser = `
    mutation deleteUser($uid: ID!){
      deleteUser(uid: $uid){
        uid
      }
    }
    `

    tester.test(true, deleteUser, {
      uid: 3
    })
  })

  it("fetches single user", async () => {
    // create a test server to test against, using our production typeDefs,
    // resolvers, and dataSources.
=======
import { GET_USER, SIGN_UP, SIGN_IN, UPDATE_USER, DELETE_USER } from "./queries.js";
import jwt from 'jsonwebtoken';
import pg from '../../db/index.js';

describe("Queries", () => {
  it("fetches single user", async () => {
    // create a test server to test against, using our production typeDefs,
    // resolvers, and dataSources.

>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    afterAll(() => {
      return cleanDb(); // with that we are cleaning the database after all the tests have been executed
    });
=======
    afterEach(async () => {
      return await cleanDb(); // with that we are cleaning the database after all the tests have been executed
    });

    // beforeEach(async () => {
    //   await pg("users").where({user_email: "kyle2021@webyte.org"}).delete();
    //   console.log("deleted");
    // })
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
        email: "kyle2020@webyte.org",
        password: "L3Tm31N",
        role: "ADMIN",
=======
        email: "kyle2021@webyte.org",
        password: "L3Tm31N",
        role: "PATIENT",
        sex: "MALE",
        birthdate: "1999-09-25"
>>>>>>> Stashed changes
      },
    });
    expect(res).toMatchSnapshot();
  });

<<<<<<< Updated upstream
  it("Signs in up", async () => {
    afterAll(() => {
      return cleanDb();
    });
=======
  it("signs in the user", async () => {
    
    beforeEach( async () => {
      const seed = await pg.seed.run();
      console.log(seed);
      return seed;
    })
>>>>>>> Stashed changes

    const { server } = constructTestServer();

    const { query } = createTestClient(server);

    const res = await query({
      query: SIGN_IN,
      variables: {
<<<<<<< Updated upstream
        email: "kyle2020@webyte.org",
        password: "password"
      }
    });
=======
        email: "kyle2021@webyte.org",
        password: "L3Tm31N"
      },
    });

    console.log(res.data.signIn);
    const payload = jwt.verify(res.data.signIn, process.env.JWT_SECRET_KEY);
    console.log(payload);
    expect(payload).toMatchSnapshot();
  })

  it("updates the user", async () => {

    const { server } = constructTestServer();

    const { query } = createTestClient(server);

    const res = await query({ 
      query: UPDATE_USER,
      variables: {
        uid: "8b686839-4c94-48ac-ac51-86d36b7bf17c",
        firstName: "Kent",
        middleName: "Canamo",
        lastName: "Handumon",
        password: "password"
      }
    })

    expect(res).toMatchSnapshot();
  })

  it("deletes the user", async () => {
    const { server } = constructTestServer();
    
    const { query } = createTestClient(server);

    const res = await query({
      query: DELETE_USER,
      variables: {
        uid: "8b686839-4c94-48ac-ac51-86d36b7bf17c"
      }
    })

>>>>>>> Stashed changes
    expect(res).toMatchSnapshot();
  })
});
