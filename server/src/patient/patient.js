import objectFilter from "../helpers/objectFilter.js";
import { v4 as uuidV4 } from "uuid";
import pg from "../../db/index.js";
import __ from "lodash";

const patient = (knex = pg) => ({
  fromDb: (patientData) => ({
    uid: patientData.patient_uid,
    contactNumber: patientData.patient_contact_number,
    weight: patientData.patient_weight,
    height: patientData.patient_height,
    nationality: patientData.patient_nationality,
    civilStatus: patientData.patient_civil_status,
  }),

  toDb: (patientData) => ({
    patient_uid: patientData.uid,
    patient_contact_number: patientData.contactNumber,
    patient_weight: patientData.weight,
    patient_height: patientData.height,
    patient_nationality: patientData.nationality,
    patient_civil_status: patientData.civilStatus,
  }),

  create: async (patientData) => {
    patientData.uid = patientData.uid || uuidV4();
    const dbResponse = await knex
      .insert(patient().toDb(patientData))
      .into("patients")
      .returning("*");
    return patient().fromDb(__.first(dbResponse));
  },
  update: async (patientData) => {
    const dbResponse = await knex("patients")
      .where({ patient_uid: patientData.uid })
      .update(objectFilter(patient().toDb(patientData)))
      .returning("*");

    return patient().fromDb(__.first(dbResponse));
  },
  get: async (uid) => {
    const dbResponse = uid
      ? await knex.select("*").from("patients").where({ user_uid: uid })
      : await knex.select("*").from("patients");
    return dbResponse.map((patientData) => patient().fromDb(patientData));
  },
  remove: async (user_uid) => {
    const dbResponse = await knex("patients")
      .where({ user_uid })
      .del()
      .returning("*");
    return patient().fromDb(__.first(dbResponse)).uid;
  },
});

export default patient;
