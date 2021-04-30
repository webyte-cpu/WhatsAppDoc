import pg from "../../db/index.js";
import objectFilter from "../helpers/objectFilter.js";
import { v4 as uuidV4 } from "uuid";
import __ from "lodash";
const address = (knex = pg) => {
  console.log("Transacting", knex.client.transacting);
  return {
    fromDb: (data) => ({
      uid: data.address_uid,
      address: data.address,
      city: data.address_city,
      province: data.address_province,
      zipCode: data.address_zip_code,
      country: data.address_country,
      coordinates: data.address_coordinates,
    }),
    toDb: (data) => ({
      address_uid: data.uid,
      address: data.address,
      address_city: data.city,
      address_province: data.province,
      address_zip_code: data.zipCode,
      address_country: data.country,
      address_coordinates: data.coordinates,
    }),
    create: async (addressData) => {
      addressData.uid = addressData.uid || uuidV4();
      const dbResponse = await knex
        .insert(address().toDb(addressData))
        .into("addresses")
        .returning("*");

<<<<<<< Updated upstream
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
=======
      return address().fromDb(__.first(dbResponse));
    },
    update: async (addressData) => {
      const dbResponse = await knex("doctors")
        .where({ address_uid: addressData.uid })
        .update(
          objectFilter({
            address_address: addressData.address,
            address_city: addressData.city,
            address_province: addressData.province,
            address_zip_code: addressData.zipCode,
            address_country: addressData.country,
            address_coordinates: addressData.coordinates,
          })
        );

      return address().fromDb(__.first(dbResponse));
    },
    get: async (uid) => {
      const dbResponse = uid
        ? await knex.select("*").from("addresses").where({ address_uid: uid })
        : await knex.select("*").from("addresses");

      return dbResponse.map(address().fromDb);
    },
    remove: async (uid) => {
      const dbResponse = await knex("addresses")
        .where({ address_uid: uid })
        .del();

      return address().fromDb(__.first(dbResponse));
    },
  };
>>>>>>> Stashed changes
};

export default address;
