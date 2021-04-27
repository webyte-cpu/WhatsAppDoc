import { createTestClient } from "apollo-server-testing";
import { cleanDb, constructTestServer } from "../helpers/__utils.js";
import { VERIFY_DOCTORS } from "./queries.js";

describe("Mutations", () => {
  it("verify doctors", async () => {

    const { server } = constructTestServer();
    
    const { query } = createTestClient(server);

    const res = await query({
      query: VERIFY_DOCTORS,
      variables: {
        uid:"123e4567-e89b-12d3-a456-426614174000", 
        verificationStatus:VERIFIED
      }
    });

    expect(res).toMatchSnapshot();
  })
})

