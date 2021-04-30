import { ApolloError, UserInputError } from "apollo-server-errors";
import specialization from "../specialization/specialization.js";
import objectFilter from "../helpers/objectFilter.js";
<<<<<<< Updated upstream
import __ from "lodash";
import { v4 as uuidV4 } from "uuid";
import pg from "../../db/index.js";
import bcrypt from "bcrypt";
import { ApolloError } from "apollo-server-errors";

const user = {
  signUp: async (arg) => {
    return pg.transaction(async (knex) => {
      const saltRounds = 10;
      const hashedPassword = bcrypt.hashSync(arg.password, saltRounds);

      const dbResponse = await knex
        .insert(
          objectFilter({
            user_uid: uuidV4(),
            user_first_name: arg.firstName,
            user_last_name: arg.lastName,
            user_email: arg.email,
            user_password: hashedPassword,
            user_role: arg.role,
            user_img: arg.img,
            created_at: new Date(Date.now()),
          })
        )
        .into("users")
        .returning("*");

      return objectKeysToCamelCase(__.first(dbResponse), "user_");
    });
  },

  update: async (arg) => {
    const dbResponse = await pg("users")
      .where({ user_uid: arg.uid })
      .update(
        objectFilter({
          user_first_name: arg.firstName,
          user_last_name: arg.lastName,
          user_email: arg.email,
          user_password: arg.password,
          user_role: arg.role,
          updated_at: new Date(Date.now()),
        })
      )
      .returning("*");

    return objectKeysToCamelCase(__.first(dbResponse), "user_");
  },
  check: async ({ email, password }) => {
    const dbResponse = await pg
      .select("*")
      .from("users")
      .where(
        objectFilter({
          user_email: email,
        })
      );

    const { user_password: passwordHash } = __.first(dbResponse);

    const match = await bcrypt.compare(password, passwordHash);

    if (match) {
      return objectKeysToCamelCase(__.first(dbResponse), "user_");
    }

    throw new ValidationError("Invalid password!");
  },

  get: async (uid) => {
    if (!__.isUndefined(uid)) {
      const dbResponse = await pg
        .select("*")
        .from("users")
        .where(
          objectFilter({
            user_uid: uid,
          })
        )
        .first();

      if (__.isEmpty(dbResponse)) {
        throw new ApolloError("User does not exist!", "NO_DATA");
      }
      return objectKeysToCamelCase(dbResponse, "user_");
    }
    const dbResponse = await pg.select("*").from("users");

    return dbResponse.map((data) => objectKeysToCamelCase(data, "user_"));
  },

  delete: (uid) => {
    const dbResponse = pg("users")
      .where({ user_uid: uid })
      .del()
      .returning("*");
    return objectKeysToCamelCase(__.first(dbResponse), "user_");
  },
=======
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

        try {
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
        } catch (error) {
          console.log(error);

          let errorCode = "";

          switch (error.code) {
            case "23505":
              errorCode = "ALREADY_EXIST_EMAIL";
              break;
          }

          throw new ApolloError(error.detail, errorCode);
        }
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
      const dbResponse = await knex
        .select("*")
        .from("users")
        .where(objectFilter({ user_uid: uid }))
        .leftJoin("doctors", "doctor_uid", "user_uid")
        .leftJoin("patients", "patient_uid", "user_uid");

      const data = dbResponse.map((data) => ({
        ...user().fromDb(data),
        ...doctor().fromDb(data),
        ...patient().fromDb(data),
      }));

      return data;
    },

    delete: async (uid) => {
      const dbResponse = await knex("users")
        .where({ user_uid: uid })
        .del()
        .returning("*");
      return user().fromDb(dbResponse);
    },
  };
>>>>>>> Stashed changes
};

export default user;
