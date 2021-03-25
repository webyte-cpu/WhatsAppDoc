import pg from "../../db";
import objectFilter from "../helpers/objectFilter";

const user = {
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

export default user;
