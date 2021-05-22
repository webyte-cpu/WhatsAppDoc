const seed = function (knex) {
  // Deletes ALL existing entries
  return knex('addresses')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('addresses').insert([
        {
          address_uid: '0afdaddf-536e-4b67-8617-52783e64f6b5',
          address: 'Parc Regency',
          address_city: 'Pavia',
          address_province: 'Iloilo',
          address_zip_code: '5001',
          address_country: 'Philippines',
          address_coordinates: '14.6488, 121.0509'
        },
        {
          address_uid: 'd88e25f9-75fc-463b-8c06-4edb67195a6b',
          address: 'Lopez Jaena',
          address_city: 'Jaro',
          address_province: 'Iloilo',
          address_zip_code: '5001',
          address_country: 'Philippines',
          address_coordinates: '14.6042, 120.9822'
        },
      ]);
    });
};

export { seed }