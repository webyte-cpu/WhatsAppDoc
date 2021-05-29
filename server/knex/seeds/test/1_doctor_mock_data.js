const seed = function (knex) {
  // Deletes ALL existing entries
  return knex("doctors")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("doctors").insert([
        {
          doctor_uid: "0353121f-eeed-4687-8676-f788d3e9c8e6",
          doctor_licence_num: "1234567",
          doctor_verification_status: "PENDING",
          doctor_licence_img:
            "http://newstogov.com/wp-content/uploads/2019/10/prc1.jpg",
          doctor_licence_exp: "2022-10-28",
          doctor_experience: 2,
          doctor_about: "Test doctor",
          doctor_educational: "Test educational background",
          doctor_rating: "9"
        },
      ]);
    });
};

export { seed };
