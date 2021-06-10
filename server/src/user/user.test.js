import { GET_USER, UPDATE_USER } from "./queries.js";
import { cleanDb, constructTestServer } from "../helpers/__utils.js";
import { createTestClient } from "apollo-server-testing";
import pg from "../../db/index.js";

describe("Queries", () => {
  beforeAll(async () => {
    try {
      await pg.initialize();
      await cleanDb();
      await pg.seed.run();
    } catch (error) {
      console.log(error);
    }
  }, 60000);

  afterAll(async () => {
    try {
      await cleanDb();
      await pg.destroy();
    } catch (error) {
      console.log(error);
    }
  });

  const { server } = constructTestServer({
    context: () => ({
      user: {
        uid: "3a238cae-f2af-4d4b-bb34-252215b5272e",
        user_role: "DOCTOR",
      },
    }),
  });

  const { query } = createTestClient(server);

  it("fetches the logined user", async () => {
    const res = await query({
      query: GET_USER,
    });
    expect(res).toMatchSnapshot();
  });

  it("updates the login user", async () => {
    const res = await query({
      query: UPDATE_USER,
      variables: {
        firstName: "Kent",
        middleName: "Canamo",
        lastName: "Handumon",
        password: "password",
      },
    });

    expect(res).toMatchSnapshot();
  });
});
