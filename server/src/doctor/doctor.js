import objectFilter from "../helpers/objectFilter.js";
import { v4 as uuidV4 } from "uuid";
import user from "../user/user.js";
import pg from "../../db/index.js";
import __ from "lodash";

const doctor = (knex = pg) => ({
  fromDb: (doctorData) => ({
    uid: doctorData.doctor_uid,
    licenceNum: doctorData.doctor_licence_num,
    licenceImg: doctorData?.doctor_licence_img,
    licenceExp: doctorData.doctor_licence_exp,
    verificationStatus: doctorData.doctor_verification_status,
    experience: doctorData.doctor_experience,
    about: doctorData.doctor_about,
    educational: doctorData.doctor_educational,
    rating: doctorData.doctor_rating,
  }),
  toDb: (doctorData) => ({
    doctor_uid: doctorData.uid,
    doctor_licence_num: doctorData.licenceNum,
    doctor_licence_img: doctorData.licenceImg,
    doctor_licence_exp: doctorData.licenceExp,
    doctor_verification_status: doctorData.verificationStatus,
    doctor_experience: doctorData.experience,
    doctor_about: doctorData.about,
    doctor_educational: doctorData.educational,
    doctor_rating: doctorData.rating,
  }),
  create: async (doctorData) => {
    doctorData.uid = doctorData.uid || uuidV4();
    const dbResponse = await knex
      .insert(objectFilter(doctor().toDb(doctorData)))
      .into("doctors")
      .returning("*");
    return doctor().fromDb(__.first(dbResponse));
  },
  update: async (doctorData) => {
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
    return doctor().fromDb(__.first(dbResponse));
  },
  get: async (uid) => {
    const doctorSelectQuery = uid
      ? knex.select("*").from("doctors").where({ doctor_uid: uid })
      : knex.select("*").from("doctors");

    const dbResponse = await doctorSelectQuery.innerJoin(
      "users",
      "user_uid",
      "doctor_uid"
    );

    return dbResponse.map((data) => ({
      ...user().fromDb(data),
      ...doctor().fromDb(data),
    }));
  },
  remove: async (uid) => {
    const dbResponse = await knex("doctors").where({ doctor_uid: uid }).del();
    return doctor().fromDb(__.first(dbResponse));
  },
});

export default doctor;
