const seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          user_uid: "8b686839-4c94-48ac-ac51-86d36b7bf17c",
          user_first_name: "Kyle",
          user_last_name: "Osunero",
          user_email: "kyle@webyte.org",
          user_password:
            "$2b$10$5dJnrR/Df2k08uzIG2d02OUBKX/1tGS2trJHvhQYj8MvKnPMGMOkm", //"$3cR3tP4ss",
          user_birthdate: "1999-09-25",
          user_sex: "MALE",
          user_role: "ADMIN",
          created_at: new Date(Date.now()),
        },
        {
          user_uid: "7c03f38f-ab4f-4605-a274-706e4d8c8d6a",
          user_first_name: "Em",
          user_last_name: "Mallare",
          user_email: "em@webyte.org",
          user_password:
            "$2b$10$IePitzyeVvYnDcB264J4s.qIHzQimDiRfN6fJidpTjNGdMPbUsR0W", //"$3cR3tP4ss1",
          user_birthdate: "1999-09-25",
          user_sex: "FEMALE",
          user_role: "PATIENT",
          created_at: new Date(Date.now()),
        },
        {
          user_uid: "0353121f-eeed-4687-8676-f788d3e9c8e6",
          user_first_name: "Kent",
          user_last_name: "Handumon",
          user_email: "kent@webyte.org",
          user_password:
            "$2b$10$ewQcGP8mzFRviwYcU0A7suyBZGMs7SLmpTXcx99QEsFFdJbDnrdbW", //"$3cR3tP4ss2",
          user_birthdate: "1999-09-25",
          user_sex: "MALE",
          user_role: "DOCTOR",
          created_at: new Date(Date.now()),
        },
      ]);
    });
};

export { seed };
