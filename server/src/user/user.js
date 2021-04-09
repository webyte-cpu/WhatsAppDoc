import pg from "../../db/index.js";
import objectFilter from "../helpers/objectFilter.js";
import { UserInputError } from "apollo-server-errors";
import enums from "../helpers/enums/enums.js";
import { v4 as uuidV4 } from "uuid";

const user = {
  signUp: async (arg) => {
    return pg.transaction(async (knex) => {
      const userUid = uuidV4();
      const responseList = [];

      console.log(arg.role);

      const userResponse = knex
        .insert(
          objectFilter({
            user_uid: userUid,
            user_first_name: arg.firstName,
            user_last_name: arg.lastName,
            user_email: arg.email,
            user_password: arg.password,
            user_role: arg.role,
            user_img: arg.img,
            created_at: new Date(Date.now()),
          })
        )
        .into("users")
        .returning("*");

      responseList.push(userResponse);

      switch (arg.role) {
        case enums.role.DOCTOR:
          if (!arg.licenceNum && !arg.licenceImg) {
            throw new UserInputError(
              "Docotor licence number and licence image path are required!"
            );
          }

          const doctorResponse = knex
            .insert(
              objectFilter({
                doctor_uid: userUid,
                doctor_licence_num: arg.licenceNum,
                doctor_licence_img: arg.licenceImg,
              })
            )
            .into("doctors")
            .returning("*");

          responseList.push(doctorResponse);

        case enums.role.PATIENT:
          if (!arg.address && arg.role !== enums.role.DOCTOR) {
            throw new UserInputError("Patient address is required!");
          }

          if (!arg.sex && !arg.birthdate) {
            throw new UserInputError("Patient sex and birthdate are required!");
          }

          let addressUid;

          if (arg.address) {
            addressUid = uuidV4();

            const addressResponse = knex
              .insert(
                objectFilter({
                  address_uid: addressUid,
                  address: arg.address.address,
                  address_city: arg.address.city,
                  address_province: arg.address.province,
                  address_zip_code: arg.address.zipCode,
                  address_country: arg.address.country,
                  address_coordinates: arg.address.coordinates,
                })
              )
              .into("addresses")
              .returning("*");

            responseList.push(addressResponse);
          }
          const patientResponse = knex
            .insert(
              objectFilter({
                patient_uid: userUid,
                address_uid: addressUid,
                patient_birthdate: arg.birthdate,
                patient_sex: arg.sex,
              })
            )
            .into("patients")
            .returning("*");

          responseList.push(patientResponse);
      }

      const responses = await Promise.all(responseList);

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
        licenceNum: dataCompiled.doctor_licence_no,
        role: dataCompiled.user_role,
        address: {
          address: dataCompiled?.address?.address,
          city: dataCompiled?.address?.address_city,
          province: dataCompiled?.address?.address_province,
          zipCode: dataCompiled?.address?.address_zip_code,
          country: dataCompiled?.address?.address_country,
        },
      };
    });
  },
  create: async (arg) => {
    return await pg
      .insert({
        user_uid: uuidV4(),
        user_first_name: arg.firstName,
        user_last_name: arg.lastName,
        user_email: arg.email,
        user_password: arg.password,
        user_role: arg.role,
      })
      .into("users")
      .returning("*");
  },

  update: async (arg) => {
    return await pg("users")
      .where({ user_uid: arg.uid })
      .update(
        objectFilter({
          user_first_name: arg.firstName,
          user_last_name: arg.lastName,
          user_email: arg.email,
          user_password: arg.password,
          user_role: arg.role,
        })
      );
  },

  get: async ({uid, email}) => {
    const dataResponse =
      uid || email
        ? await pg
            .select("*")
            .from("users")
            .where(objectFilter({ user_uid: uid, user_email: email }))
        : await pg.select("*").from("users");
    return dataResponse.map((data) => {
      let obj = {};

      for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
          obj[key.replace("user_", "")] = data[key];
        }
      }
      return obj;
    });
  },

  delete: (uid) => {
    return pg("users").where({ user_uid: uid }).del();
  },
};

export default user;
