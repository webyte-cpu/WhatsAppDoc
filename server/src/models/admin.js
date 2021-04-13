import pg from "../../db/index.js";
import objectFilter from "../helpers/objectFilter.js";
import { v4 as uuidV4 } from "uuid";

const admin = {
  create: async (firstName, lastName, email, password) =>
    await pg
      .insert({
        admin_uid: uuidV4(),
        admin_first_name: firstName,
        admin_last_name: lastName,
        admin_email: email,
        admin_password: password,
      })
      .into("admins"),

  update: async (uid) =>
    await pg("admins")
      .where({ admin_uid: uid })
      .update(
        objectFilter({
          admin_uid,
          admin_first_name,
          admin_last_name,
          admin_email,
          admin_password,
        })
      )
      .returning("*"),

  get: async (uid) =>
    await pg.select("*").from("admins").where({ admin_uid: uid }),

  delete: async (uid) => {
    await pg("admins").where({ admin_uid: uid }).del();
  },
};

export default admin;
