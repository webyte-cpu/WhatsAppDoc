const seed = function (knex) {
  // Deletes ALL existing entries
  return knex.transaction(async (trx) => {
    // CLINIC
    await trx("clinics").del();
    await trx("clinics").insert([
      {
        clinic_uid: "027ae0ac-05d6-43bf-818e-a76607b7f976",
        address_uid: "5f9cf4f8-d8d9-4fb2-bdf2-b0f341a98048",
        clinic_name: "Webyte Test Clinic",
        clinic_room_no: "21",
      },
      {
        clinic_uid: '6eca6134-f369-4278-86d5-1b3a10fea42e',
        address_uid: 'a9d6a29a-ae61-43c8-80f3-11a584cc1270',
        clinic_name: 'Test Clinic',
        clinic_room_no: '6'
      }
    ]);

    // DOCTOR_CLINIC
    await trx("doctor_clinics").del();
    await trx("doctor_clinics").insert([
      {
        doctor_clinic_uid: "0afdaddf-536e-4b67-8617-52783e64f6b5",
        doctor_uid: "0353121f-eeed-4687-8676-f788d3e9c8e6",
        clinic_uid: "027ae0ac-05d6-43bf-818e-a76607b7f976",
        minimum_scheduling_notice_mins: 4,
        slot_duration_in_mins: 3,
        consultation_fee: 500,
      },

      {
        doctor_clinic_uid: "0353121f-eeed-4687-8676-f788d3e9c8e6",
        doctor_uid: "0353121f-eeed-4687-8676-f788d3e9c8e6",
        clinic_uid: "027ae0ac-05d6-43bf-818e-a76607b7f976",
        minimum_scheduling_notice_mins: 4,
        slot_duration_in_mins: 3,
        consultation_fee: 500,
      },

      {
        doctor_clinic_uid: "ab492a42-1738-4e2b-8404-8b75ad62b9d7",
        doctor_uid: "0353121f-eeed-4687-8676-f788d3e9c8e6",
        clinic_uid: "6eca6134-f369-4278-86d5-1b3a10fea42e",
        minimum_scheduling_notice_mins: 3,
        slot_duration_in_mins: 4,
        consultation_fee: 1000,
      }
    ]);
  });
};

export { seed };
