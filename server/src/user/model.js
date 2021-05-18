import objectFilter from "../helpers/objectFilter.js";
import { v4 as uuidV4 } from "uuid";
import pg from "../../db/index.js";
import __ from "lodash";

const fromDb = (userData) => ({
  uid: userData.user_uid,
  firstName: userData.user_first_name,
  middleName: userData.user_middle_name,
  lastName: userData.user_last_name,
  email: userData.user_email,
  password: userData.user_password,
  birthdate: userData.user_birthdate,
  sex: userData.user_sex,
  address: userData.address,
  role: userData.user_role,
  img: userData.user_img,
  createdAt: userData.created_at,
  updatedAt: userData.updated_at,
});

const toDb = (userData) => ({
  user_uid: userData.uid,
  user_first_name: userData.firstName,
  user_middle_name: userData.middleName,
  user_last_name: userData.lastName,
  user_email: userData.email,
  user_password: userData.password,
  user_birthdate: userData.birthdate,
  user_sex: userData.sex,
  address_uid: userData.address?.uid,
  user_role: userData.role,
  user_img: userData.img,
  created_at: userData.createdAt,
  updated_at: userData.updatedAt,
});

const find = async (object, knex = pg) =>
  knex.transaction(async (trx) => {
    const dbResponse = await trx
      .select("*")
      .from("users")
      .where(objectFilter(toDb(object)))
      .leftJoin("doctors", "doctor_uid", "user_uid")
      .leftJoin("patients", "patient_uid", "user_uid");

    const data = dbResponse.map((data) => ({
      ...fromDb(data),
      ...{
        uid: data.doctor_uid,
        licenceNum: data.doctor_licence_num,
        licenceImg: data?.doctor_licence_img,
        licenceExp: data.doctor_licence_exp,
        verificationStatus: data.doctor_verification_status,
        experience: data.doctor_experience,
        about: data.doctor_about,
        educational: data.doctor_educational,
        rating: data.doctor_rating,
      },
      ...{
        uid: data.patient_uid,
        contactNumber: data.patient_contact_number,
        weight: data.patient_weight,
        height: data.patient_height,
        nationality: data.patient_nationality,
        civilStatus: data.patient_civil_status,
      },
    }));

    return data;
  });

const create = async (userData, knex = pg) => {
  userData.uid = userData.uid || uuidV4();
  const dbResponse = await knex
    .insert(objectFilter(toDb(userData)))
    .into("users")
    .returning("*");

  return fromDb(__.first(dbResponse));
};

const update = async (userData, knex = pg) => {
  const dbResponse = await knex("users")
    .where({ user_uid: userData.uid })
    .update(
      objectFilter({
        user_first_name: userData.firstName,
        user_last_name: userData.lastName,
        user_email: userData.email,
        user_password: userData.password,
        user_role: userData.role,
        updated_at: new Date(Date.now()),
      })
    )
    .returning("*");

  return fromDb(__.first(dbResponse));
};

const get = async (uid, knex = pg) => {
  const dbResponse = await knex
    .select("*")
    .from("users")
    .where(objectFilter({ user_uid: uid }))
    .leftJoin("doctors", "doctor_uid", "user_uid")
    .leftJoin("patients", "patient_uid", "user_uid");

  const data = dbResponse.map((data) => ({
    ...fromDb(data),
    ...{
      uid: data.doctor_uid,
      licenceNum: data.doctor_licence_num,
      licenceImg: data?.doctor_licence_img,
      licenceExp: data.doctor_licence_exp,
      verificationStatus: data.doctor_verification_status,
      experience: data.doctor_experience,
      about: data.doctor_about,
      educational: data.doctor_educational,
      rating: data.doctor_rating,
    },
    ...{
      uid: data.patient_uid,
      contactNumber: data.patient_contact_number,
      weight: data.patient_weight,
      height: data.patient_height,
      nationality: data.patient_nationality,
      civilStatus: data.patient_civil_status,
    },
  }));

  return data;
};

const remove = async (uid, knex = pg) => {
  const dbResponse = await knex("users")
    .where({ user_uid: uid })
    .del()
    .returning("*");
  return fromDb(dbResponse);
};

export default { create, get, remove, update, find };
