import objectKeysToCamelCase from "../helpers/objectKeyCase.js";
import objectFilter from "../helpers/objectFilter.js";
import __ from "lodash";
import { v4 as uuidV4 } from "uuid";
import pg from "../../db/index.js";
import bcrypt from "bcrypt";
import { ApolloError } from "apollo-server-errors";

const user = {
  signUp: async (arg) => {
    return pg.transaction(async (knex) => {
      const saltRounds = 10;
      const hashedPassword = bcrypt.hashSync(arg.password, saltRounds);

      const dbResponse = await knex
        .insert(
          objectFilter({
            user_uid: uuidV4(),
            user_first_name: arg.firstName,
            user_last_name: arg.lastName,
            user_email: arg.email,
            user_password: hashedPassword,
            user_role: arg.role,
            user_img: arg.img,
            created_at: new Date(Date.now()),
          })
        )
        .into("users")
        .returning("*");

      return objectKeysToCamelCase(__.first(dbResponse), "user_");
    });
  },

  update: async (arg) => {
    const dbResponse = await pg("users")
      .where({ user_uid: arg.uid })
      .update(
        objectFilter({
          user_first_name: arg.firstName,
          user_last_name: arg.lastName,
          user_email: arg.email,
          user_password: arg.password,
          user_role: arg.role,
          updated_at: new Date(Date.now()),
        })
      )
      .returning("*");

    return objectKeysToCamelCase(__.first(dbResponse), "user_");
  },
  check: async ({ email, password }) => {
    const dbResponse = await pg
      .select("*")
      .from("users")
      .where(
        objectFilter({
          user_email: email,
        })
      );

    const { user_password: passwordHash } = __.first(dbResponse);

    const match = await bcrypt.compare(password, passwordHash);

    if (match) {
      return objectKeysToCamelCase(__.first(dbResponse), "user_");
    }

    throw new ValidationError("Invalid password!");
  },

  get: async (uid) => {
    if (!__.isUndefined(uid)) {
      const dbResponse = await pg
        .select("*")
        .from("users")
        .where(
          objectFilter({
            user_uid: uid,
          })
        )
        .first();

      if (__.isEmpty(dbResponse)) {
        throw new ApolloError("User does not exist!", "NO_DATA");
      }
      return objectKeysToCamelCase(dbResponse, "user_");
    }
    const dbResponse = await pg.select("*").from("users");

    return dbResponse.map((data) => objectKeysToCamelCase(data, "user_"));
  },

  delete: (uid) => {
    const dbResponse = pg("users")
      .where({ user_uid: uid })
      .del()
      .returning("*");
    return objectKeysToCamelCase(__.first(dbResponse), "user_");
  },
};

export default user;
