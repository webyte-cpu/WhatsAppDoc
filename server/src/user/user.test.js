import { createTestClient } from "apollo-server-testing";
import { constructTestServer } from "../helpers/__utils.js";
import { gql } from "apollo-server-express";

describe("Quieries", () => {
  it("fetches single user", async () => {
    const GET_USER = gql`
      query {
        getUser(uid: "8bb11d0d-21eb-41f6-b476-aa28f9ee6db9") {
          firstName
          lastName
          uid
          role
          updatedAt
        }
      }
    `;

    const mocks = {
      Query: () => ({
        getUser: () => {
          return null;
          return {
            uid: "8bb11d0d-21eb-41f6-b476-aa28f9ee6db9",
            firstName: "hello",
            role: "ADMIN",
            lastName: "world",
          };
        },
      }),
    };

    // create a test server to test against, using our production typeDefs,
    // resolvers, and dataSources.
    const { server } = constructTestServer({ mocks });

    // use the test server to create a query function
    const { query } = createTestClient(server);

    // run query against the server and snapshot the output
    const res = await query({ query: GET_USER });

    console.log(res);
    expect(res).toMatchSnapshot();
  });
});
