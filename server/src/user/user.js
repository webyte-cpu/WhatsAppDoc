import pg from "../../db/index.js";
import objectFilter from "../helpers/objectFilter.js";
import { v4 as uuidV4 } from "uuid";

const user = {
  create: async ({
    addressUid,
    firtName,
    lastName,
    email,
    password,
    sex,
    birthdate,
    phoneNumber,
    weight,
    height,
    civilStatus,
    nationality,
    isDoctor,
  }) => {
    return await pg
      .insert({
        user_uid: uuidV4(),
        address_uid: addressUid,
        user_first_name: firtName,
        user_last_name: lastName,
        user_email: email,
        user_password: password,
        user_sex: sex,
        user_birthdate: birthdate,
        user_phone_number: phoneNumber,
        user_weight: weight,
        user_height: height,
        user_civil_status: civilStatus,
        user_nationality: nationality,
        user_is_doctor: isDoctor,
      })
      .into("users")
      .returning("*");
  },

  update: async ({
    uid,
    addressUid,
    firtName,
    lastName,
    email,
    password,
    sex,
    birthdate,
    phoneNumber,
    weight,
    height,
    civilStatus,
    nationality,
    isDoctor,
  }) => {
    return await pg("users")
      .where({ user_uid: uid })
      .update(
        objectFilter({
          user_uid: uuidV4(),
          address_uid: addressUid,
          user_first_name: firtName,
          user_last_name: lastName,
          user_email: email,
          user_password: password,
          user_sex: sex,
          user_birthdate: birthdate,
          user_phone_number: phoneNumber,
          user_weight: weight,
          user_height: height,
          user_civil_status: civilStatus,
          user_nationality: nationality,
          user_is_doctor: isDoctor,
        })
      );
  },

  get: async (uid) => {
    return await pg.select("*").from("users").where({ user_uid: uid });
  },

  delete: (uid) => {
    return pg("users").where({ user_uid: uid }).del();
  },
};

export default user;
