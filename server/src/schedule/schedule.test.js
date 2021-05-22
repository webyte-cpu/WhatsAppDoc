import {
  GET_SCHEDULE,
  UPSERT_SCHEDULE,
  CREATE_SCHEDULE,
  UPDATE_SCHEDULE,
  DELETE_SCHEDULE
} from './queries.js';
import { constructTestServer } from "../helpers/__utils.js";
import { createTestClient } from "apollo-server-testing";

describe("Queries and Mutations Testing", () => {

  const { server } = constructTestServer();

  const { query } = createTestClient(server);

  it("fetches a schedule", async () => {

    const res = await query({
      query: GET_SCHEDULE,
      variables: { uid: "d8b605d8-68c8-4f97-b80b-633ef167b801" }
    })

    expect(res).toMatchSnapshot();
  });

  it("upserts a schedule", async () => {

    const res = await query({
      query: UPSERT_SCHEDULE,
      variables: { data: [{
          uid: "8db4bd7b-9da8-4ffe-9ba3-11e79b5275db",
          doctorClinicUid: "0353121f-eeed-4687-8676-f788d3e9c8e6",
          startTime: "13:00:00",
          endTime: "14:00:00",
          daysOfTheWeek: [1, 4]
        }] 
      }
    })

    expect(res).toMatchSnapshot();
  });

  it("creates a schedule", async () => {

    const res = await query({
      query: CREATE_SCHEDULE,
      variables: { data: [
        {
          doctorClinicUid: "0353121f-eeed-4687-8676-f788d3e9c8e6",
          startTime: "18:00:00",
          endTime: "19:00:00",
          daysOfTheWeek: [1, 4]
        }
      ]}
    })

    expect(res).toMatchSnapshot();
  })

  it("updates a schedule", async () => {

    const res = await query({
      query: UPDATE_SCHEDULE,
      variables: {
        uid: "d8b605d8-68c8-4f97-b80b-633ef167b801",
        startTime: "10:00:00",
        endTime: "11:00:00",
        daysOfTheWeek: [1, 2, 3]
      }
    })

    expect(res).toMatchSnapshot();
  })

  it("deletes a schedule", async () => {

    const res = await query({
      query: DELETE_SCHEDULE,
      variables: { uid: "9733cbae-dc7d-451c-af9c-ed7618ca9029" }
    })

    expect(res).toMatchSnapshot();
  })
})

