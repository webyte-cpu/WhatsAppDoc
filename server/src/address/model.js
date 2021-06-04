import objectFilter from "../helpers/objectFilter.js";
import { ApolloError } from "apollo-server-express";
import findModel from "../helpers/find.js";
import { v4 as uuidV4 } from "uuid";
import pg from "../../db/index.js";
import __ from "lodash";

const fromDb = (data) => ({
  uid: data.address_uid,
  address: data.address,
  city: data.address_city,
  province: data.address_province,
  zipCode: data.address_zip_code,
  country: data.address_country,
  coordinates: data.address_coordinates,
});

const toDb = (data) => ({
  address_uid: data.uid,
  address: data.address,
  address_city: data.city,
  address_province: data.province,
  address_zip_code: data.zipCode,
  address_country: data.country,
  address_coordinates: data.coordinates,
});

const create = async (addressData, knex = pg) => {
  addressData.uid = addressData.uid || uuidV4();
  const dbResponse = await knex
    .insert(toDb(addressData))
    .into("addresses")
    .returning("*");

  return fromDb(__.first(dbResponse));
};

const update = async (addressData, knex = pg) => {
  try {
    console.log(addressData, "addDATA");
    const dbResponse = await knex("addresses")
      .where({ address_uid: addressData.uid })
      .update(
        objectFilter({
          address: addressData.address,
          address_city: addressData.city,
          address_province: addressData.province,
          address_zip_code: addressData.zipCode,
          address_country: addressData.country,
          address_coordinates: addressData.coordinates,
        })
      )
      .returning("*");

    console.log(dbResponse, "DB");

    return fromDb(__.first(dbResponse));
  } catch (error) {
    console.log(error);
    throw new ApolloError(error);
  }
};

const get = async (uid, knex = pg) => {
  const dbResponse = await knex
    .select("*")
    .from("addresses")
    .where({ address_uid: uid });

  if (!__.isEmpty(dbResponse)) {
    return fromDb(__.first(dbResponse));
  }
};

const getAll = async (knex = pg) => {
  const dbResponse = await knex.select("*").from("addresses");
  return dbResponse.map(fromDb);
};

const remove = async (uid, knex = pg) => {
  
  const dbResponse = await knex("addresses")
    .where({ address_uid: uid })
    .del()
    .returning("*");
  return fromDb(__.first(dbResponse));
};

const find = findModel("addresses", fromDb, toDb, pg);

export default { create, update, get, remove, getAll, find };
