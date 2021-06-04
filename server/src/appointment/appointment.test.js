import { constructTestServer, cleanDb } from '../helpers/__utils.js';
import { createTestClient } from 'apollo-server-testing';
import pg from "../../db/index.js";
import {
  GET_APPOINTMENT,
  GET_ALL_APPOINTMENT,
  CREATE_APPOINTMENT,
  UPDATE_APPOINTMENT
} from './queries.js';

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

  it("fetches an appointment", async () => {

    const { server } = constructTestServer();
  
    const { query } = createTestClient(server);
 
    const res = await query({
      query: GET_APPOINTMENT,
      variables: {uid: "f621fddb-8b13-4c58-93d7-3159a99c06bc"}
    })

    expect(res).toMatchSnapshot();
  })

  it("fetches all appointments", async () => {

    const { server } = constructTestServer();
  
    const { query } = createTestClient(server);
    
    const res = await query({
      query: GET_ALL_APPOINTMENT
    })

    expect(res).toMatchSnapshot();
  })

  it("create an appointment", async () => {

    const context = () => ({
      user: { uid: "7c03f38f-ab4f-4605-a274-706e4d8c8d6a", role: "PATIENT" },
    });

    const { server } = constructTestServer({ context });
  
    const { query } = createTestClient(server);
  
    const res = await query({
      query: CREATE_APPOINTMENT,
      variables: {
        doctorClinicUid: "0353121f-eeed-4687-8676-f788d3e9c8e6",
        dateTime: "2021-05-30T15:00:00Z"
      }
    })
  
    expect(res).toMatchSnapshot();
  })

  it("updates an appointment", async () => {

    const { server } = constructTestServer();
  
    const { query } = createTestClient(server);

    const res = await query({
      query: UPDATE_APPOINTMENT,
      variables: {
        uid: "f621fddb-8b13-4c58-93d7-3159a99c06bc",
        status: "ON_GOING",
        dateTime: "2021-05-26T16:00:00Z",
        doctorRemarks: "test test test"
      }
    })
  
    expect(res).toMatchSnapshot();
  })

});





