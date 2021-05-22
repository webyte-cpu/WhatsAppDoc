import objectFilter from "../helpers/objectFilter.js";
import { v4 as uuidV4 } from "uuid";
import pg from "../../db/index.js";
import __ from "lodash";
import { ApolloError } from "apollo-server-errors";

const fromDb = (scheduleData) => ({
  uid: scheduleData.schedule_uid,
  doctorClinicUid: scheduleData.doctor_clinic_uid,
  startTime: scheduleData.start_time,
  endTime: scheduleData.end_time,
  daysOfTheWeek: JSON.parse(scheduleData?.day_of_week || "null"),
});

const toDb = (scheduleData) => ({
  schedule_uid: scheduleData.uid,
  doctor_clinic_uid: scheduleData.doctorClinicUid,
  start_time: scheduleData.startTime,
  end_time: scheduleData.endTime,
  day_of_week: JSON.stringify(scheduleData?.daysOfTheWeek),
});

const create = async (scheduleList, knex = pg) => {
  
  const newSchedList = scheduleList.map((scheduleData) => {
    scheduleData.uid = scheduleData.uid || uuidV4();
    return toDb(scheduleData);
  });

  const dbResponse = await knex
    .insert(newSchedList)
    .into("schedules")
    .returning("*");

  return dbResponse.map((data) => fromDb(data));
};

const update = async (scheduleData, knex = pg) => {
  const dbResponse = await knex("schedules")
    .where({ schedule_uid: scheduleData.uid })
    .update(objectFilter(toDb(scheduleData)))
    .returning("*");

  console.log(scheduleData);

  return fromDb(__.first(dbResponse));
};

const upsert = async (scheduleList, knex = pg) => {

  const newSchedList = scheduleList.map((scheduleData) => {
    scheduleData.uid = scheduleData.uid || uuidV4();
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
    // if (error.code && error.column == "doctor_clinic_uid") {
    //   throw new ApolloError(
    //     "A unique identifier for the physician's clinic is needed!"
    //   )
    // }
    throw new ApolloError(error.detail, 'DOES_NOT_EXIST')
  }
};

const get = async ({uid, doctorClinicUid}, knex = pg) => {
  const dbResponse = await knex
    .select("*")
    .from("schedules")
    .where(objectFilter({ schedule_uid: uid, doctor_clinic_uid: doctorClinicUid }))

    return dbResponse.map(fromDb);
};

const remove = async (uid, knex = pg) => {

  const dbResponse = await knex("schedules")
    .where({ schedule_uid: uid })
    .del()
    .returning("*");

    if (__.isEmpty(dbResponse)) {
      throw new ApolloError("SCHEDULE DOES NOT EXIST.");
    }
  
    return fromDb(__.first(dbResponse));;
};

export default { create, update, get, remove, upsert };
