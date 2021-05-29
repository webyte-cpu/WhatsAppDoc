import objectFilter from "../helpers/objectFilter.js";
import enums from "../helpers/enums/enums.js";
import findModel from "../helpers/find.js";
import { v4 as uuidV4 } from "uuid";
import pg from "../../db/index.js";

import __ from "lodash";

const fromDb = (data) => ({
  uid: data.appointments_uid,
  patientUid: data.patient_uid,
  doctorClinicUid: data.doctor_clinic_uid,
  status: data.appointment_status,
  dateTime: data.appointment_timestamp,
  doctorRemarks: data.appointment_doctor_remarks,
  createdAt: data.created_at,
  updatedAt: data.updated_at,
});
const toDb = (data) => ({
  appointments_uid: data.uid,
  patient_uid: data.patientUid,
  doctor_clinic_uid: data.doctorClinicUid,
  appointment_status: data.status,
  appointment_timestamp: data.dateTime,
  appointment_doctor_remarks: data.doctorRemarks,
  created_at: data.createdAt,
  updated_at: data.updatedAt,
});

const create = async (data, knex = pg) => {
  data.uid = data.uid || uuidV4();
  data.status = enums.status.PENDING;
  data.createdAt = new Date(Date.now());
  const dbResponse = await knex
    .insert(toDb(data))
    .into("appointments")
    .returning("*");

  return fromDb(__.first(dbResponse));
};

const update = async (data, knex = pg) => {
  data.updatedAt = new Date(Date.now());
  const dbResponse = await knex("appointments")
    .where({ appointments_uid: data.uid })
    .update(objectFilter(toDb(data)))
    .returning("*");

  return fromDb(__.first(dbResponse));
};

const get = async (uid, knex = pg) => {
  const dbResponse = await knex
    .select("*")
    .from("appointments")
    .where(objectFilter({ appointments_uid: uid }));
  return fromDb(__.first(dbResponse));
};

const getAll = async (knex = pg) => {
  const dbResponse = await knex.select("*").from("appointments");
  return dbResponse.map(fromDb);
};

const remove = async (data, knex = pg) => {
  const dbResponse = await knex("appointments")
    .where({ appointments_uid: data.uid })
    .delete("*");
  return fromDb(__.first(dbResponse));
};

const find = findModel("appointments", fromDb, toDb, pg);

export default { create, update, get, remove, find, getAll };
