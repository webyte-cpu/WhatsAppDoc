import objectFilter from "../helpers/objectFilter.js";
import { v4 as uuidV4 } from "uuid";
import pg from "../../db/index.js";
import __ from "lodash";
import c from "case";
const specialization = (knex = pg) => ({
  fromDb: (data = {}) => ({
    uid: data.specialization_uid,
    title: data.specialization_title,
  }),
  toDb: (data = {}) => ({
    specialization_uid: data.uid,
    specialization_title: data.title,
  }),
  assign: ({ title, userUid }) =>
    knex.transaction(async (trx) => {
      const response = {};

      title = c.sentence(title);
      await specialization(trx).create({ title });
      response.specialization = await specialization(trx).find({ title });
      const data = __.first(response.specialization);

      response.assignedSpecialization = await trx
        .insert({
          doctor_specialization_uid: uuidV4(),
          specialization_uid: data.uid,
          doctor_uid: userUid,
        })
        .into("doctor_specializations");

      return data;
    }),
  find: async (object) => {
    const dbResponse = await knex
      .select("*")
      .from("specializations")
      .where(objectFilter(specialization().toDb(object)));
    return dbResponse.map((data) => specialization().fromDb(data));
  },

  create: async (data) => {
    data.uid = data.uid || uuidV4();
    const dbResponse = await knex
      .insert(specialization().toDb(data))
      .into("specializations")
      .returning("*")
      .onConflict("specialization_title")
      .ignore();
    return specialization().fromDb(__.first(dbResponse));
  },
});

export default specialization;
