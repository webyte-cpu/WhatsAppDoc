const seed = function (knex) {
  return knex('doctor_specializations')
    .then(function () {
      return knex('doctor_specializations').insert([
        {
          doctor_specialization_uid: 'c63392a0-4b46-4f44-9d7a-6a8373cb0a41',
          doctor_uid: '0353121f-eeed-4687-8676-f788d3e9c8e6',
          specialization_uid: '8b6ce0a5-6714-4e6c-b926-3c0bf2b3d801',
        },
        {
          doctor_specialization_uid: '87124197-fda4-4d70-b19d-7f5b6982bc37',
          doctor_uid: '3a238cae-f2af-4d4b-bb34-252215b5272e',
          specialization_uid: 'ea0d0824-0f36-492d-a954-04a4f1a700a1',
        },
        {
          doctor_specialization_uid: 'fc9df8f3-deee-4b90-a9be-6d4e4e8d77e1',
          doctor_uid: '0a1bcc04-a748-4669-a4c2-fced1bccc0b2',
          specialization_uid: '266199f0-e342-45d2-9de3-633a80d2e4b5',
        },
        {
          doctor_specialization_uid: '78ee87aa-8256-4124-9ca4-87fa13f8f7ec',
          doctor_uid: '31e7e881-4b37-4cee-80f9-4ab32a25773d',
          specialization_uid: 'b129c715-4073-4f95-b0a6-da7830da91f8',
        },
        {
          doctor_specialization_uid: '306d88af-68ab-4a72-bdf5-28e9716cf2a5',
          doctor_uid: '0e890190-1559-4edd-a0f5-3c61073fe576', 
          specialization_uid: 'ea0d0824-0f36-492d-a954-04a4f1a700a1',
        },
        {
          doctor_specialization_uid: 'be8b6e6e-cba7-466c-81d9-d50510195619',
          doctor_uid: '0e890190-1559-4edd-a0f5-3c61073fe576',
          specialization_uid: '8b6ce0a5-6714-4e6c-b926-3c0bf2b3d801',
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