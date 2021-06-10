import {
  GET_SCHEDULE,
  UPSERT_SCHEDULE,
  CREATE_SCHEDULE,
  UPDATE_SCHEDULE,
  DELETE_SCHEDULE,
} from "./queries.js";
import { constructTestServer, cleanDb } from "../helpers/__utils.js";
import { createTestClient } from "apollo-server-testing";
import pg from "../../db/index.js";

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
      // await pg.destroy();
    } catch (error) {
      console.log(error);
    }
  });

  const { server } = constructTestServer({
    context: () => ({
      user: { uid: "0a1bcc04-a748-4669-a4c2-fced1bccc0b2", role: "DOCTOR" },
    }),
  });

  const { query } = createTestClient(server);

  it("fetches a schedule", async () => {
    const res = await query({
      query: GET_SCHEDULE,
      variables: { uid: "ec423f7d-8680-4289-820f-351dc1fe917a" },
    });

    expect(res).toMatchSnapshot();
  });

  it("upserts a schedule", async () => {
    const res = await query({
      mutation: UPSERT_SCHEDULE,
      variables: {
        doctorClinicUid: "5cb1a5aa-f8b3-424b-a3b1-7c527002b6d1",
        schedList: [
          {
            uid: "ec423f7d-8680-4289-820f-351dc1fe917a",
            startTime: "13:00:00",
            endTime: "14:00:00",
            daysOfTheWeek: [1, 4],
          },
          {
            startTime: "13:00:00",
            endTime: "14:00:00",
            daysOfTheWeek: [1, 4],
          },
        ],
      },
    });

    expect(res).toMatchSnapshot();
  });

  it("creates a schedule", async () => {
    const res = await query({
      mutation: CREATE_SCHEDULE,
      variables: {
        doctorClinicUid: "5cb1a5aa-f8b3-424b-a3b1-7c527002b6d1",
        schedList: {
          startTime: "18:00:00",
          endTime: "19:00:00",
          daysOfTheWeek: [1, 4],
        },
      },
    });

    expect(res).toMatchSnapshot();
  });

  it("updates a schedule", async () => {
    const res = await query({
      mutation: UPDATE_SCHEDULE,
      variables: {
        uid: "ec423f7d-8680-4289-820f-351dc1fe917a",
        startTime: "10:00:00",
        endTime: "11:00:00",
        daysOfTheWeek: [1, 2, 3],
      },
    });

    expect(res).toMatchSnapshot();
  });

  it("deletes a schedule", async () => {
    const res = await query({
      mutation: DELETE_SCHEDULE,
      variables: {
        uids: [
          "8fb58703-698a-4c49-bffc-5a0206cded42",
          "ec423f7d-8680-4289-820f-351dc1fe917a",
        ],
      },
    });

    expect(res).toMatchSnapshot();
  });
});
