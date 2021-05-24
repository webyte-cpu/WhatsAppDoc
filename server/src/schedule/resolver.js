import schedule from "./model.js";
import __ from "lodash";

const resolverMap = {
  Query: {
    // accepts specific schedule UID || doctorClinicUidto get all schedules
    getSchedule: async (obj, arg) => schedule.get(arg), 
  },
  Mutation: {
    upsertSchedule: (obj, arg) => schedule.upsert(arg.data),
    createSchedule: (obj, arg) => schedule.create(arg.data),
    updateSchedule: (obj, arg) => schedule.update(arg),
    deleteSchedule: (obj, arg) => schedule.remove(arg.uid),
  },
};

export default resolverMap;
