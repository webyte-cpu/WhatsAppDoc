const seed = function (knex) {
  // Deletes ALL existing entries
  return knex('clinics')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('clinics').insert([
        {
          clinic_uid: '027ae0ac-05d6-43bf-818e-a76607b7f976',
          address_uid: '0afdaddf-536e-4b67-8617-52783e64f6b5',
          clinic_name: 'Dr. Kub - Iloilo Doctor\'s Hospital',
          clinic_room_no: '204 A'
        },
        {
          clinic_uid: 'f9609c66-d0a1-48c6-b8bd-3a1a975986d4',
          address_uid: 'd88e25f9-75fc-463b-8c06-4edb67195a6b',
          clinic_name: 'Dr. Bruen - Capiz Doctor\'s Hospital',
          clinic_room_no: '104'
        },
        {
          clinic_uid: '6eca6134-f369-4278-86d5-1b3a10fea42e',
          address_uid: 'd3cf6e43-27a6-4c28-9391-3e3241de001a',
          clinic_name: 'Dr. Beier - Iloilo Doctor\'s Hospital',
          clinic_room_no: '301 B'
        },
        {
          clinic_uid: "9a7c8d91-f9d8-4274-a8b9-f2e56ce591f7",
          address_uid: '1f4d7877-a507-4604-bb18-8f5b6f297a6d',
          clinic_name: 'Dr. Altenwerth - QualiMed Iloilo',
          clinic_room_no: 'RM 403'
        }, {
          clinic_uid: "c27efa99-f36d-4c6f-a329-d8b4812eebf5",
          address_uid: '9d204c76-6a1e-4527-adc7-dfe5f064ecd0',
          clinic_name: 'Dr. Marvin - QualiMed Iloilo',
          clinic_room_no: 'RM 302'
        }, {
          clinic_uid: "56e6a589-3396-4446-80b5-7bca98ffc9b8",
          address_uid: '30a59269-ebf2-4f79-b598-1cb1b3f4625c',
          clinic_name: 'Dr. Marvin - Medicus',
          clinic_room_no: '101'
        }, {
          clinic_uid: "68eff1c0-7a78-40a0-9507-56eba49cf6f6",
          address_uid: 'eee7a936-7dcb-4050-9767-41f1c193b11e',
          clinic_name: 'Dr. Kub - Medicus',
          clinic_room_no: '102'
        }, {
          clinic_uid: "52066acc-6225-4723-9b2d-6b52e3877a24",
          address_uid: '72af9a21-404f-4c53-a6e9-a107229fb4f3',
          clinic_name: 'Dr. Bruen\'s Express Clinic',
          clinic_room_no: ''
        }, {
          clinic_uid: "d2a19e4e-9101-4628-b846-f457cca780c5",
          address_uid: '5a3b5078-7c27-43a0-8f6f-f09da3bba99a',
          clinic_name: 'Dr. Altenwerth - Mission Hospital',
          clinic_room_no: 'RM 121'
        }
      ]);
    });
};

export { seed }

