import objectFilter from "../helpers/objectFilter.js";
import { v4 as uuidV4 } from "uuid";
import pg from "../../db/index.js";
import __ from "lodash";

const fromDb = () => ({
  uid: appointments_uid,
  patientUid: patient_uid,
  doctorClinicUid: doctor_clinic_uid,
  status: appointment_status,
  timestamp: appointment_timestamp,
  doctorRemarks: appointment_doctor_remarks,
});
const toDb = (data) => ({
  appointments_uid: data.uid,
  patient_uid: patientUid,
  doctor_clinic_uid: doctorClinicUid,
  appointment_status: status,
  appointment_timestamp: timestamp,
  appointment_doctor_remarks: doctorRemarks,
});

const create = async (data, knex = pg) => {
  data.uid = data.uid || uuidV4();
  const dbResponse = await knex
    .insert(toDb(data))
    .into("appointments")
    .returning("*");

  return fromDb(__.first(dbResponse));
};

const update = async (data, knex = pg) => {
  const dbResponse = await knex("appointments")
    .where({ appointments_uid: data.uid })
    .update(objectFilter(toDb(data)))
    .returning("*");

  return fromDb(__.first(dbResponse));
};

const get = (data, knex = pg) => {
  const dbResponse = knex
    .select("*")
    .from("appointments")
    .where(objectFilter(toDb(data)));
  return fromDb(dbResponse);
};

const remove = (data, knex = pg) => {
  const dbResponse = await knex("appointments")
    .where({ appointments_uid: data.uid })
    .del(objectFilter(toDb(data)))
    .returning("*");

  return fromDb(__.first(dbResponse));
};

export default { create, update, get, remove };
