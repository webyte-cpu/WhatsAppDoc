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

const get = async (userUid, knex = pg) => {
  return knex.transaction(async (trx) => {
    const usersResponse = await trx
      .select("*")
      .from("users")
      .where({ user_uid: userUid });

    const user = __.first(usersResponse);

    if (user.user_role === enums.role.PATIENT) {
      const appResponse = await trx
        .select("*")
        .from("appointments")
        .where({ patient_uid: userUid });
      return appResponse.map(fromDb);
    }

    if (user.user_role === enums.role.DOCTOR) {
      const appResponse = await trx
        .select([
          "appointments_uid",
          "patient_uid",
          "doctor_clinics.doctor_clinic_uid",
          "appointment_status",
          "appointment_timestamp",
          "appointment_doctor_remarks",
        ])
        .from("doctors")
        .where({ "doctors.doctor_uid": userUid })
        .innerJoin(
          "doctor_clinics",
          "doctor_clinics.doctor_uid",
          "doctors.doctor_uid"
        )
        .innerJoin(
          "appointments",
          "appointments.doctor_clinic_uid",
          "doctor_clinics.doctor_clinic_uid"
        );
      return appResponse.map(fromDb);
    }
  });
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
