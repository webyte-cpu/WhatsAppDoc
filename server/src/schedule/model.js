import objectFilter from "../helpers/objectFilter.js";
import { v4 as uuidV4 } from "uuid";
import pg from "../../db/index.js";
import __ from "lodash";
import { ApolloError } from "apollo-server-errors";
import findModel from "../helpers/find.js";

const fromDb = (scheduleData) => ({
  uid: scheduleData?.schedule_uid,
  doctorClinicUid: scheduleData?.doctor_clinic_uid,
  startTime: scheduleData?.start_time,
  endTime: scheduleData?.end_time,
  daysOfTheWeek: JSON.parse(scheduleData?.day_of_week || "null"),
});

const toDb = (scheduleData) => ({
  schedule_uid: scheduleData.uid,
  doctor_clinic_uid: scheduleData.doctorClinicUid,
  start_time: scheduleData.startTime,
  end_time: scheduleData.endTime,
  day_of_week: JSON.stringify(scheduleData?.daysOfTheWeek),
});

const create = async ({ doctorClinicUid, schedList }, knex = pg) => {
  try {
    const newSchedList = schedList.map((scheduleData) => {
      scheduleData.uid = scheduleData.uid || uuidV4();
      scheduleData.doctorClinicUid = doctorClinicUid;
      return toDb(scheduleData);
    });

    const dbResponse = await knex
      .insert(newSchedList)
      .into("schedules")
      .returning("*");

    return dbResponse.map((data) => fromDb(data));
  } catch (error) {
    console.log(error);
  }
};

const update = async (scheduleData, knex = pg) => {
  const dbResponse = await knex("schedules")
    .where({ schedule_uid: scheduleData.uid })
    .update(objectFilter(toDb(scheduleData)))
    .returning("*");

  return fromDb(__.first(dbResponse));
};

const upsert = async ({ doctorClinicUid, schedList }, knex = pg) => {
  const newSchedList = schedList.map((scheduleData) => {
    scheduleData.uid = scheduleData.uid || uuidV4();
    scheduleData.doctorClinicUid = doctorClinicUid;
    return toDb(scheduleData);
  });

  try {
    const dbResponse = await knex
      .insert(newSchedList)
      .into("schedules")
      .returning("*")
      .onConflict("schedule_uid")
      .merge();

    return dbResponse.map((data) => fromDb(data));
  } catch (error) {
    throw new ApolloError(error.detail, "DOES_NOT_EXIST");
  }
};

const get = async (uid, knex = pg) => {
  const dbResponse = await knex
    .select("*")
    .from("schedules")
    .where({ schedule_uid: uid });

  return dbResponse.map(fromDb);
};

const getAll = async (knex = pg) => {
  const dbResponse = await knex.select("*").from("schedules");
  return dbResponse.map(fromDb);
};

const find = findModel("schedules", fromDb, toDb, pg);

const remove = async (uid, knex = pg) => {
  try {
    const dbResponse = await knex("schedules")
      .where({ schedule_uid: uid })
      .del("*");

    if (__.isEmpty(dbResponse)) {
      throw new ApolloError(
        "Schedule not found or already deleted",
        "DOES_NOT_EXIST"
      );
    }

    return fromDb(__.first(dbResponse));
  } catch (error) {
    console.error(error);
  }
};

export default { create, update, get, remove, upsert, getAll, find };
