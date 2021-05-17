import objectFilter from "../helpers/objectFilter.js";
import { v4 as uuidV4 } from "uuid";
import user from "../user/user.js";
import pg from "../../db/index.js";
import __ from "lodash";

export default (knex = pg) => {
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

  const create = async (patientData) => {
    patientData.uid = patientData.uid || uuidV4();
    const dbResponse = await knex
      .insert(toDb(patientData))
      .into("patients")
      .returning("*");
    return fromDb(__.first(dbResponse));
  };

  const update = async (patientData) => {
    const dbResponse = await knex("patients")
      .where({ patient_uid: patientData.uid })
      .update(objectFilter(toDb(patientData)))
      .returning("*");

    return fromDb(__.first(dbResponse));
  };

  const get = async (uid) => {
    const doctorSelectQuery = uid
      ? knex.select("*").from("patients").where({ patient_uid: uid })
      : knex.select("*").from("patients");

    const dbResponse = await doctorSelectQuery.innerJoin(
      "users",
      "user_uid",
      "patient_uid"
    );

    return dbResponse.map((data) => ({
      ...user().fromDb(data),
      ...fromDb(data),
    }));
  };

  const remove = async (user_uid) => {
    const dbResponse = await knex("patients")
      .where({ user_uid })
      .del()
      .returning("*");
    return fromDb(__.first(dbResponse)).uid;
  };

  return { fromDb, toDb, create, update, get, remove };
};
