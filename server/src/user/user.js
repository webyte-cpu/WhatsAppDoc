import pg from "../../db/index.js";
import objectFilter from "../helpers/objectFilter.js";
import { v4 as uuidV4 } from "uuid";

const user = {
  signUp: async (arg) => {
    return pg.transaction(async (knex) => {
      const userUid = uuidV4();
      const addressUid = arg.address && uuidV4();

      //address arg exist
      const addressResponse =
        arg.address &&
        knex
          .insert(
            objectFilter({
              address_uid: addressUid,
              address_street: arg.address.street,
              address_city: arg.address.city,
              address_province: arg.address.province,
              address_zip_code: arg.address.zipCode,
              address_country: arg.address.country,
              address_coordinates: arg.address.coordinates,
            })
          )
          .into("addresses")
          .returning("*");

      const userResponse = knex
        .insert(
          objectFilter({
            user_uid: userUid,
            address_uid: addressUid,
            user_first_name: arg.firstName,
            user_last_name: arg.lastName,
            user_email: arg.email,
            user_password: arg.password,
            user_sex: arg.sex,
            user_birthdate: arg.birthdate,
            user_is_doctor: arg.isDoctor,
          })
        )
        .into("users")
        .returning("*");

      const doctorResponse =
        arg.isDoctor &&
        knex
          .insert(
            objectFilter({
              doctor_uid: uuidV4(),
              user_uid: userUid,
              doctor_licence_no: arg.licenceNo,
            })
          )
          .into("doctors")
          .returning("*");

      const patientResponse = knex
        .insert({
          patient_uid: uuidV4(),
          user_uid: userUid,
        })
        .into("patients")
        .returning("*");

      const responseList = [
        addressResponse,
        userResponse,
        doctorResponse,
        patientResponse,
      ];

      const responses = await Promise.all(responseList.filter((x) => x));

      const dataCompiled = responses.reduce((obj, response) => {
        if (response[0]?.address_city) {
          return { ...obj, address: response[0] };
        }
        return { ...obj, ...response[0] };
      }, {});

      return {
        uid: dataCompiled.user_uid,
        firstName: dataCompiled.user_first_name,
        lastName: dataCompiled.user_last_name,
        sex: dataCompiled.user_sex,
        birthdate: dataCompiled.user_birthdate,
        email: dataCompiled.user_email,
        licenceNo: dataCompiled.doctor_licence_no,
        isDoctor: dataCompiled.user_is_doctor,
        address: {
          street: dataCompiled.address.address_street,
          city: dataCompiled.address.address_city,
          province: dataCompiled.address.address_province,
          zipCode: dataCompiled.address.address_zip_code,
          country: dataCompiled.address.address_country,
        },
      };
    });
  },
  create: async (arg) => {
    return await pg
      .insert({
        user_uid: uuidV4(),
        address_uid: arg.addressUid,
        user_first_name: arg.firstName,
        user_last_name: arg.lastName,
        user_email: arg.email,
        user_password: arg.password,
        user_sex: arg.sex,
        user_birthdate: arg.birthdate,
        user_phone_number: arg.phoneNumber,
        user_weight: arg.weight,
        user_height: arg.height,
        user_civil_status: arg.civilStatus,
        user_nationality: arg.nationality,
        user_is_doctor: arg.isDoctor,
      })
      .into("users")
      .returning("*");
  },

  update: async (arg) => {
    return await pg("users")
      .where({ user_uid: arg.uid })
      .update(
        objectFilter({
          user_uid: uuidV4(),
          address_uid: arg.addressUid,
          user_first_name: arg.firtName,
          user_last_name: arg.lastName,
          user_email: arg.email,
          user_password: arg.password,
          user_sex: arg.sex,
          user_birthdate: arg.birthdate,
          user_phone_number: arg.phoneNumber,
          user_weight: arg.weight,
          user_height: arg.height,
          user_civil_status: arg.civilStatus,
          user_nationality: arg.nationality,
          user_is_doctor: arg.isDoctor,
        })
      );
  },

  get: async (uid) => {
    return await pg.select("*").from("users").where({ user_uid: uid });
  },

  delete: (uid) => {
    return pg("users").where({ user_uid: uid }).del();
  },
};

export default user;
