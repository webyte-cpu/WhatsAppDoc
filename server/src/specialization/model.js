import objectFilter from "../helpers/objectFilter.js";
import { v4 as uuidV4 } from "uuid";
import pg from "../../db/index.js";
import __ from "lodash";
import c from "case";

const fromDb = (data = {}) => ({
  uid: data.specialization_uid,
  title: data.specialization_title,
});
const toDb = (data = {}) => ({
  specialization_uid: data.uid,
  specialization_title: data.title,
});

const create = async (data, knex = pg) => {
  data.uid = data.uid || uuidV4();
  const dbResponse = await knex
    .insert(toDb(data))
    .into("specializations")
    .returning("*")
    .onConflict("specialization_title")
    .ignore();
  return fromDb(__.first(dbResponse));
};

const find = async (object, knex = pg) => {
  const dbResponse = await knex
    .select("*")
    .from("specializations")
    .where(objectFilter(toDb(object)));
  return dbResponse.map((data) => fromDb(data));
};
const assign = ({ title, userUid }, knex = pg) =>
  knex.transaction(async (trx) => {
    const response = {};

    title = c.sentence(title);
    await create({ title }, trx);
    response.specialization = await find({ title }, trx);
    const data = __.first(response.specialization);

    response.assignedSpecialization = await trx
      .insert({
        doctor_specialization_uid: uuidV4(),
        specialization_uid: data.uid,
        doctor_uid: userUid,
      })
      .into("doctor_specializations");

    return data;
  });

const assignedTo = async (uid, knex = pg) => {
  const dbResponse = await knex
    .select("*")
    .from("doctor_specializations")
    .where({
      doctor_uid: uid,
    })
    .innerJoin(
      "specializations",
      "specializations.specialization_uid",
      "doctor_specializations.specialization_uid"
    );

  return dbResponse.map(
    (specialization) => specialization.specialization_title
  );
};

export default { assign, assignedTo, find, create };
