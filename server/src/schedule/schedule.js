import objectFilter from "../helpers/objectFilter.js";
import { v4 as uuidV4 } from "uuid";
import pg from "../../db/index.js";
import __ from "lodash";

const schedule = (knex = pg) => ({
  fromDb: (scheduleData) => ({
    uid: scheduleData.schedule_uid,
    startTime: scheduleData.start_time_ms,
    endTime: scheduleData.end_time_ms,
    dayOfTheWeek: scheduleData.day_of_the_week
  }),

  toDb: (scheduleData) => ({
    schedule_uid: scheduleData.uid,
    start_time_ms: scheduleData.startTime,
    end_time_ms: scheduleData.endTime,
    day_of_the_week: scheduleData.dayOfTheWeek
  }),

  create: async (scheduleData) => {
    scheduleData.uid = scheduleData.uid || uuidV4();
    const dbResponse = await knex
      .insert(patient().toDb(scheduleData))
      .into("schedule")
      .returning("*");
    return schedule().fromDb(__.first(dbResponse));
  },

  update: async (scheduleData) => {
    const dbResponse = await knex("schedule")
      .where({ schedule_uid: scheduleData.uid })
      .update(
        objectFilter({
          schedule_uid: scheduleData.uid,
          start_time_ms: scheduleData.startTime,
          end_time_ms: scheduleData.endTime,
          day_of_the_week: scheduleData.dayOfTheWeek
        })
      )
      .returning("*");

    return patient().fromDb(__.first(dbResponse));
  },

  get: async (uid) => {
    const dbResponse = await knex("schedule").select("*").from("schedule").where({ schedule_uid: uid });

    return dbResponse.map(schedule().fromDb);
  },

  remove: async (schedule_uid) => {
    const dbResponse = await knex("schedule")
      .where({ schedule_uid })
      .del()
      .returning("*");
    return schedule().fromDb(__.first(dbResponse)).uid;
  },
});

export default schedule;