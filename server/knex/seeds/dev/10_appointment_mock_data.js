const seed = function(knex) {
  // Deletes ALL existing entries
  return knex('appointments')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('appointments').insert([
        {
          appointments_uid: "1239e82b-b4ea-4e73-8861-df2ff69fac82",
          patient_uid: "31e7e881-4b37-4cee-80f9-4ab32a25773d",
          doctor_clinic_uid: "740424a7-4e39-426f-aa53-65cf3e31609d",
          appointment_status: "PENDING",
          appointment_timestamp: "2021-05-26T11:30:10Z",
          appointment_doctor_remarks: "test remarks" 
        }, 
        {
          appointments_uid: "f621fddb-8b13-4c58-93d7-3159a99c06bc",
          patient_uid: "7fc392c3-cd94-40ec-bd53-81de4aa8f8cf",
          doctor_clinic_uid: "6ecaae63-1196-4e48-818d-0266dbed39e2",
          appointment_status: "PENDING",
          appointment_timestamp: "2021-11-21 11:00:00-07",
          appointment_doctor_remarks: "test remarks"
        }
      ]);
    });
};

export { seed };
