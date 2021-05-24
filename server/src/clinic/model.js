import objectFilter from "../helpers/objectFilter.js";
import { ApolloError } from "apollo-server-errors";
import address from "../address/model.js";
import { v4 as uuidV4 } from "uuid";
import pg from "../../db/index.js";
import __ from "lodash";

const fromDb = (clinicData) => ({
  uid: clinicData.clinic_uid,
  doctorClinicUid: clinicData.doctor_clinic_uid,
  addressUid: clinicData.address_uid,
  name: clinicData.clinic_name,
  roomNumber: clinicData.clinic_room_no,
  consultationFee: clinicData.consultation_fee,
  slotDurationInMins: clinicData.slot_duration_in_mins,
  minimumSchedulingNoticeMins: clinicData.minimum_scheduling_notice_mins,
});
const toDb = (clinicData) => ({
  clinic_uid: clinicData.uid,
  clinic_name: clinicData.name,
  doctor_uid: clinicData.doctorUid,
  clinic_room_no: clinicData.roomNumber,
  consultation_fee: clinicData.consultationFee,
  slot_duration_in_mins: clinicData.slotDurationInMins,
  minimum_scheduling_notice_mins: clinicData.minimumSchedulingNoticeMins,
});

const create = async (clinicData, knex = pg) =>
  knex.transaction(async (trx) => {
    const response = {};
    const clinicUid = uuidV4();
    const addressUid = uuidV4();
    const doctorClinicUid = uuidV4();
    const addressData = clinicData.address;

    addressData.uid = addressUid;
    response.address = await address.create(addressData, trx);

    const {
      doctor_uid,
      clinic_name,
      clinic_room_no,
      consultation_fee,
      slot_duration_in_mins,
      minimum_scheduling_notice_mins,
    } = toDb(clinicData);

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

    response.clinic = fromDb({
      ...__.first(response.clinicRawData),
      ...__.first(response.doctorClinicRawData),
    });

    response.clinic.address = response.address;
    return response.clinic;
  });
const update = (clinicData, knex = pg) =>
  knex.transaction(async (trx) => {
    try {
      const response = {};

      const {
        clinic_uid,
        clinic_name,
        clinic_room_no,
        consultation_fee,
        slot_duration_in_mins,
        minimum_scheduling_notice_mins,
      } = toDb(clinicData);

      const addressData = clinicData.address;

      if (!__.isUndefined(addressData)) {
        response.address = await address.update(addressData, trx);
      }

      if (clinic_name || clinic_room_no) {
        response.clinicRawData = await trx("clinics")
          .where({ clinic_uid })
          .update(objectFilter({ clinic_name, clinic_room_no }))
          .returning("*");
      }

      if (
        consultation_fee ||
        slot_duration_in_mins ||
        minimum_scheduling_notice_mins
      ) {
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
      }

      response.clinic = fromDb({
        ...__.first(response.clinicRawData),
        ...__.first(response.doctorClinicRawData),
      });

      response.clinic.address = response.address;
      
      return response.clinic;
    } catch (error) {
      console.log(error);
      throw new ApolloError(error.detail);
    }
  });
const get = async ({ uid, doctorUid }, knex = pg) => {
  const dbResponse = await knex
    .select("*")
    .from("clinics")
    .where(objectFilter({ "clinics.clinic_uid": uid, doctor_uid: doctorUid }))
    .innerJoin(
      "doctor_clinics",
      "doctor_clinics.clinic_uid",
      "clinics.clinic_uid"
    );

  return dbResponse.map(fromDb);
};
const remove = async (uid, knex = pg) =>
  knex.transaction(async (trx) => {
    const getClinicResponse = __.first(await get({ uid }, trx));

    if (__.isUndefined(getClinicResponse))
      throw new ApolloError(
        "Clinic does not exist or has been removed.",
        "DOES_NOT_EXIST"
      );

    const { addressUid } = getClinicResponse;

    const response = {
      doctorClinicRawData: await trx("doctor_clinics")
        .where({ clinic_uid: uid })
        .del()
        .returning("*"),
      clinicRawData: await trx("clinics")
        .where({ clinic_uid: uid })
        .del()
        .returning("*"),
      address: await address.remove(addressUid, trx),
    };


    response.clinic = fromDb({
      ...__.first(response.clinicRawData),
      ...__.first(response.doctorClinicRawData),
    });

    response.clinic.address = response.address;    
    return response.clinic;
  });

const upsert = async (clinicData, knex = pg) =>
  knex.transaction(async (trx) => {
    try {
      if (clinicData.uid == null ||clinicData.doctorClinicUid == null ) {
        const createClinicResponse = await create(clinicData, trx);
        // return createClinicResponse;
        return {uid: createClinicResponse.uid, doctorClinicUid: createClinicResponse.doctorClinicUid}
      }

      const updateClinicResponse = await update(clinicData, trx);   
      // return updateClinicResponse;
      return {uid: clinicData.uid, doctorClinicUid: clinicData.doctorClinicUid}
    } catch (error) {
      throw new ApolloError(error);
    }
  });

export default { create, update, get, remove, upsert };
