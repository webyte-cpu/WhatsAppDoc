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
          user_password: "$3cR3tP4ss",
          user_role: "ADMIN",
          created_at: new Date(Date.now()),
        },
      ]);
    });
};

export {seed} ;
