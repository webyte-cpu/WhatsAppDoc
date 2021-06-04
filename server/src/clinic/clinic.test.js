import { createTestClient } from "apollo-server-testing";
import { constructTestServer, cleanDb } from "../helpers/__utils.js";
import pg from "../../db/index.js";
import {
  GET_CLINIC,
  CREATE_CLINIC,
  UPDATE_CLINIC,
  DELETE_CLINIC,
  UPSERT_CLINIC
} from "./queries.js";

describe("Queries", () => {
  // beforeAll(async () => {
  //   try {
  //     await cleanDb();
  //     await pg.seed.run();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // });

  // afterAll(async () => {
  //   try {
  //     await cleanDb();
  //     await pg.destroy();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // });

  const context = () => ({
    user: { uid: "0353121f-eeed-4687-8676-f788d3e9c8e6"},
  });

  const { server } = constructTestServer({ context });
  const { query } = createTestClient(server);

  it("creates a clinic", async () => {
    const res = await query({
      query: CREATE_CLINIC,
      variables: {
        name: "Clinic number 4",
        roomNumber: "4",
        address: {
          address: "test address",
          city: "test city",
          province: "test province",
          zipCode: "test zipCode",
          country: "test country",
        },
        minimumSchedulingNoticeMins: 5,
        slotDurationInMins: 3,
        consultationFee: 500,
      },
    });

    await expect(res).toMatchSnapshot();
  }, 10000);

  it("fetches created clinic", async () => {
    const res = await query({
      query: GET_CLINIC,
      variables: {
        doctorUid: "0353121f-eeed-4687-8676-f788d3e9c8e6",
      },
    });

    await expect(res).toMatchSnapshot();
  }, 10000);

  it("fetches existing clinic", async () => {
    const res = await query({
      query: GET_CLINIC,
      variables: {
        uid: "027ae0ac-05d6-43bf-818e-a76607b7f976",
      },
    });

    await expect(res).toMatchSnapshot();
  }, 10000);

  it("updates a clinic", async () => {
    const res = await query({
      query: UPDATE_CLINIC,
      variables: {
        uid: "027ae0ac-05d6-43bf-818e-a76607b7f976",
        name: "Clinic number 5",
        roomNumber: "9",
      },
    });

    await expect(res).toMatchSnapshot();
  }, 10000);

  it("upserts a clinic", async () => {
    const res = await query({
      query: UPSERT_CLINIC,
      variables: {
        uid: "c41e1e2f-f788-44b7-bb0b-a9fa746ece0e",
        name: "Clinic number 4",
        roomNumber: "5",
        address: {
          address: "test2 address2",
          city: "test2 city2",
          province: "test2 province2",
          zipCode: "test2 zipCode2",
          country: "test2 country2",
        },
        minimumSchedulingNoticeMins: 10,
        slotDurationInMins: 10,
        consultationFee: 5000
      }
    })
    await expect(res).toMatchSnapshot();
  }, 1000);

  it("deletes a clinic", async () => {
    const res = await query({
      query: DELETE_CLINIC,
      variables: { uid: "6eca6134-f369-4278-86d5-1b3a10fea42e" },
    });
    await expect(res).toMatchSnapshot();
  }, 10000);
});
