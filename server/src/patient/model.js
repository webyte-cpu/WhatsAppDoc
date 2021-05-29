import objectFilter from "../helpers/objectFilter.js";
import { v4 as uuidV4 } from "uuid";
import pg from "../../db/index.js";
import __ from "lodash";

const fromDb = (patientData) => ({
  uid: patientData.patient_uid,
  contactNumber: patientData.patient_contact_number,
  weight: patientData.patient_weight,
  height: patientData.patient_height,
  nationality: patientData.patient_nationality,
  civilStatus: patientData.patient_civil_status,
});

const toDb = (patientData) => ({
  patient_uid: patientData.uid,
  patient_contact_number: patientData.contactNumber,
  patient_weight: patientData.weight,
  patient_height: patientData.height,
  patient_nationality: patientData.nationality,
  patient_civil_status: patientData.civilStatus,
});

const create = async (patientData, knex = pg) => {
  patientData.uid = patientData.uid || uuidV4();
  const dbResponse = await knex
    .insert(toDb(patientData))
    .into("patients")
    .returning("*");
  return fromDb(__.first(dbResponse));
};

const update = async (patientData, knex = pg) => {
  const dbResponse = await knex("patients")
    .where({ patient_uid: patientData.uid })
    .update(objectFilter(toDb(patientData)))
    .returning("*");

  return fromDb(__.first(dbResponse));
};

const get = async (uid, knex = pg) => {
  const doctorSelectQuery = uid
    ? knex.select("*").from("patients").where({ patient_uid: uid })
    : knex.select("*").from("patients");

  const dbResponse = await doctorSelectQuery.innerJoin(
    "users",
    "user_uid",
    "patient_uid"
  );

  return __.first(
    dbResponse.map((data) => ({
      ...{
        uid: data.user_uid,
        firstName: data.user_first_name,
        middleName: data.user_middle_name,
        lastName: data.user_last_name,
        email: data.user_email,
        password: data.user_password,
        birthdate: data.user_birthdate,
        sex: data.user_sex,
        address: data.address,
        role: data.user_role,
        img: data.user_img,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      },
      ...fromDb(data),
    }))
  );
};

const getAll = async (knex = pg) => {
  const dbResponse = await knex
    .select("*")
    .from("patients")
    .innerJoin("users", "user_uid", "patient_uid");

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
      address: data.address,
      role: data.user_role,
      img: data.user_img,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    },
    ...fromDb(data),
  }));
};

const remove = async (user_uid, knex = pg) => {
  const dbResponse = await knex("patients")
    .where({ user_uid })
    .del()
    .returning("*");
  return fromDb(__.first(dbResponse)).uid;
};

export default { fromDb, toDb, create, update, get, remove, getAll };
