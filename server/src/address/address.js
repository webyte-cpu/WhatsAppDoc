import objectFilter from "../helpers/objectFilter.js";
import pg from "../../db/index.js";
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
      const dbResponse = await knex
        .select("*")
        .from("addresses")
        .where(objectFilter({ address_uid: uid }));

      return dbResponse.map(address().fromDb);
    },
    remove: async (uid) => {
      const dbResponse = await knex("addresses")
        .where({ address_uid: uid })
        .del();

      return address().fromDb(__.first(dbResponse));
    },
  };
};

export default address;
