import { createTestClient } from "apollo-server-testing";
import { cleanDb, constructTestServer } from "../helpers/__utils.js";
import { GET_USER, SIGN_UP, SIGN_IN, UPDATE_USER, DELETE_USER } from "./queries.js";
import jwt from 'jsonwebtoken';
import pg from '../../db/index.js';

describe("Queries", () => {
  it("fetches single user", async () => {
    // create a test server to test against, using our production typeDefs,
    // resolvers, and dataSources.

    const { server } = constructTestServer();

//     // use the test server to create a query function
//     const { query } = createTestClient(server);

//     // run query against the server and snapshot the output
//     const res = await query({
//       query: GET_USER,
//       variables: { uid: "8b686839-4c94-48ac-ac51-86d36b7bf17c" },
//     });
//     expect(res).toMatchSnapshot();
//   });

  it("it signs up user", async () => {
    afterEach(async () => {
      return await cleanDb(); // with that we are cleaning the database after all the tests have been executed
    });

    // beforeEach(async () => {
    //   await pg("users").where({user_email: "kyle2021@webyte.org"}).delete();
    //   console.log("deleted");
    // })
    // create a test server to test against, using our production typeDefs,
    // resolvers, and dataSources.
    const { server } = constructTestServer();

//     // use the test server to create a query function
//     const { query } = createTestClient(server);

    // run query against the server and snapshot the output
    const res = await query({
      query: SIGN_UP,
      variables: {
        firstName: "Kyle",
        lastName: "Osunero",
        email: "kyle2021@webyte.org",
        password: "L3Tm31N",
        role: "PATIENT",
        sex: "MALE",
        birthdate: "1999-09-25"
      },
    });
    expect(res).toMatchSnapshot();
  });

  it("signs in the user", async () => {
    
    beforeEach( async () => {
      const seed = await pg.seed.run();
      console.log(seed);
      return seed;
    })

    const { server } = constructTestServer();

    const { query } = createTestClient(server);

    const res = await query({
      query: SIGN_IN,
      variables: {
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

    expect(res).toMatchSnapshot();
  })
});
