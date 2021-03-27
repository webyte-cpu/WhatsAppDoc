import pg from "../../db/index.js";
import objectFilter from "../helpers/objectFilter.js";
import { v4 as uuidV4 } from "uuid";

const create = async ({ userUid, status }) => {
  return await pg
    .insert({
      patient_uid: uuidV4,
      user_uid: userUid,
      patient_status: status,
    })
    .into("patients");
};

const update = async ({ uid }) => {
  return await pg("patients")
    .where({ patient_uid: uid })
    .update(objectFilter({ patient_uid: uid, user_uid, patient_status }))
    .returning("*");
};

const get = async (userUid) => {
  if (userUid) {
    return await pg.select("*").from("patients").where({ user_uid: userUid });
  }
  return await pg.select("*").from("patients");
};

const remove = async (user_uid) => {
  return await pg("patients").where({ user_uid }).del().returning("*");
};


export default { create, update, get, remove };
