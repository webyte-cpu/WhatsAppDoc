const seed = function (knex) {
  // Deletes ALL existing entries
  return knex('specializations')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('specializations').insert([
      {
        specialization_uid: '266199f0-e342-45d2-9de3-633a80d2e4b5',
        specialization_title: 'Dentist'
      },
      {
        specialization_uid: 'ea0d0824-0f36-492d-a954-04a4f1a700a1',
        specialization_title: 'General Physician'
      },
      {
        specialization_uid: '8b6ce0a5-6714-4e6c-b926-3c0bf2b3d801',
        specialization_title: 'Cardio-respiratory'
      },
      {
        specialization_uid: 'b129c715-4073-4f95-b0a6-da7830da91f8',
        specialization_title: 'Obgyne'
      }
      ]);
    });
};

export { seed }