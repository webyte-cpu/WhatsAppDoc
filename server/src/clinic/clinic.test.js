import { createTestClient } from "apollo-server-testing";
import { constructTestServer } from "../helpers/__utils.js";
import { GET_CLINIC, CREATE_CLINIC , UPDATE_CLINIC, DELETE_CLINIC } from "./queries.js";
import pg from '../../db/index.js';

describe("Queries", () => {
  it("fetches single clinic", async () => {

    const { server } = constructTestServer;

    const { query } = createTestClient(server);

    const res = await query({
      query: GET_USER,
      variables: { uid: ""}
    })
  })
})