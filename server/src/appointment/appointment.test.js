import { constructTestServer, cleanDb } from "../helpers/__utils.js";
import { createTestClient } from "apollo-server-testing";
import { PubSub } from "graphql-subscriptions";
import pg from "../../db/index.js";
import {
  GET_APPOINTMENT,
  GET_ALL_APPOINTMENT,
  CREATE_APPOINTMENT,
  UPDATE_APPOINTMENT,
} from "./queries.js";

const pubsub = new PubSub();
describe("Queries and Mutations Testing", () => {
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

  const { server } = constructTestServer({
    context: () => ({
      user: { uid: "7fc392c3-cd94-40ec-bd53-81de4aa8f8cf", role: "PATIENT" },
      pubsub,
    }),
  });

  const { query } = createTestClient(server);

  it("fetches an appointment", async () => {
    const res = await query({
      query: GET_APPOINTMENT,
      variables: { uid: "f621fddb-8b13-4c58-93d7-3159a99c06bc" },
    });

    await expect(res).toMatchSnapshot();
  });

  it("fetches all appointments", async () => {
    const res = await query({
      query: GET_ALL_APPOINTMENT,
    });

    await expect(res).toMatchSnapshot();
  });

  it("create an appointment", async () => {
    const res = await query({
      query: CREATE_APPOINTMENT,
      variables: {
        doctorClinicUid: "6ecaae63-1196-4e48-818d-0266dbed39e2",
        dateTime: "2021-05-30T15:00:00Z",
      },
    });

    await expect(res).toMatchSnapshot();
  });

  it("updates an appointment", async () => {
    const res = await query({
      query: UPDATE_APPOINTMENT,
      variables: {
        uid: "f621fddb-8b13-4c58-93d7-3159a99c06bc",
        status: "ON_GOING",
        dateTime: "2021-05-26T16:00:00Z",
        doctorRemarks: "test test test",
      },
    });

    await expect(res).toMatchSnapshot();
  });
});
