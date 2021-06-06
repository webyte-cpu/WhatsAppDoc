const seed = function (knex) {
  return knex('doctors')
    .then(function () {
      return knex('doctors').insert([
        {
          doctor_uid: '0353121f-eeed-4687-8676-f788d3e9c8e6',
          doctor_licence_num: '1234567',
          doctor_verification_status: 'PENDING',
          doctor_licence_img:
            'http://newstogov.com/wp-content/uploads/2019/10/prc1.jpg',
          doctor_licence_exp: '2022-10-28',
        },
        {
          doctor_uid: '3a238cae-f2af-4d4b-bb34-252215b5272e',
          doctor_licence_num: '0483958',
          doctor_verification_status: 'UNVERIFIED',
          doctor_licence_img:
            'http://newstogov.com/wp-content/uploads/2019/10/prc1.jpg',
          doctor_licence_exp: '2021-12-12',
        },
        {
          doctor_uid: '0a1bcc04-a748-4669-a4c2-fced1bccc0b2',
          doctor_licence_num: '5844731',
          doctor_verification_status: 'VERIFIED',
          doctor_licence_img:
            'http://newstogov.com/wp-content/uploads/2019/10/prc1.jpg',
          doctor_licence_exp: '2023-01-09',
        },
        {
          doctor_uid: '31e7e881-4b37-4cee-80f9-4ab32a25773d',
          doctor_licence_num: '1206496',
          doctor_verification_status: 'DECLINED',
          doctor_licence_img:
            'http://newstogov.com/wp-content/uploads/2019/10/prc1.jpg',
          doctor_licence_exp: '2025-01-09',
        },
        {
          doctor_uid: '0e890190-1559-4edd-a0f5-3c61073fe576',
          doctor_licence_num: '6423463',
          doctor_verification_status: 'VERIFIED',
          doctor_licence_img:
            'http://newstogov.com/wp-content/uploads/2019/10/prc1.jpg',
          doctor_licence_exp: '2022-05-09',
        },
      ]);
    });
};

export { seed }

/*
doctor_uid: '0353121f-eeed-4687-8676-f788d3e9c8e6',
Raw login: Email: Billie97@yahoo.com Pass: guG3Xxq9j4_GqQ2! Role: DOCTOR

doctor_uid: '3a238cae-f2af-4d4b-bb34-252215b5272e',
Raw login: Email: Lupe_Predovic7@hotmail.com Pass: PH5tn3BTyAImgcJ! Role: DOCTOR

doctor_uid: '0a1bcc04-a748-4669-a4c2-fced1bccc0b2',
Raw login: Email: Ewell39@gmail.com Pass: 0vW1bClFkkrRB1x! Role: DOCTOR 

doctor_uid: '31e7e881-4b37-4cee-80f9-4ab32a25773d',
Raw login: Email: Taylor_Ankunding@hotmail.com Pass: UyJa8ZTEBNtOg6r! Role: DOCTOR

doctor_uid: '0e890190-1559-4edd-a0f5-3c61073fe576',
Raw login: Email: Krystina.Turner17@hotmail.com Pass: gT_Lyjv8iMkJBls! Role: DOCTOR
*/