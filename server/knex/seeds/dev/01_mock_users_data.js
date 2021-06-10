const seed = function (knex) {
  return knex("users")
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          user_uid: 'f66e0fe0-3837-49d8-8136-a3285f45d3ce',
          user_first_name: 'Angela',
          user_middle_name: 'a',
          user_last_name: 'Mosciski',
          user_email: 'Blake_Gleichner@gmail.com',
          user_birthdate: '2000-09-12',
          user_sex: 'FEMALE',
          user_password: '$2b$10$HwNSbAbtnx8ctRwbPfqEeu6v1N1xVfJ93luObvRGmEOogYXTuHIMe',
          user_role: 'PATIENT',
          created_at: '2020-10-12T00:56:06.857Z'
        },
        {
          user_uid: '0353121f-eeed-4687-8676-f788d3e9c8e6',
          user_first_name: 'Laura',
          user_middle_name: 'c',
          user_last_name: 'Kub',
          user_email: 'Billie97@yahoo.com',
          user_birthdate: '1980-11-14',
          user_sex: 'FEMALE',
          user_password: '$2b$10$t4ebvreH/RTET7RQ0rNpB.YytOIhPufXpVMZ3JOr2xC2EVK23nROW',
          user_role: 'DOCTOR',
          created_at: '2020-12-24T00:13:47.275Z'
        },
        {
          user_uid: '3a238cae-f2af-4d4b-bb34-252215b5272e',
          user_first_name: 'Delia',
          user_middle_name: 'a',
          user_last_name: 'Bruen',
          user_email: 'Lupe_Predovic7@hotmail.com',
          user_birthdate: '1973-03-22',
          user_sex: 'FEMALE',
          user_password: '$2b$10$mCwR1bppr5wirRurCNfGTeWB438OZX2J/NLrXOw/8i9Y1UIcVAyxK',
          user_role: 'DOCTOR',
          created_at: '2021-01-24T18:16:44.941Z'
        },
        {
          user_uid: 'cda55010-ba9a-4863-8fc7-0a12bfe548c0',
          user_first_name: 'Javier',
          user_middle_name: 'a',
          user_last_name: 'Weissnat',
          user_email: 'Clementine16@gmail.com',
          user_birthdate: '2000-04-02',
          user_sex: 'FEMALE',
          user_password: '$2b$10$uolMUaC0BQLfm9zF8Qfq5OzHYN2Grc9e15m3pKj6JWcxr5tDU8eRW',
          user_role: 'PATIENT',
          created_at: '2020-09-12T16:31:00.947Z'
        },
        {
          user_uid: '0a1bcc04-a748-4669-a4c2-fced1bccc0b2',
          user_first_name: 'Jeffry',
          user_middle_name: 'a',
          user_last_name: 'Beier',
          user_email: 'Ewell39@gmail.com',
          user_birthdate: '1984-05-10',
          user_sex: 'FEMALE',
          user_password: '$2b$10$CXenthNUkT1WP9IS50Cad./Lx8/l9jED/RCFAxEi1OOO3Xmx0pTVe',
          user_role: 'DOCTOR',
          created_at: '2020-12-10T20:23:50.177Z'
        },
        {
          user_uid: '59e1c0ad-4732-4ef2-880b-d7e2ecf62ce4',
          user_first_name: 'Freda',
          user_middle_name: 'c',
          user_last_name: 'Tillman',
          user_email: 'Winston.Conn@gmail.com',
          user_birthdate: '1977-05-12',
          user_sex: 'MALE',
          user_password: '$2b$10$mRug9nGI5kiRNaIP7uKEaesHapXkJiniR1oOvxBEnYgYXBp20RWzi',
          user_role: 'ADMIN',
          created_at: '2020-07-07T01:00:25.325Z'
        },
        {
          user_uid: '31e7e881-4b37-4cee-80f9-4ab32a25773d',
          user_first_name: 'Naomi',
          user_middle_name: 'b',
          user_last_name: 'Altenwerth',
          user_email: 'Taylor_Ankunding@hotmail.com',
          user_birthdate: '2000-01-18',
          user_sex: 'FEMALE',
          user_password: '$2b$10$wrpLBFryOm.cCEK1ZoJtKu8NaONmLh/Vy3C4M.t11msx2tGVR/4k6',
          user_role: 'DOCTOR',
          created_at: '2021-03-26T10:05:51.229Z'
        },
        {
          user_uid: '0e890190-1559-4edd-a0f5-3c61073fe576',
          user_first_name: 'Josie',
          user_middle_name: 'b',
          user_last_name: 'Marvin',
          user_email: 'Krystina.Turner17@hotmail.com',
          user_birthdate: '1994-08-15',
          user_sex: 'FEMALE',
          user_password: '$2b$10$DUjKcVqp48R4fl3IVH.TAu9/JEhojZIJOD.oqUkFDV2uTovNb6qyK',
          user_role: 'DOCTOR',
          created_at: '2021-03-15T15:47:18.168Z'
        },
        {
          user_uid: '5564f7c5-6ac7-4b9a-88cb-4c4ab3ee06e6',
          user_first_name: 'Bobbie',
          user_middle_name: 'b',
          user_last_name: 'Morar',
          user_email: 'Rowland_Veum6@hotmail.com',
          user_birthdate: '1975-09-12',
          user_sex: 'MALE',
          user_password: '$2b$10$iRwNLkMfSnXNTnVgxvvBseCwddNIholtDXASYWwVhZ.AbcZbypr/C',
          user_role: 'ADMIN',
          created_at: '2020-07-21T19:53:38.704Z'
        },
        {
          user_uid: '7fc392c3-cd94-40ec-bd53-81de4aa8f8cf',
          user_first_name: 'Thomas',
          user_middle_name: 'c',
          user_last_name: 'Harris',
          user_email: 'Ruben.Marks@hotmail.com',
          user_birthdate: '1978-09-17',
          user_sex: 'MALE',
          user_password: '$2b$10$eRd3NrwqYYCY07NF7vUx0uSg20/meqoBrxYzM2LdRL0ZnIOApJkaa',
          user_role: 'PATIENT',
          created_at: '2021-02-21T04:22:42.225Z'
        }
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
Raw login: Email: Winston.Conn@gmail.com Pass: wd6p9gbVH3I32On! Role: ADMIN
Raw login: Email: Taylor_Ankunding@hotmail.com Pass: UyJa8ZTEBNtOg6r! Role: DOCTOR
Raw login: Email: Krystina.Turner17@hotmail.com Pass: gT_Lyjv8iMkJBls! Role: DOCTOR
Raw login: Email: Rowland_Veum6@hotmail.com Pass: ZJw_BwW160ZUZI5! Role: ADMIN
Raw login: Email: Ruben.Marks@hotmail.com Pass: rO15imj188_8Lke! Role: PATIENT
*/
