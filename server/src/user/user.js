import { ApolloError, UserInputError } from "apollo-server-errors";
import specialization from "../specialization/specialization.js";
import objectFilter from "../helpers/objectFilter.js";
import enums from "../helpers/enums/enums.js";
import { v4 as uuidV4 } from "uuid";
import pg from "../../db/index.js";
import bcrypt from "bcrypt";
import __ from "lodash";

export default (knex = pg) => {
  const fromDb = (userData) => ({
    uid: userData.user_uid,
    firstName: userData.user_first_name,
    middleName: userData.user_middle_name,
    lastName: userData.user_last_name,
    email: userData.user_email,
    password: userData.user_password,
    birthdate: userData.user_birthdate,
    sex: userData.user_sex,
    address: userData.address,
    role: userData.user_role,
    img: userData.user_img,
    createdAt: userData.created_at,
    updatedAt: userData.updated_at,
  });

  const toDb = (userData) => ({
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
  });

  const signUp = async (userData) => {
    return knex.transaction(async (trx) => {
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
        response.user = await create(userData);
        const patientRawData = await trx
          .insert({
            patient_uid: userData.uid,
            patient_contact_number: userData.contactNumber,
            patient_weight: userData.weight,
            patient_height: userData.height,
            patient_nationality: userData.nationality,
            patient_civil_status: userData.civilStatus,
          })
          .into("patients")
          .returning("*")
          .first();

        response.patient = {
          uid: patientRawData.patient_uid,
          contactNumber: patientRawData.patient_contact_number,
          weight: patientRawData.patient_weight,
          height: patientRawData.patient_height,
          nationality: patientRawData.patient_nationality,
          civilStatus: patientRawData.patient_civil_status,
        };

        if (userData.role === enums.role.DOCTOR) {
          const doctorData = userData.doctor;
          doctorData.uid = userData.uid;
          const doctorRawData = await trx
            .insert(
              objectFilter({
                doctor_uid: doctorData.uid,
                doctor_licence_num: doctorData.licenceNum,
                doctor_licence_img: doctorData.licenceImg,
                doctor_licence_exp: doctorData.licenceExp,
                doctor_verification_status: doctorData.verificationStatus,
                doctor_experience: doctorData.experience,
                doctor_about: doctorData.about,
                doctor_educational: doctorData.educational,
                doctor_rating: doctorData.rating,
              })
            )
            .into("doctors")
            .returning("*")
            .first();

          response.doctor = {
            uid: doctorRawData.doctor_uid,
            licenceNum: doctorRawData.doctor_licence_num,
            licenceImg: doctorRawData?.doctor_licence_img,
            licenceExp: doctorRawData.doctor_licence_exp,
            verificationStatus: doctorRawData.doctor_verification_status,
            experience: doctorRawData.doctor_experience,
            about: doctorRawData.doctor_about,
            educational: doctorRawData.doctor_educational,
            rating: doctorRawData.doctor_rating,
          };

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
  };

  const find = async (object) =>
    knex.transaction(async (trx) => {
      const dbResponse = await trx
        .select("*")
        .from("users")
        .where(objectFilter(toDb(object)))
        .leftJoin("doctors", "doctor_uid", "user_uid")
        .leftJoin("patients", "patient_uid", "user_uid");

      const data = dbResponse.map((data) => ({
        ...fromDb(data),
        ...{
          uid: data.doctor_uid,
          licenceNum: data.doctor_licence_num,
          licenceImg: data?.doctor_licence_img,
          licenceExp: data.doctor_licence_exp,
          verificationStatus: data.doctor_verification_status,
          experience: data.doctor_experience,
          about: data.doctor_about,
          educational: data.doctor_educational,
          rating: data.doctor_rating,
        },
        ...{
          uid: data.patient_uid,
          contactNumber: data.patient_contact_number,
          weight: data.patient_weight,
          height: data.patient_height,
          nationality: data.patient_nationality,
          civilStatus: data.patient_civil_status,
        },
      }));

      return data;
    });

  const create = async (userData) => {
    userData.uid = userData.uid || uuidV4();
    const dbResponse = await knex
      .insert(objectFilter(toDb(userData)))
      .into("users")
      .returning("*");

    return fromDb(__.first(dbResponse));
  };

  const update = async (userData) => {
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

    return fromDb(__.first(dbResponse));
  };

  const check = async ({ email, password }) => {
    const dbResponse = await find({ email });
    const userData = dbResponse[0];

    if (!__.isUndefined(userData)) {
      const match = await bcrypt.compare(password, userData?.password);
      delete userData.password;
      if (match) return userData;
    }

    throw new ApolloError("Invalid Email or Password.", "VALIDATION_ERROR");
  };

  const get = async (uid) => {
    const dbResponse = await knex
      .select("*")
      .from("users")
      .where(objectFilter({ user_uid: uid }))
      .leftJoin("doctors", "doctor_uid", "user_uid")
      .leftJoin("patients", "patient_uid", "user_uid");

    const data = dbResponse.map((data) => ({
      ...fromDb(data),
      ...{
        uid: data.doctor_uid,
        licenceNum: data.doctor_licence_num,
        licenceImg: data?.doctor_licence_img,
        licenceExp: data.doctor_licence_exp,
        verificationStatus: data.doctor_verification_status,
        experience: data.doctor_experience,
        about: data.doctor_about,
        educational: data.doctor_educational,
        rating: data.doctor_rating,
      },
      ...{
        uid: data.patient_uid,
        contactNumber: data.patient_contact_number,
        weight: data.patient_weight,
        height: data.patient_height,
        nationality: data.patient_nationality,
        civilStatus: data.patient_civil_status,
      },
    }));

    return data;
  };

  const remove = async (uid) => {
    const dbResponse = await knex("users")
      .where({ user_uid: uid })
      .del()
      .returning("*");
    return fromDb(dbResponse);
  };

  return { fromDb, toDb, signUp, create, get, check, remove, update };
};
