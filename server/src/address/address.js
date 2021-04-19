const pg = require("../../db/index.js");
const objectFilter = require("../helpers/objectFilter.js");
const { v4 } ="uuid";
const uuidV4 = v4;

const address = (knex) => {
  knex = knex || pg;

  const create = async (arg) => {
    return await knex
      .insert({
        address_uid: uuidV4(),
        address_address: arg.address,
        address_city: arg.city,
        address_province: arg.province,
        address_zip_code: arg.zipCode,
        address_country: arg.country,
        address_coordinates: arg.coordinates,
      })
      .into("doctors");
  };

  const update = async (arg) => {
    return await knex("doctors")
      .where({ address_uid: arg.uid })
      .update(
        objectFilter({
          address_address: arg.address,
          address_city: arg.city,
          address_province: arg.province,
          address_zip_code: arg.zipCode,
          address_country: arg.country,
          address_coordinates: arg.coordinates,
        })
      );
  };

  const get = async (uid) => {
    return uid
      ? await knex.select("*").from("addresses").where({ address_uid: uid })
      : await knex.select("*").from("addresses");
  };
  const remove = async (uid) => {
    return await knex("addresses").where({ address_uid: uid }).del();
  };

  return { create, update, get, remove };
};

export default address;
