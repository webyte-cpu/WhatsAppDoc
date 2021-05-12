const seed = function (knex) {
  // Deletes ALL existing entries
  return knex('clinic')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('clinic').insert([
        {
          uid: '027ae0ac-05d6-43bf-818e-a76607b7f976',
          doctorClinicUid: '0afdaddf-536e-4b67-8617-52783e64f6b5',
          name: 'Test Clinic',
          roomNumber: '3',
          address: "Iloilo City",
          minimumSchedulingNoticeMins: 4,
          slotDurationInMins: 3,
          consultationFee: 500
        },
        {
          uid: 'f9609c66-d0a1-48c6-b8bd-3a1a975986d4',
          doctorClinicUid: 'd88e25f9-75fc-463b-8c06-4edb67195a6b',
          name: 'Test Clinic',
          roomNumber: '5',
          address: "Iloilo City",
          minimumSchedulingNoticeMins: 4,
          slotDurationInMins: 3,
          consultationFee: 500
        },
      ]);
    });
};

export { seed }