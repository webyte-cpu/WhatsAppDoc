import user from "./user.js";
import { AuthenticationError } from "apollo-server-errors";
import enums from "../helpers/enums/enums.js";
import jwt from "jsonwebtoken";
import user from "./user.js";
import bcrypt from "bcrypt";

const resolverMap = {
  User: {
    __resolveType(obj, context, info) {
      console.log(obj.role);
      switch (obj.role) {
        case enums.role.ADMIN:
          return "Admin";
        case enums.role.DOCTOR:
          return "Doctor";
        case enums.role.PATIENT:
          return "Patient";
        default:
          return null;
      }
    },
  },

  Query: {
    getUser: async (obj, arg) => {
      const data = await user.get(arg);
      return data[0];
    },
    getAllUser: (obj, arg) => {
      return user.get({});
    },
    viewer: async (parent, arg, context) => {
      const { uid } = context.user;
      const dataResponse = await user.get({ uid });
      return dataResponse[0];
    },
  },

  Mutation: {
    signUp: async (obj, arg) => {
      const signUpResponse = user.signUp(arg);
      console.log(await signUpResponse);
      return signUpResponse;
    },

    login: async (obj, { email, password }) => {
      const dataResponse = await user.get({ email });

      if (!dataResponse[0]) {
        throw new AuthenticationError("User does not exist");
      }

      console.log(email, password);
      const { uid, role, password: passwordHash } = dataResponse[0];

      const match = await bcrypt.compare(password, passwordHash);

      if (!match) {
        throw new AuthenticationError("password is incorrect!");
      }

      return jwt.sign({ uid, role }, "supersecret", {
        algorithm: "HS256",
        subject: uid,
        expiresIn: "1d",
      });
    },
  },
};

export default resolverMap;
