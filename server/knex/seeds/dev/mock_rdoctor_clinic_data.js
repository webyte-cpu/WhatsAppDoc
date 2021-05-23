const seed = function(knex) {
  // Deletes ALL existing entries
  return knex('doctor_clinics')
    // .del()
    .then(function () {
      // Inserts seed entries
      return knex('doctor_clinics').insert([
        {
          doctor_clinic_uid: "031241ef-e400-453d-561e-563190fe45a1",
          doctor_uid: "0353121f-eeed-4687-8676-f788d3e9c8e6",
          clinic_uid: "027ae0ac-05d6-43bf-818e-a76607b7f976",
          minimum_scheduling_notice_mins: 5,
          slot_duration_in_mins: 4,
          consultation_fee: 500,
        }
      ]);
    });
};

export { seed };