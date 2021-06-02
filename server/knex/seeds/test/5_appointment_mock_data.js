const seed = function(knex) {
  // Deletes ALL existing entries
  return knex('appointments')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('appointments').insert([
        {
          appointments_uid: "1239e82b-b4ea-4e73-8861-df2ff69fac82",
          patient_uid: "7c03f38f-ab4f-4605-a274-706e4d8c8d6a",
          doctor_clinic_uid: "0afdaddf-536e-4b67-8617-52783e64f6b5",
          appointment_status: "PENDING",
          appointment_timestamp: "2021-05-26T11:30:10Z",
          appointment_doctor_remarks: "test remarks" 
        }, 
        {
          appointments_uid: "f621fddb-8b13-4c58-93d7-3159a99c06bc",
          patient_uid: "7c03f38f-ab4f-4605-a274-706e4d8c8d6a",
          doctor_clinic_uid: "0353121f-eeed-4687-8676-f788d3e9c8e6",
          appointment_status: "PENDING",
          appointment_timestamp: "2021-11-21 11:00:00-07",
          appointment_doctor_remarks: "test remarks"
        }
      ]);
    });
};

export { seed };
