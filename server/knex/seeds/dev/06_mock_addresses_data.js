const seed = function (knex) {
  return knex('addresses')
    .then(function () {
      return knex('addresses').insert([
        {
          address_uid: '0afdaddf-536e-4b67-8617-52783e64f6b5', // Iloilo Doctor;s
          address: 'Infante St., Molo',
          address_city: 'Iloilo City',
          address_province: 'Iloilo',
          address_zip_code: '5000',
          address_country: 'Philippines',
          address_coordinates: '10.696614,122.554451'
        },
        { 
          address_uid: 'd88e25f9-75fc-463b-8c06-4edb67195a6b', // Doctor's Roxas
          address: 'Brgy. Lawa-an',
          address_city: 'Roxas City',
          address_province: 'Capiz',
          address_zip_code: '5800',
          address_country: 'Philippines',
          address_coordinates: '11.565504,122.752897'
        },
        {
          address_uid: "d3cf6e43-27a6-4c28-9391-3e3241de001a", // Iloilo Doctors
          address: 'Infante St., Molo',
          address_city: 'Iloilo City',
          address_province: 'Iloilo',
          address_zip_code: '5000',
          address_country: 'Philippines',
          address_coordinates: '10.696614,122.554451'
        }, {
          address_uid: "1f4d7877-a507-4604-bb18-8f5b6f297a6d", // Qualimed
          address: 'Donato Pison Ave., Mandurriao',
          address_city: 'Iloilo City',
          address_province: 'Iloilo',
          address_zip_code: '5000',
          address_country: 'Philippines',
          address_coordinates: '10.706521,122.54761'
        }, {
          address_uid: "9d204c76-6a1e-4527-adc7-dfe5f064ecd0", // Qualimed
          address: 'Donato Pison Ave., Mandurriao',
          address_city: 'Iloilo City',
          address_province: 'Iloilo',
          address_zip_code: '5000',
          address_country: 'Philippines',
          address_coordinates: '10.706521,122.54761'
        }, {
          address_uid: "30a59269-ebf2-4f79-b598-1cb1b3f4625c",// Medicus
          address: 'Mandurriao',
          address_city: 'Iloilo City',
          address_province: 'Iloilo',
          address_zip_code: '5000',
          address_country: 'Philippines',
          address_coordinates: '10.70308,122.55169'
        }, {
          address_uid: "eee7a936-7dcb-4050-9767-41f1c193b11e", // Medicus
          address: 'Mandurriao',
          address_city: 'Iloilo City',
          address_province: 'Iloilo',
          address_zip_code: '5000',
          address_country: 'Philippines',
          address_coordinates: '10.70308,122.55169'
        }, {
          address_uid: "72af9a21-404f-4c53-a6e9-a107229fb4f3", // Elizabeth's Dental Clinic
          address: '2nd Floor, Plazuela Dos, Benigno Aquino Ave, Mandurriao',
          address_city: 'Iloilo City',
          address_province: 'Iloilo',
          address_zip_code: '5000',
          address_country: 'Philippines',
          address_coordinates: '10.710919,122.551257'
        }, {
          address_uid: "5a3b5078-7c27-43a0-8f6f-f09da3bba99a", // Mission Hospital
          address: '40 D.B Ledesma St, Jaro',
          address_city: 'Iloilo City',
          address_province: 'Iloilo',
          address_zip_code: '5000',
          address_country: 'Philippines',
          address_coordinates: '10.715212,122.559735'
        }
      ]);
    });
};

export { seed }