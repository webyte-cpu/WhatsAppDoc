import { ApolloError, UserInputError } from "apollo-server-errors";
import specialization from "../specialization/model.js";
import enums from "../helpers/enums/enums.js";
import patient from "../patient/model.js";
import doctor from "../doctor/model.js";
import { v4 as uuidV4 } from "uuid";
import pg from "../../db/index.js";
import user from "../user/model.js";
import bcrypt from "bcrypt";
import __ from "lodash";

export default async (userData) => {
  return pg.transaction(async (trx) => {
    const response = {};
    const saltRounds = 10;
    const passwordFormat =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/g;
    const isValid = passwordFormat.test(userData.password);

    if (!isValid) {
      throw new ApolloError(
        `Password format is not valid; Password must be 8 or more characters long and contain at least one of the following:
                  number, uppercase letter, lowercase letter, and symbol.`,
        "INVALID_PASSWORD"
      );
    }

    const hashedPassword = bcrypt.hashSync(userData.password, saltRounds);

    userData.uid = uuidV4();
    userData.createdAt = new Date(Date.now());
    userData.password = hashedPassword;

    try {
      response.user = await user.create(userData, trx);
      response.patient = await patient.create(userData, trx);

      if (userData.role === enums.role.DOCTOR) {
        if (__.isEmpty(userData.doctor)) {
          throw new ApolloError(
            "Missing required doctor field",
            "MISSING_FIELD"
          );
        }

        const doctorData = userData.doctor;
        doctorData.uid = userData.uid;
        response.doctor = await doctor.create(doctorData, trx);

        if (__.isEmpty(doctorData.specialization)) {
          throw new ApolloError(
            "Doctor should have atleast one specialization.",
            "MISSING_FIELD"
          );
        }

        response.doctor.specialization = await specialization.assign(
          {
            titles: doctorData.specialization,
            userUid: doctorData.uid,
          },
          trx
        );
      }

      delete response.user.password;
      return { ...response.user, ...response.patient, ...response.doctor };
    } catch (error) {
      // console.log(error);

      // let errorCode =  error;

      // switch (error.code) {
      //   case "23505":
      //     errorCode = "ALREADY_EXIST_EMAIL";
      //     break;
      // }

      throw error;
    }
  });
};
