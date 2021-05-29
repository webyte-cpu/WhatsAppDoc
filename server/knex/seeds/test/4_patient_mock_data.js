const seed = function(knex) {
  // Deletes ALL existing entries
  return knex('patients')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('patients').insert([
        {
          patient_uid: "7c03f38f-ab4f-4605-a274-706e4d8c8d6a",
          patient_contact_number: "09381116730",
          patient_weight: 53,
          patient_height: 165,
          patient_nationality: "Filipino",
          patient_civil_status: "SINGLE"
        },
        // {
        //   patient_uid: "5abc5f31-74df-437a-9cbf-c2bd5cbb0f1a",
        //   patient_contact_number: "09363281150",
        //   patient_weight: 36,
        //   patient_height: 150,
        //   patient_nationality: "Filipino",
        //   patient_civil_status: "SINGLE"
        // }
      ]);
    });
};

export { seed };
