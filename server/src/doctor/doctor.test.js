import { cleanDb, constructTestServer } from "../helpers/__utils.js";
import { createTestClient } from "apollo-server-testing";
import {} from "./queries.js";

describe("Sign In", () => {
  beforeAll(() => {});

  afterAll(() => {
    cleanDb();
  });

  it("Has an invalid email and password", async () => {
    const { server } = constructTestServer();
    const { query } = createTestClient(server);

    const variables = {  };

    const response = await query({
      mutation: SIGN_IN,
      variables,
    });

    await expect(response).toMatchSnapshot();
  });

  it("Has valid email but wrong password", async () => {
    const { server } = constructTestServer();
    const { query } = createTestClient(server);

    const variables = { email: "George@webyte.org", password: "asd" };

    const response = await query({
      mutation: SIGN_IN,
      variables,
    });

    await expect(response).toMatchSnapshot();
  });

  it("Trys to login a non-existing user", async () => {
    const { server } = constructTestServer();
    const { query } = createTestClient(server);

    const variables = { email: "George@webyte.org", password: "L3tM3!N" };

    const response = await query({
      mutation: SIGN_IN,
      variables,
    });

    await expect(response).toMatchSnapshot();
  });

  it("Should login", async () => {
    const { server } = constructTestServer();
    const { query } = createTestClient(server);

    const variables = { email: "George@webyte.org", password: "L3tM3!N" };

    const response = await query({
      mutation: SIGN_IN,
      variables,
    });

    await expect(response).toMatchSnapshot();
  });
});
