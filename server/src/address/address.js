import pg from "../../db/index.js";
import objectFilter from "../helpers/objectFilter.js";
import { v4 as uuidV4 } from "uuid";

const create = async ({
  street,
  city,
  province,
  zipCode,
  country,
  coordinates,
}) => {
  return await pg
    .insert({
      address_uid: uuidV4(),
      address_street: street,
      address_city: city,
      address_province: province,
      address_zip_code: zipCode,
      address_country: country,
      address_coordinates: coordinates,
    })
    .into("doctors");
};

const update = async ({
  uid,
  street,
  city,
  province,
  zipCode,
  country,
  coordinates,
}) => {
  return await pg("doctors")
    .where({ address_uid: uid })
    .update(
      objectFilter({
        address_street: street,
        address_city: city,
        address_province: province,
        address_zip_code: zipCode,
        address_country: country,
        address_coordinates: coordinates,
      })
    );
};

const get = async (uid) => {
  return uid
    ? await pg.select("*").from("addresses").where({ address_uid: uid })
    : await pg.select("*").from("addresses");
};
const remove = async (uid) => {
  return await pg("addresses").where({ address_uid: uid }).del();
};

export default { create, update, get, remove };
