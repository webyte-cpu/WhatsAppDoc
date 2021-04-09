import pg from "../../db/index.js";
import objectFilter from "../helpers/objectFilter.js";

const create = async (arg) => {
  return await pg
    .insert(
      objectFilter({
        doctor_uid: uid,
        doctor_licence_num: arg.licenceNum,
        doctor_licence_img: arg.licenceImg,
        doctor_verification_status: arg.verificationStatus,
        doctor_experience: arg.experience,
        doctor_about: arg.about,
        doctor_educational: arg.educational,
        doctor_rating: arg.rating,
      })
    )
    .into("doctors")
    .returning("*");
};

const update = async (arg) => {
  return await pg("doctors")
    .where({ doctor_uid: arg.uid })
    .update(
      objectFilter({
        doctor_uid: uid,
        doctor_licence_num: arg.licenceNum,
        doctor_licence_img: arg.licenceImg,
        doctor_verification_status: arg.verificationStatus,
        doctor_experience: arg.experience,
        doctor_about: arg.about,
        doctor_educational: arg.educational,
        doctor_rating: arg.rating,
      })
    );
};

const get = async (uid) => {
  return uid
    ? await pg.select("*").from("doctors").where({ doctor_uid: uid })
    : await pg.select("*").from("doctors");
};
const remove = async (uid) => {
  return await pg("doctors").where({ doctor_uid: uid }).del();
};

export default { create, update, get, remove };
