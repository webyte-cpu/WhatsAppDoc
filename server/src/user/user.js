import { ApolloError, UserInputError } from "apollo-server-errors";
import specialization from "../specialization/specialization.js";
import objectFilter from "../helpers/objectFilter.js";
import enums from "../helpers/enums/enums.js";
import patient from "../patient/patient.js";
import doctor from "../doctor/doctor.js";
import { v4 as uuidV4 } from "uuid";
import pg from "../../db/index.js";
import bcrypt from "bcrypt";
import __ from "lodash";

const user = (knex = pg) => {
  return {
    fromDb: (userData) => ({
      uid: userData.user_uid,
      firstName: userData.user_first_name,
      middleName: userData.user_middle_name,
      lastName: userData.user_last_name,
      email: userData.user_email,
      password: userData.user_password,
      birthdate: userData.birthdate,
      sex: userData.sex,
      address: userData.address,
      role: userData.user_role,
      img: userData.user_img,
      createdAt: userData.created_at,
      updatedAt: userData.updated_at,
    }),

    toDb: (userData) => ({
      user_uid: userData.uid,
      user_first_name: userData.firstName,
      user_middle_name: userData.middleName,
      user_last_name: userData.lastName,
      user_email: userData.email,
      user_password: userData.password,
      user_birthdate: userData.birthdate,
      user_sex: userData.sex,
      address_uid: userData.address?.uid,
      user_role: userData.role,
      user_img: userData.img,
      created_at: userData.createdAt,
      updated_at: userData.updatedAt,
    }),
    signUp: async (userData) => {
      return knex.transaction(async (trx) => {
        const response = {};
        const saltRounds = 10;
        const hashedPassword = bcrypt.hashSync(userData.password, saltRounds);

        userData.uid = uuidV4();
        userData.createdAt = new Date(Date.now());
        userData.password = hashedPassword;

        response.user = await user(trx).create(userData);
        response.patient = await patient(trx).create(userData);

        if (userData.role === enums.role.DOCTOR) {
          const doctorData = userData.doctor;
          doctorData.uid = userData.uid;
          response.doctor = await doctor(trx).create(doctorData);

          if (__.isEmpty(doctorData.specialization)) {
            throw new UserInputError(
              "Doctor should have atleast one specialty."
            );
          }

          const specList = doctorData.specialization.map((title) =>
            specialization(trx).assign({
              title,
              userUid: doctorData.uid,
            })
          );

          response.doctor.specialization = await Promise.all(specList);
        }

        delete response.user.password;
        return response.user;
      });
    },
    find: async (object) => {
      const dbResponse = await knex
        .select("*")
        .from("users")
        .where(objectFilter(user().toDb(object)));

      return dbResponse.map((data) => user().fromDb(data));
    },

    create: async (userData) => {
      userData.uid = userData.uid || uuidV4();
      const dbResponse = await knex
        .insert(objectFilter(user().toDb(userData)))
        .into("users")
        .returning("*");

      return user().fromDb(__.first(dbResponse));
    },

    update: async (userData) => {
      const dbResponse = await knex("users")
        .where({ user_uid: userData.uid })
        .update(
          objectFilter({
            user_first_name: userData.firstName,
            user_last_name: userData.lastName,
            user_email: userData.email,
            user_password: userData.password,
            user_role: userData.role,
            updated_at: new Date(Date.now()),
          })
        )
        .returning("*");

      return user().fromDb(__.first(dbResponse));
    },
    check: async ({ email, password }) => {
      const dbResponse = await user().find({ email });
      const userData = dbResponse[0];
      const match = await bcrypt.compare(password, userData.password);
      delete userData.password;
      if (match) return userData;
      throw new ValidationError("Invalid password!");
    },

    get: async (uid) => {
      if (!__.isUndefined(uid)) {
        const dbResponse = await knex
          .select("*")
          .from("users")
          .where(
            objectFilter({
              user_uid: uid,
            })
          );
        if (__.isEmpty(dbResponse)) {
          throw new ApolloError("User does not exist!", "NO_DATA");
        }
        return user().fromDb(__.first(dbResponse));
      }

      console.log("hello");
      const dbResponse = await knex.select("*").from("users");

      return dbResponse.map(user().fromDb);
    },

    delete: async (uid) => {
      const dbResponse = await knex("users")
        .where({ user_uid: uid })
        .del()
        .returning("*")
      return user().fromDb(dbResponse);
    },
  };
};

export default user;
