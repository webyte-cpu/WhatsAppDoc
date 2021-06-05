const seed = function(knex) {
  // Deletes ALL existing entries
  return knex('doctor_clinics')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('doctor_clinics').insert([{
        doctor_clinic_uid: "fd8f98e9-a0e6-4313-a908-5cc81885afc8",
        clinic_uid: '027ae0ac-05d6-43bf-818e-a76607b7f976',
        doctor_uid: '0353121f-eeed-4687-8676-f788d3e9c8e6',
        minimum_scheduling_notice_mins: 161,
        slot_duration_in_mins: 30,
        consultation_fee: 650.25
      }, {
        doctor_clinic_uid: "740424a7-4e39-426f-aa53-65cf3e31609d",
        clinic_uid: '68eff1c0-7a78-40a0-9507-56eba49cf6f6',
        doctor_uid: '0353121f-eeed-4687-8676-f788d3e9c8e6',
        minimum_scheduling_notice_mins: 115,
        slot_duration_in_mins: 45,
        consultation_fee: 735
      }, {
        doctor_clinic_uid: "6ecaae63-1196-4e48-818d-0266dbed39e2",
        clinic_uid: 'f9609c66-d0a1-48c6-b8bd-3a1a975986d4',
        doctor_uid: '3a238cae-f2af-4d4b-bb34-252215b5272e',
        minimum_scheduling_notice_mins: 161,
        slot_duration_in_mins: 15,
        consultation_fee: 700
      }, {
        doctor_clinic_uid: "c69b6ead-b180-42a8-b0af-a78b69114757",
        clinic_uid: '52066acc-6225-4723-9b2d-6b52e3877a24',
        doctor_uid: '3a238cae-f2af-4d4b-bb34-252215b5272e',
        minimum_scheduling_notice_mins: 54,
        slot_duration_in_mins: 90,
        consultation_fee: 600
      }, {
        doctor_clinic_uid: "5cb1a5aa-f8b3-424b-a3b1-7c527002b6d1",
        clinic_uid: '6eca6134-f369-4278-86d5-1b3a10fea42e',
        doctor_uid: '0a1bcc04-a748-4669-a4c2-fced1bccc0b2',
        minimum_scheduling_notice_mins: 73,
        slot_duration_in_mins: 60,
        consultation_fee: 450
      }, {
        doctor_clinic_uid: "c28eb6c7-4792-4668-9650-26c3a0d380d8",
        clinic_uid: '9a7c8d91-f9d8-4274-a8b9-f2e56ce591f7',
        doctor_uid: '31e7e881-4b37-4cee-80f9-4ab32a25773d',
        minimum_scheduling_notice_mins: 48,
        slot_duration_in_mins: 108,
        consultation_fee: 400
      }, {
        doctor_clinic_uid: "0b13a79c-d761-4100-ac79-3e1ec1c27720",
        clinic_uid: 'd2a19e4e-9101-4628-b846-f457cca780c5',
        doctor_uid: '31e7e881-4b37-4cee-80f9-4ab32a25773d',
        minimum_scheduling_notice_mins: 24,
        slot_duration_in_mins: 32,
        consultation_fee: 575
      }, {
        doctor_clinic_uid: "7170c9e9-0296-400c-9d15-122c01992c8c",
        clinic_uid: 'c27efa99-f36d-4c6f-a329-d8b4812eebf5',
        doctor_uid: '0e890190-1559-4edd-a0f5-3c61073fe576',
        minimum_scheduling_notice_mins: 99,
        slot_duration_in_mins: 60,
        consultation_fee: 300.75
      }, {
        doctor_clinic_uid: "560e6298-c567-42bd-83a7-0e36306d23f7",
        clinic_uid: '56e6a589-3396-4446-80b5-7bca98ffc9b8',
        doctor_uid: '0e890190-1559-4edd-a0f5-3c61073fe576',
        minimum_scheduling_notice_mins: 94,
        slot_duration_in_mins: 120,
        consultation_fee: 500
      }]);
    });
};

export { seed };

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