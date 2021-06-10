import { cleanDb, constructTestServer } from "../helpers/__utils.js";
import { createTestClient } from "apollo-server-testing";
import jwt from "jsonwebtoken";
import { SIGN_UP } from "./query.js";
import pg from "../../db/index.js";
describe("Sign Up", () => {
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

  const { server } = constructTestServer();
  const { query } = createTestClient(server);

  it("Has an invalid email and password", async () => {
    const variables = {
      email: "",
      password: "",
      firstName: "Kyle",
      middleName: null,
      lastName: "Osunero",
      role: "PATIENT",
      img: "image Path",
      sex: "MALE",
      birthdate: "2000-07-02",
    };

    const response = await query({
      mutation: SIGN_UP,
      variables,
    });

    await expect(response).toMatchSnapshot();
  });

  it("Has valid email but invalid password", async () => {
    const variables = {
      email: "wex@webyte.org",
      password: "asd",
      firstName: "wex",
      middleName: null,
      lastName: "dalisay",
      role: "DOCTOR",
      img: "image Path",
      sex: "FEMALE",
      birthdate: "2000-09-02",
      doctor: {
        licenceNum: "12345678",
        licenceImg: "img path",
        licenceExp: "2100-01-01",
        specialization: ["special powers", "healing powers"],
      },
    };

    const response = await query({
      mutation: SIGN_UP,
      variables,
    });

    await expect(response).toMatchSnapshot();
  });

  it("Trys to sign up with existing user", async () => {
    const variables = {
      email: "Billie97@yahoo.com",
      password: "L3tM3!N!!",
      firstName: "Kent",
      middleName: null,
      lastName: "Handumon",
      role: "PATIENT",
      img: "image Path",
      sex: "MALE",
      birthdate: "1999-03-02",
    };

    const response = await query({
      mutation: SIGN_UP,
      variables,
    });
    await expect(response).toMatchSnapshot();
  });

  it("Should sign up a Doctor", async () => {
    const variables = {
      email: "doc_kyle@webyte.org",
      password: "$3cR3tP4ss2",
      firstName: "Kyle",
      middleName: null,
      lastName: "Osunero",
      role: "DOCTOR",
      img: "image Path",
      sex: "MALE",
      birthdate: "2000-05-02",
      doctor: {
        licenceNum: "12345678",
        licenceImg: "img path",
        licenceExp: "2100-10-10",
        specialization: ["special powers", "healing powers"],
      },
    };

    const response = await query({
      mutation: SIGN_UP,
      variables,
    });

    const { email, firstName, lastName, role, sex, img, birthdate } =
      jwt.verify(response.data.signUp, process.env.JWT_SECRET_KEY);

    await expect({
      email,
      firstName,
      lastName,
      role,
      sex,
      img,
      birthdate,
    }).toMatchSnapshot();
  });

  it("Should sign up a Patient", async () => {
    const variables = {
      email: "patient_kyle@webyte.org",
      password: "$3cR3tP4ss2",
      firstName: "Kyle",
      middleName: null,
      lastName: "Osunero",
      role: "PATIENT",
      img: "image Path",
      sex: "MALE",
      birthdate: "2000-08-02",
    };

    const response = await query({
      mutation: SIGN_UP,
      variables,
    });

    console.log(response);

    const { email, firstName, lastName, role, sex, img, birthdate } =
      jwt.verify(response.data.signUp, process.env.JWT_SECRET_KEY);

    await expect({
      email,
      firstName,
      lastName,
      role,
      sex,
      img,
      birthdate,
    }).toMatchSnapshot();
  });
});
