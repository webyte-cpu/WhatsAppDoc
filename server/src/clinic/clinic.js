import pg from "../../db/index.js";
import objectFilter from "../helpers/objectFilter.js";
import { v4 as uuidV4 } from "uuid";

const create = async ({
  userUid,
  licenceNo,
  experience,
  rating,
  isVerified,
  about,
  bio,
}) => {
  return await pg
    .insert({
      doctor_uid: uuidV4(),
      user_uid: userUid,
      doctor_licence_no: licenceNo,
      doctor_experience: experience,
      doctor_rating: rating,
      doctor_is_verified: isVerified,
      doctor_about: about,
      doctor_bio: bio,
    })
    .into("doctors");
};

const update = async ({
  uid,
  userUid,
  licenceNo,
  experience,
  rating,
  isVerified,
  about,
  bio,
}) => {
  return await pg("doctors")
    .where({ user_uid: userUid })
    .update(
      objectFilter({
        doctor_uid: uid,
        user_uid: userUid,
        doctor_licence_no: licenceNo,
        doctor_experience: experience,
        doctor_rating: rating,
        doctor_is_verified: isVerified,
        doctor_about: about,
        doctor_bio: bio,
      })
    );
};

const get = async (userUid) => {
  return await pg.select("*").from("doctors").where({ user_uid: userUid });
};

const getAll = async () => {
  return await pg.select("*").from("doctors");
};
const remove = async (userUid) => {
  return await pg("doctors").where({ user_uid: userUid }).del();
};

export default { create, update, get, remove, getAll };
