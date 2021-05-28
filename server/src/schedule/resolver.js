import schedule from "./model.js";
import __ from "lodash";

const resolverMap = {
  Query: {
    getSchedule: async (obj, arg) => schedule.get(arg.uid),
    getAllSchedule: async (obj, arg) => schedule.getAll(),
  },
  Mutation: {
    upsertSchedule: async (obj, arg, { loader }) => {
      const response = await schedule.upsert(arg);
      console.log(loader);
      loader?.schedule?.clear(arg.doctorClinicUid);
      return response;
    },
    createSchedule: async (obj, arg, { loader }) => {
      const response = await schedule.create(arg);
      loader?.schedule?.clear(arg.doctorClinicUid);
      return response;
    },
    updateSchedule: async (obj, arg, { loader }) => {
      const response = await schedule.update(arg);
      loader?.schedule?.clear(arg.doctorClinicUid);
      return response;
    },
    deleteSchedule: async (obj, arg, { loader }) => {
      const response = schedule.remove(arg.uid);
      loader?.schedule?.clear(arg.doctorClinicUid);
      return response;
    },
  },
};

export default resolverMap;
