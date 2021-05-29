import { cleanDb, constructTestServer } from "../helpers/__utils.js";
import { createTestClient } from "apollo-server-testing";
import jwt from "jsonwebtoken";
import { SIGN_IN } from "./query.js";
import pg from "../../db/index.js";
describe("Sign In", () => {
  beforeAll(async () => {
    try {
      await cleanDb();
      await pg.seed.run();
    } catch (error) {
      console.log(error);
    }
  });

  afterAll(async () => {
    try {
      await cleanDb();
      await pg.destroy();
    } catch (error) {
      console.log(error);
    }
  });

  const { server } = constructTestServer();
  const { query } = createTestClient(server);

  it("Has an invalid email and password", async () => {
    const variables = { email: "", password: "" };

    const response = await query({
      mutation: SIGN_IN,
      variables,
    });

    await expect(response).toMatchSnapshot();
  });

  it("Has valid email but wrong password", async () => {
    const variables = { email: "kent@webyte.org", password: "asd" };

    const response = await query({
      mutation: SIGN_IN,
      variables,
    });

    await expect(response).toMatchSnapshot();
  });

  it("Trys to login a non-existing user", async () => {
    const variables = { email: "George@webyte.org", password: "L3tM3!N" };

    const response = await query({
      mutation: SIGN_IN,
      variables,
    });

    await expect(response).toMatchSnapshot();
  });

  it("Should login", async () => {
    const variables = { email: "kent@webyte.org", password: "$3cR3tP4ss2" };

    const response = await query({
      mutation: SIGN_IN,
      variables,
    });

    const { email, firstName, lastName, role, uid, verificationStatus } =
      jwt.verify(response.data.signIn, process.env.JWT_SECRET_KEY);

    await expect({
      email,
      firstName,
      lastName,
      role,
      uid,
      verificationStatus,
    }).toMatchSnapshot();
  });
});
