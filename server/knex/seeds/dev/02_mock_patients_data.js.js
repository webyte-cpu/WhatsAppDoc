const seed = function (knex) {
  return knex("patients")
    .then(function () {
      return knex("patients").insert([
        {
          patient_uid: "f66e0fe0-3837-49d8-8136-a3285f45d3ce",
        },
        {
          patient_uid: "0353121f-eeed-4687-8676-f788d3e9c8e6",
        },
        {
          patient_uid: "3a238cae-f2af-4d4b-bb34-252215b5272e",
        },
        {
          patient_uid: "cda55010-ba9a-4863-8fc7-0a12bfe548c0",
        },
        {
          patient_uid: "0a1bcc04-a748-4669-a4c2-fced1bccc0b2",
        },
        {
          patient_uid: "31e7e881-4b37-4cee-80f9-4ab32a25773d",
        },
        {
          patient_uid: "0e890190-1559-4edd-a0f5-3c61073fe576",
        },
        {
          patient_uid: "7fc392c3-cd94-40ec-bd53-81de4aa8f8cf",
        },
      ]);
    });
};

export { seed };

/*
Raw login: Email: Blake_Gleichner@gmail.com Pass: udHCyaQtfxpZN6r! Role: PATIENT
Raw login: Email: Billie97@yahoo.com Pass: guG3Xxq9j4_GqQ2! Role: DOCTOR
Raw login: Email: Lupe_Predovic7@hotmail.com Pass: PH5tn3BTyAImgcJ! Role: DOCTOR
Raw login: Email: Clementine16@gmail.com Pass: 2Aibluin4HEqXvL! Role: PATIENT
Raw login: Email: Ewell39@gmail.com Pass: 0vW1bClFkkrRB1x! Role: DOCTOR
Raw login: Email: Taylor_Ankunding@hotmail.com Pass: UyJa8ZTEBNtOg6r! Role: DOCTOR
Raw login: Email: Krystina.Turner17@hotmail.com Pass: gT_Lyjv8iMkJBls! Role: DOCTOR
Raw login: Email: Ruben.Marks@hotmail.com Pass: rO15imj188_8Lke! Role: PATIENT
*/
