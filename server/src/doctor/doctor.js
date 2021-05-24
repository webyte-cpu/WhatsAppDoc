import pg from "../../db/index.js";
import objectFilter from "../helpers/objectFilter.js";
import { v4 as uuidV4 } from "uuid";

const create = async (arg) => {
  return await pg
    .insert(
      objectFilter({
        doctor_uid: uuidV4(),
        user_uid: userUid,
        doctor_licence_no: arg.licenceNo,
        doctor_experience: arg.experience,
        doctor_rating: arg.rating,
        doctor_is_verified: arg.isVerified,
        doctor_about: arg.about,
        doctor_bio: arg.bio,
      })
    )
    .into("doctors")
    .returning("*");
};

const update = async (arg) => {
  return await pg("doctors")
    .where({ user_uid: arg.userUid })
    .update(
      objectFilter({
        doctor_uid: arg.uid,
        user_uid: arg.userUid,
        doctor_licence_no: arg.licenceNo,
        doctor_experience: arg.experience,
        doctor_rating: arg.rating,
        doctor_is_verified: arg.isVerified,
        doctor_about: arg.about,
        doctor_bio: arg.bio,
      })
    );
};

const get = async (userUid) => {
  return userUid
    ? await pg.select("*").from("doctors").where({ user_uid: userUid })
    : pg.select("*").from("doctors");
};
const remove = async (userUid) => {
  return await pg("doctors").where({ user_uid: userUid }).del();
};

export default { create, update, get, remove };
