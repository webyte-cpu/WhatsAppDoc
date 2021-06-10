import { createTestClient } from "apollo-server-testing";
import { constructTestServer, cleanDb } from "../helpers/__utils.js";
import pg from "../../db/index.js";
import {
  GET_CLINIC,
  CREATE_CLINIC,
  UPDATE_CLINIC,
  DELETE_CLINIC,
  UPSERT_CLINIC,
} from "./queries.js";

describe("Queries", () => {
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

  const context = () => ({
    user: { uid: "0e890190-1559-4edd-a0f5-3c61073fe576", role: "DOCTOR" },
  });

  const { server } = constructTestServer({ context });
  const { query } = createTestClient(server);

  it("creates a clinic", async () => {
    const res = await query({
      query: CREATE_CLINIC,
      variables: {
        name: "Test Clinic hehe",
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
        uid: "f9609c66-d0a1-48c6-b8bd-3a1a975986d4",
      },
    });

    await expect(res).toMatchSnapshot();
  }, 10000);

  it("updates a clinic", async () => {
    const res = await query({
      query: UPDATE_CLINIC,
      variables: {
        uid: "9a7c8d91-f9d8-4274-a8b9-f2e56ce591f7",
        name: "WeByte Clinic!!",
        roomNumber: "9",
      },
    });

    await expect(res).toMatchSnapshot();
  }, 10000);

  it("upserts a clinic", async () => {
    const res = await query({
      query: UPSERT_CLINIC,
      variables: {
        uid: "c27efa99-f36d-4c6f-a329-d8b4812eebf5",
        doctorClinicUid: "7170c9e9-0296-400c-9d15-122c01992c8c",
        name: "Clinic number 117",
        roomNumber: "5",
        address: {
          uid: "9d204c76-6a1e-4527-adc7-dfe5f064ecd0",
          address: "PARC REGENCY",
          city: "PAVIA",
          province: "ILOILO",
          zipCode: "5001",
          country: "PHILIPPINES",
          coordinates: "15.032, 112.096",
        },
        minimumSchedulingNoticeMins: 10,
        slotDurationInMins: 10,
        consultationFee: 5000,
      },
    });
    await expect(res).toMatchSnapshot();
  }, 1000);

  it("deletes a clinic", async () => {
    const res = await query({
      query: DELETE_CLINIC,
      variables: { uid: "52066acc-6225-4723-9b2d-6b52e3877a24" },
    });
    await expect(res).toMatchSnapshot();
  }, 10000);
});
