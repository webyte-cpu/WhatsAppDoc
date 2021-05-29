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
    ]);
  });
};

export { seed };
