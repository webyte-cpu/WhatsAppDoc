const seed = function (knex) {
  // Deletes ALL existing entries
  return knex('clinics')
    // .del()
    .then(function () {
      // Inserts seed entries
      return knex('clinics').insert([
        {
          clinic_uid: '027ae0ac-05d6-43bf-818e-a76607b7f976',
          address_uid: '0afdaddf-536e-4b67-8617-52783e64f6b5',
          clinic_name: 'Test Clinic',
          // roomNumber: '3',
          // address: "Iloilo City",
          // minimumSchedulingNoticeMins: 4,
          // slotDurationInMins: 3,
          // consultationFee: 500
          clinic_room_no: '3'
        },
        {
          clinic_uid: 'f9609c66-d0a1-48c6-b8bd-3a1a975986d4',
          address_uid: 'd88e25f9-75fc-463b-8c06-4edb67195a6b',
          clinic_name: 'Test Clinic',
          // roomNumber: '5',
          // address: "Iloilo City",
          // minimumSchedulingNoticeMins: 4,
          // slotDurationInMins: 3,
          // consultationFee: 500
          clinic_room_no: '5'
        },
      ]);
    });
};

export { seed }