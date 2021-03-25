import pg from "../../db";
import objectFilter from "../helpers/objectFilter";

const doctor = {
  create: () => {
    pg.insert({}).into();
  },
  update: () => {
    pg("table").where({}).update(objectFilter({}));
  },
  get: () => {
    pg.select({}).from("table");
  },
  delete: () => {
    pg("table").where({}).del();
  },
};

export default doctor;
