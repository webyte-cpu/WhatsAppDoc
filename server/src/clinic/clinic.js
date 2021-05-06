import objectFilter from "../helpers/objectFilter.js";
import address from "../address/address.js";
import { v4 as uuidV4 } from "uuid";
import pg from "../../db/index.js";
import __ from "lodash";

const clinic = (knex = pg) => ({
  knex,
  fromDb: (clinicData) => ({
    uid: clinicData.clinic_uid,
    addressUid: clinicData.address_uid,
    name: clinicData.clinic_name,
    roomNumber: clinicData.clinic_room_no,
    consultationFee: clinicData.consultation_fee,
    slotDurationInMins: clinicData.slot_duration_in_mins,
    minimumSchedulingNoticeMins: clinicData.minimum_scheduling_notice_mins,
  }),
  toDb: (clinicData) => ({
    clinic_uid: clinicData.uid,
    clinic_name: clinicData.name,
    doctor_uid: clinicData.doctorUid,
    clinic_room_no: clinicData.roomNumber,
    consultation_fee: clinicData.consultationFee,
    slot_duration_in_mins: clinicData.slotDurationInMins,
    minimum_scheduling_notice_mins: clinicData.minimumSchedulingNoticeMins,
  }),
  create: async (clinicData) =>
    knex.transaction(async (trx) => {
      const response = {};
      const clinicUid = uuidV4();
      const addressUid = uuidV4();
      const doctorClinicUid = uuidV4();
      const addressData = clinicData.address;

      addressData.uid = addressUid;
      response.address = await address(trx).create(addressData);

      const {
        doctor_uid,
        clinic_name,
        clinic_room_no,
        consultation_fee,
        slot_duration_in_mins,
        minimum_scheduling_notice_mins,
      } = clinic().toDb(clinicData);

      response.clinicRawData = await trx
        .insert({
          clinic_name,
          clinic_room_no,
          clinic_uid: clinicUid,
          address_uid: addressUid,
        })
        .into("clinics")
        .returning("*");

      response.doctorClinicRawData = await trx
        .insert({
          doctor_uid,
          consultation_fee,
          slot_duration_in_mins,
          clinic_uid: clinicUid,
          minimum_scheduling_notice_mins,
          doctor_clinic_uid: doctorClinicUid,
        })
        .into("doctor_clinics")
        .returning("*");

      response.clinic = clinic().fromDb({
        ...__.first(response.clinicRawData),
        ...__.first(response.doctorClinicRawData),
      });

      response.clinic.address = response.address;

      return response.clinic;
    }),
  update: (clinicData) =>
    knex.transaction(async (trx) => {
      const response = {};

      const {
        clinic_uid,
        clinic_name,
        clinic_room_no,
        consultation_fee,
        slot_duration_in_mins,
        minimum_scheduling_notice_mins,
      } = clinic().toDb(clinicData);

      const addressData = clinicData.address;

      if (!__.isUndefined(addressData))
        response.address = await address(trx).update(addressData);

      if (clinic_name || clinic_room_no)
        response.clinicRawData = await trx("clinics")
          .where({ clinic_uid })
          .update(objectFilter({ clinic_name, clinic_room_no }))
          .returning("*");
      if (
        consultation_fee ||
        slot_duration_in_mins ||
        minimum_scheduling_notice_mins
      )
        response.doctorClinicRawData = await trx("doctor_clinics")
          .where({ clinic_uid })
          .update(
            objectFilter({
              consultation_fee,
              slot_duration_in_mins,
              minimum_scheduling_notice_mins,
            })
          )
          .returning("*");

      response.clinic = clinic().fromDb({
        ...__.first(response.clinicRawData),
        ...__.first(response.doctorClinicRawData),
      });

      response.clinic.address = response.address;
      return response.clinic;
    }),
  get: async ({ uid, doctorUid }) => {
    const dbResponse = await knex
      .select("*")
      .from("clinics")
      .where(objectFilter({ clinic_uid: uid, doctor_uid: doctorUid }))
      .innerJoin(
        "doctor_clinics",
        "doctor_clinics.clinic_uid",
        "clinics.clinic_uid"
      );
 //   console.log(dbResponse.map(clinic().fromDb));
    return dbResponse.map(clinic().fromDb);
  },
  remove: async (userUid) => {
    return await pg("doctors").where({ user_uid: userUid }).del();
  },
});

export default clinic;
