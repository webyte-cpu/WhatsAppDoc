import schedule from "./schedule.js";
import __ from "lodash";

const resolverMap = {
  Query: {
    getSchedule: async (obj, arg) => schedule().get(arg.uid),
  },
  Mutation: {
    createSchedule: (obj, arg) => schedule().create(arg),
    updateSchedule: (obj, arg) => schedule().update(arg),
    deleteSchedule: (obj, arg) => schedule().remove(arg.uid),
  },
};

export default resolverMap;
