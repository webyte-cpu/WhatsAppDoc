import { createTestClient } from "apollo-server-testing";
import { constructTestServer } from "../helpers/__utils.js";
import { GET_CLINIC, CREATE_CLINIC, UPDATE_CLINIC, DELETE_CLINIC } from "./queries.js";

describe("Queries", () => {

  it("fetches single clinic", async () => {

    const { server } = constructTestServer;

    const { query } = createTestClient(server);

    const res = await query({
      query: GET_CLINIC,
      variables: {
        uid: "027ae0ac-05d6-43bf-818e-a76607b7f976",
        doctorUid: "0afdaddf-536e-4b67-8617-52783e64f6b5"
      }
    })

    expect(res).toMatchSnapshot();
  })

  it("creates a clinic", async () => {

    const res = await query({
      query: CREATE_CLINIC,
      variables: {
        doctorUid: "4007903d-918e-4613-9e61-14958511576e",
        name: "Clinic number 4",
        roomNumber: "4",
        address: "Iloilo City",
        minimumSchedulingNoticeMins: 5,
        slotDurationInMins: 3,
        consultationFee: 500
      }
    })

    expect(res).toMatchSnapshot();
  })

  it("updates a clinic", async () => {

    const res = await query({
      query: UPDATE_CLINIC,
      variables: {
        uid: "027ae0ac-05d6-43bf-818e-a76607b7f976",
        name: "Clinic number 5",
        roomNumber: "9"
      }
    })

    expect(res).toMatchSnapshot();
  })

  it("deletes a clinic", async () => {

    const res = await query({
      query: DELETE_CLINIC,
      variables: { uid: "f9609c66-d0a1-48c6-b8bd-3a1a975986d4" }
    })

    expect(res).toMatchSnapshot();
  })
})