import schedule from "./schedule.js";
import __ from "lodash";

const resolverMap = {
  Query: {
    getSchedule: async (obj, arg) => __.first(await schedule().get(arg.uid)),
  },
  Mutation: {
    createSchedule: async (obj, arg) => {
      return schedule().create(arg);
    },
    updateSchedule: async (obj, arg) => {
      return schedule().update(arg);
    },
    deleteSchedule: async (obj, arg) => {
      return schedule().remove(arg.uid);
    },
  },
};

export default resolverMap;