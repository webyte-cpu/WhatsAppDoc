import __ from "lodash";
import enums from "../helpers/enums/enums.js";
import jwt from "jsonwebtoken";
import user from "./user.js";

const resolverMap = {
  User: {
    __resolveType(obj) {
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
    getUser: (obj, arg) => user.get(arg.uid),
    getAllUser: () => user.get(),
    viewer: (parent, arg, context) => {
      if (__.isEmpty(context.user)) {
        return null;
      }
      const { uid } = context.user;
      return user.get(uid);
    },
  },

  Mutation: {
    signUp: async (obj, arg, context) => {
      const userResponse = await user.signUp(arg);
      return userResponse.uid;
    },
    signIn: async (obj, { email, password }) => {
      const payload = await user.check({ email, password });
      return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        algorithm: "HS256",
        subject: payload.uid,
        expiresIn: "1d",
      });
    },
    updateUser:()=>{

    }
  },
};

export default resolverMap;
