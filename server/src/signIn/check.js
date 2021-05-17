import { ApolloError } from "apollo-server-errors";
import user from "../user/model.js";
import bcrypt from "bcrypt";
import __ from "lodash";

export default async ({ email, password }) => {
  const dbResponse = await user.find({ email });
  const userData = __.first(dbResponse);

  if (!__.isUndefined(userData)) {
    const match = await bcrypt.compare(password, userData?.password);
    delete userData.password;
    if (match) return userData;
  }

  throw new ApolloError("Invalid Email or Password.", "VALIDATION_ERROR");
};
