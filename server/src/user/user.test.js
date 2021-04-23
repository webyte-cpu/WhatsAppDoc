import { createTestClient } from "apollo-server-testing";
import { cleanDb, constructTestServer } from "../helpers/__utils.js";
import { GET_USER, SIGN_UP } from "./queries.js";

describe("Queries", () => {
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
