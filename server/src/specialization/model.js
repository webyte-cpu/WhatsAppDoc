import findModel from "../helpers/find.js";
import { v4 as uuidV4 } from "uuid";
import pg from "../../db/index.js";
import __ from "lodash";
import c from "case";
import objectFilter from "../helpers/objectFilter.js";

const fromDb = (data = {}) => ({
  uid: data.specialization_uid,
  title: data.specialization_title,
  doctorUid: data.doctor_uid,
  specializationUid: data.specialization_uid,
  doctorSpecializationUid: data.doctor_specialization_uid,
});
const toDb = (data = {}) => ({
  specialization_uid: data.uid,
  specialization_title: data.title,
  doctor_uid: data.doctorUid,
  doctor_specialization_uid: data.doctorSpecializationUid,
});

const create = async (titles, knex = pg) => {
  const dbData = titles.map((title) =>
    objectFilter(toDb({ title: c.sentence(title), uid: uuidV4() }))
  );

  const dbResponse = await knex
    .insert(dbData)
    .into("specializations")
    .returning("*")
    .onConflict("specialization_title")
    .ignore();

  return dbResponse.map((data) => objectFilter(fromDb(data)));
};

const find = findModel("doctor_specializations", fromDb, toDb, pg, (knex) =>
  knex.innerJoin(
    "specializations",
    "specializations.specialization_uid",
    "doctor_specializations.specialization_uid"
  )
);

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

const assign = ({ titles, userUid }, knex = pg) =>
  knex.transaction(async (trx) => {
    const response = {};

    response.create = await create(titles, trx);
    response.assigned = await assignedTo(userUid, trx);
    response.get = await trx
      .select()
      .from("specializations")
      .whereIn(
        "specialization_title",
        titles.map((title) => c.sentence(title))
      );

    const newSpecializations = response.get
      .filter(
        ({ specialization_title }) =>
          !response.assigned.includes(specialization_title)
      )
      .map((specialization) => ({
        ...specialization,
        doctor_specialization_uid: uuidV4(),
      }));

    response.newlyAssigned = await trx
      .insert(
        newSpecializations.map(
          ({ doctor_specialization_uid, specialization_uid }) => ({
            doctor_uid: userUid,
            doctor_specialization_uid,
            specialization_uid,
          })
        )
      )
      .into("doctor_specializations");

    return newSpecializations.map(
      ({ specialization_title }) => specialization_title
    );
  });

const unassign = ({ title, userUid }, knex = pg) => {
  return knex.transaction(async (trx) => {
    const response = {};

    response.specialization = await trx
      .select("specialization_uid")
      .from("specializations")
      .where("specialization_title", c.sentence(title))
      .first();

    response.deleted = await trx("doctor_specializations")
      .where({
        doctor_uid: userUid,
        specialization_uid: response.specialization.specialization_uid,
      })
      .del("*");

    console.log("unsigned", response);
    return title;
  });
};

export default { assign, assignedTo, find, create, unassign };
