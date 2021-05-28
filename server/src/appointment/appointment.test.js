import {
  GET_APPOINTMENT,
  CREATE_APPOINTMENT,
  UPDATE_APPOINTMENT,
  DELETE_APPOINTMENT
} from './queries.js';
import { constructTestServer } from '../helpers/__utils.js';
import { createTestClient } from 'apollo-server-testing';

describe("Queries and Mutations Testing", () => {
  
  const { server } = constructTestServer();
  
  const { query } = createTestClient(server);

  it("fetches an appointment", async () => {
 
    const res = await query({
      query: GET_APPOINTMENT,
      variables: {uid: "f621fddb-8b13-4c58-93d7-3159a99c06bc"}
    })

    expect(res).toMatchSnapshot();
  })

  it("create an appointment", async () => {
  
    const res = await query({
      query: CREATE_APPOINTMENT,
      variables: {
        patientUid: "d0a7af66-cf3e-46c5-8104-32ab0d4b6ba6",
        doctorClinicUid: "0353121f-eeed-4687-8676-f788d3e9c8e6",
        status: "PENDING",
        timestamp: "2021-05-26T16:00:00Z",
        doctorRemarks: "test remarks",
      }
    })
  
    expect(res).toMatchSnapshot();
  })

  it("updates an appointment", async () => {

    const res = await query({
      query: UPDATE_APPOINTMENT,
      variables: {
        patientUid: "7c03f38f-ab4f-4605-a274-706e4d8c8d6a",
        doctorClinicUid: "0afdaddf-536e-4b67-8617-52783e64f6b5",
        status: "ON_GOING",
        timestamp: "2021-05-26T16:00:00Z",
        doctorRemarks: "test test test",
      }
    })
  
    expect(res).toMatchSnapshot();
  })

  it("deletes an appointment", async () => {
  
    const res =  await query({
      query: DELETE_APPOINTMENT,
      variables: { uid: "1239e82b-b4ea-4e73-8861-df2ff69fac82"}
    })
  
    expect(res).toMatchSnapshot();
  })

});





