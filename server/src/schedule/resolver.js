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
    deleteSchedules: async (obj, arg, { loader }) => {
      try {
        const response = await schedule.remove(arg.uids);

        response?.forEach((sched) =>
          loader?.schedule?.clear(sched.doctorClinicUid)
        );
        return response;
      } catch (error) {
        console.error(error);
      }
    },
  },
};

export default resolverMap;
