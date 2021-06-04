import objectFilter from "../helpers/objectFilter.js";
import { v4 as uuidV4 } from "uuid";
import pg from "../../db/index.js";
import __ from "lodash";
import findModel from "../helpers/find.js";

const fromDb = (doctorData) => ({
  uid: doctorData.doctor_uid,
  licenceNum: doctorData.doctor_licence_num,
  licenceImg: doctorData?.doctor_licence_img,
  licenceExp: doctorData.doctor_licence_exp,
  verificationStatus: doctorData.doctor_verification_status,
  experience: doctorData.doctor_experience,
  about: doctorData.doctor_about,
  educational: doctorData.doctor_educational,
  rating: doctorData.doctor_rating,
});

const toDb = (doctorData) => ({
  doctor_uid: doctorData.uid,
  doctor_licence_num: doctorData.licenceNum,
  doctor_licence_img: doctorData.licenceImg,
  doctor_licence_exp: doctorData.licenceExp,
  doctor_verification_status: doctorData.verificationStatus,
  doctor_experience: doctorData.experience,
  doctor_about: doctorData.about,
  doctor_educational: doctorData.educational,
  doctor_rating: doctorData.rating,
});

const create = async (doctorData, knex = pg) => {
  doctorData.uid = doctorData.uid || uuidV4();
  const dbResponse = await knex
    .insert(objectFilter(toDb(doctorData)))
    .into("doctors")
    .returning("*");
  return fromDb(__.first(dbResponse));
};
const update = async (uid, doctorData, knex = pg) => {
  const dbResponse = await knex("doctors")
    .where({ doctor_uid: doctorData.uid })
    .update(
      objectFilter({
        doctor_licence_num: doctorData.licenceNum,
        doctor_licence_img: doctorData.licenceImg,
        doctor_licence_exp: doctorData.licenceExp,
        doctor_verification_status: doctorData.verificationStatus,
        doctor_experience: doctorData.experience,
        doctor_about: doctorData.about,
        doctor_educational: doctorData.educational,
        doctor_rating: doctorData.rating,
      })
    )
    .returning("*");
  return fromDb(__.first(dbResponse));
};

const find = findModel("doctors", (data) => ({
  ...fromDb(data),
    uid: data.user_uid,
    firstName: data.user_first_name,
    middleName: data.user_middle_name,
    lastName: data.user_last_name,
    email: data.user_email,
    password: data.user_password,
    birthdate: data.user_birthdate,
    sex: data.user_sex,
    role: data.user_role,
    img: data.user_img
}), toDb, pg, (knex) => {
  
  return knex.innerJoin("users", "user_uid", "doctor_uid")
}

);


const get = async (uid, knex = pg) => {
  const dbResponse = await knex
    .select("*")
    .from("doctors")
    .where(objectFilter({ doctor_uid: uid }))
    .innerJoin("users", "user_uid", "doctor_uid");

  return dbResponse.map((data) => ({
    ...{
      uid: data.user_uid,
      firstName: data.user_first_name,
      middleName: data.user_middle_name,
      lastName: data.user_last_name,
      email: data.user_email,
      password: data.user_password,
      birthdate: data.user_birthdate,
      sex: data.user_sex,
      addressUid: data.address_uid,
      role: data.user_role,
      img: data.user_img,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    },
    ...fromDb(data),
  }));
};
const remove = async (uid, knex = pg) => {
  const dbResponse = await knex("doctors")
    .where({ doctor_uid: uid })
    .del()
    .returning("*");
  return fromDb(__.first(dbResponse));
};

export default { create, update, get, remove, find };
