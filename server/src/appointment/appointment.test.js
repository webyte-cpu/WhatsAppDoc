import {
  GET_APPOINTMENT,
  CREATE_APPOINTMENT,
  UPDATE_APPOINTMENT,
  DELETE_APPOINTMENT
} from './queries.js';
import { constructTestServer } from '../helpers/__utils.js';
import { createTestClient } from 'apollo-server-testing';
import { query } from 'express';

describe("Queries and Mutations Testing", () => {
  
  const { server } = constructTestServer();
  
  const { query } = createTestClient(server);

  it("fetches an appointment", async () => {
 
    const res = await query({
      query: GET_APPOINTMENT,
      variables: {uid: }
    })
  })

  expect(res).toMatchSnapshot();
});

it("create an appointment", async () => {
  
  const res = await query({
    query: CREATE_APPOINTMENT,
    variables: {
      patientUid: ,
      doctorClinicUid: ,
      status: ,
      timestamp: ,
      doctorRemarks: ,
    }
  })

  expect(res).toMatchSnapshot();
})

it("updates an appointment", async () => {

  const res = await query({
    query: UPDATE_APPOINTMENT,
    variables: {
      patientUid: ,
      doctorClinicUid: ,
      status: ,
      timestamp: ,
      doctorRemarks: ,
    }
  })

  expect(res).toMatchSnapshot();
})

it("deletes a schedule", async () => {
  
  const res =  await query({
    query: DELETE_APPOINTMENT,
    variables: { uid: }
  })

  expect(res).toMatchSnapshot();
})

