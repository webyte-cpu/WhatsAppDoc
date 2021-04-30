const seed = function (knex) {
  // Deletes ALL existing entries
  return knex('doctors')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('doctors').insert([
        {
          doctor_uid: 'df5c43b9-37e5-4af5-bc9e-a7484607d8ff',
          doctor_licence_num: '1234567',
          doctor_verification_status: 'PENDING',
          doctor_licence_img:
            'http://newstogov.com/wp-content/uploads/2019/10/prc1.jpg',
          doctor_licence_exp: '2022-10-28',
        },
        {
          doctor_uid: '5f2192b0-0e3a-4c77-9593-33f3f27ec441',
          doctor_licence_num: '0483958',
          doctor_verification_status: 'PENDING',
          doctor_licence_img:
            'http://newstogov.com/wp-content/uploads/2019/10/prc1.jpg',
          doctor_licence_exp: '2021-12-12',
        },
        {
          doctor_uid: '405e9a6c-ed50-448b-b8c8-a769edab51f4',
          doctor_licence_num: '5844731',
          doctor_verification_status: 'PENDING',
          doctor_licence_img:
            'http://newstogov.com/wp-content/uploads/2019/10/prc1.jpg',
          doctor_licence_exp: '2023-01-09',
        },
        {
          doctor_uid: '67b769a5-25e7-4da4-b9b6-28435e4a06ea',
          doctor_licence_num: '1206496',
          doctor_verification_status: 'PENDING',
          doctor_licence_img:
            'http://newstogov.com/wp-content/uploads/2019/10/prc1.jpg',
          doctor_licence_exp: '2022-05-09',
        },
      ]);
    });
};

export { seed }