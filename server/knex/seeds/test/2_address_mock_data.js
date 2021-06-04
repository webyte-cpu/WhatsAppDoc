const seed = function (knex) {
  // Deletes ALL existing entries
  return knex("addresses")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("addresses").insert([
        {
          address_uid: "5f9cf4f8-d8d9-4fb2-bdf2-b0f341a98048",
          address: "Test Address",
          address_city: "San Jose",
          address_province: "Antique",
          address_zip_code: "5700",
          address_country: "Philippines",
          address_coordinates: '14.6488, 121.0509'
          // address_coordinates:""
        },

        {
          address_uid: "a9d6a29a-ae61-43c8-80f3-11a584cc1270",
          address: "Test Address",
          address_city: "San Jose",
          address_province: "Antique",
          address_zip_code: "5700",
          address_country: "Philippines",
          address_coordinates: '14.6488, 121.0509'
          // address_coordinates:""
        },
      ]);
    });
};

export { seed };
