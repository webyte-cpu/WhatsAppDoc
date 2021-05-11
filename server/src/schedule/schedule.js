import objectFilter from "../helpers/objectFilter.js";
import { v4 as uuidV4 } from "uuid";
import pg from "../../db/index.js";
import __ from "lodash";

const schedule = (knex = pg) => ({
  fromDb: (scheduleData) => ({
    uid: scheduleData.schedule_uid,
    doctorClinicUid: scheduleData.doctor_clinic_uid,
    startTime: scheduleData.start_time,
    endTime: scheduleData.end_time,
    daysOfTheWeek: JSON.parse(scheduleData?.day_of_week || "null"),
  }),

  toDb: (scheduleData) => ({
    schedule_uid: scheduleData.uid,
    start_time: scheduleData.startTime,
    end_time: scheduleData.endTime,
    day_of_week: JSON.stringify(scheduleData?.daysOfTheWeek),
    doctor_clinic_uid: scheduleData.doctorClinicUid,
  }),

  create: async (scheduleData) => {
    scheduleData.uid = scheduleData.uid || uuidV4();
    const dbResponse = await knex
      .insert(schedule().toDb(scheduleData))
      .into("schedules")
      .returning("*");
    return schedule().fromDb(__.first(dbResponse));
  },

  update: async (scheduleData) => {
    const dbResponse = await knex("schedules")
      .where({ schedule_uid: scheduleData.uid })
      .update(objectFilter(schedule().toDb(scheduleData)))
      .returning("*");

    return schedule().fromDb(__.first(dbResponse));
  },

  get: async (uid) => {
    const dbResponse = await knex
      .select("*")
      .from("schedules")
      .where(objectFilter({ schedule_uid: uid }));

    console.log(dbResponse.map(schedule().fromDb));
    return dbResponse.map(schedule().fromDb);
  },

  remove: async (uid) => {
    const dbResponse = await knex("schedules")
      .where({ schedule_uid: uid })
      .del()
      .returning("*");
    return schedule().fromDb(__.first(dbResponse));
  },
});

export default schedule;
