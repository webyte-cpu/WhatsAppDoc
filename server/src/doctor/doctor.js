import pg from "../../db/index.js";
import objectFilter from "../helpers/objectFilter.js";
import objectKeysToCamelCase from "../helpers/objectKeyCase.js";

const create = async (arg) => {
  const dbReponse = await pg
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
    .returning("*")
    .first();

  return objectKeysToCamelCase(dbReponse, "doctor_");
};

const update = async (arg) => {
  const dbReponse = await pg("doctors")
    .where({ doctor_uid: arg.uid })
    .update(
      objectFilter({
        doctor_licence_num: arg.licenceNum,
        doctor_licence_img: arg.licenceImg,
        doctor_verification_status: arg.verificationStatus,
        doctor_experience: arg.experience,
        doctor_about: arg.about,
        doctor_educational: arg.educational,
        doctor_rating: arg.rating,
      })
    )
    .returning("*");
  return dbReponse.map((data) => objectKeysToCamelCase(data, "doctor_"))[0];
};

const get = async ({uid}) => {
  const dbReponse = uid
    ? await pg.select("*").from("doctors").where({ doctor_uid: uid })
    : await pg.select("*").from("doctors").join("users as u", "doctors.doctor_uid" , "=", "u.user_uid");

  const response = dbReponse.map((data) => objectKeysToCamelCase(data, "doctor_"));
  console.log(response)
  return response;
};

const remove = async (uid) => {
  const dbReponse = await pg("doctors").where({ doctor_uid: uid }).del();
  return dbReponse.map((data) => objectKeysToCamelCase(data, "doctor_"))[0];
};

export default { create, update, get, remove };
