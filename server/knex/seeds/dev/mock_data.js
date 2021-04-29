const seed = function (knex) {
  // Deletes ALL existing entries

   knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          user_uid: 'bee4ef71-7547-411d-ba78-6077da1ff963',
          user_first_name: 'Chadd',
          user_middle_name: 'b',
          user_last_name: 'Goyette',
          user_email: 'Clara50@hotmail.com',
          user_birthdate: "2001-06-11",
          user_sex: 'FEMALE',
          user_password: '$2b$10$b/m6TrnItLHO7f23wCXYsO7djrHzw6nrwpbsx9m0K2B2DV3s1RNDa',
          user_role: 'ADMIN',
          created_at: "2020-08-02T06:42:57.294Z"
        },
        {
          user_uid: 'bfd46b0b-ca74-4321-8145-07b875f88a02',
          user_first_name: 'Guiseppe',
          user_middle_name: 'b',
          user_last_name: 'Gerhold',
          user_email: 'Dewitt.Becker90@yahoo.com',
          user_birthdate: "2000-02-25",
          user_sex: 'FEMALE',
          user_password: '$2b$10$nbzvRhVopaza3x9xf.wpeOMx6QlfeFTERMGIUnL.xj3pf.NCeTLDW',
          user_role: 'ADMIN',
          created_at: "2020-12-02T23:23:41.025Z"
        },
        {
          user_uid: 'df5c43b9-37e5-4af5-bc9e-a7484607d8ff',
          user_first_name: 'Francisco',
          user_middle_name: 'a',
          user_last_name: 'Wintheiser',
          user_email: 'Lynn41@hotmail.com',
          user_birthdate: "1979-01-11",
          user_sex: 'MALE',
          user_password: '$2b$10$pExUA4WOsKOS0/9aD4gPEOOkCIJDPVQA8Php1lJzZK2vYHghPwDSm',
          user_role: 'DOCTOR',
          created_at: "2020-12-14T23:08:30.878Z"
        },
        {
          user_uid: 'eb0a5b40-1fc0-442b-a452-ca5c24603d5c',
          user_first_name: 'Brayan',
          user_middle_name: 'b',
          user_last_name: 'Kreiger',
          user_email: 'Rashawn.Schoen69@hotmail.com',
          user_birthdate: "2000-09-15",
          user_sex: 'FEMALE',
          user_password: '$2b$10$VO0zdDnCyK56qJrDaD0JmexyLrlhlGSQZnab17QKgVsPf4aY44yfy',
          user_role: 'ADMIN',
          created_at: "2020-06-24T04:17:57.191Z"
        },
        {
          user_uid: '5f2192b0-0e3a-4c77-9593-33f3f27ec441',
          user_first_name: 'Ferne',
          user_middle_name: 'a',
          user_last_name: 'Hilpert',
          user_email: 'Elsie50@hotmail.com',
          user_birthdate: "1985-12-10",
          user_sex: 'MALE',
          user_password: '$2b$10$bJyPXTMCvBbedmNluMfN/eQoBwGYmVM1Id77EK3C.HNf.DFEvMbNy',
          user_role: 'DOCTOR',
          created_at: "2020-10-10T01:20:22.001Z"
        },
        {
          user_uid: '3204e990-4a4a-46c3-a693-8dbb3aeb238a',
          user_first_name: 'Roxane',
          user_middle_name: 'a',
          user_last_name: 'Lakin',
          user_email: 'Beaulah30@yahoo.com',
          user_birthdate: "1997-11-18",
          user_sex: 'FEMALE',
          user_password: '$2b$10$NLcCfFssxjCVfooXsQ3lW.5LrrQ9K3ypF3B6JAGsDYU0Ukat3UzsO',
          user_role: 'PATIENT',
          created_at: "2020-10-08T19:14:51.080Z"
        },
        {
          user_uid: 'e2d2a4e0-7885-4583-baf9-b50e03a24a1a',
          user_first_name: 'Efrain',
          user_middle_name: 'a',
          user_last_name: 'Zieme',
          user_email: 'Russel10@hotmail.com',
          user_birthdate: "1999-05-13",
          user_sex: 'FEMALE',
          user_password: '$2b$10$wyKu8nGoslEMmFQDF1t5QOYYz8vQnPyxsUV5ScoeH/ONwC7YydEMW',
          user_role: 'ADMIN',
          created_at: "2021-01-04T21:24:02.377Z"
        },
        {
          user_uid: '405e9a6c-ed50-448b-b8c8-a769edab51f4',
          user_first_name: 'Nettie',
          user_middle_name: 'b',
          user_last_name: 'Gleichner',
          user_email: 'Joany.Cremin51@yahoo.com',
          user_birthdate: "1978-06-12",
          user_sex: 'MALE',
          user_password: '$2b$10$Xl7rr9lz0KKytSDyGFqjZO5ual6troKXUiRD8P2MYBW6090KFY7re',
          user_role: 'DOCTOR',
          created_at: "2020-10-28T21:33:16.272Z"
        },
        {
          user_uid: '2634f0a2-09a9-4a27-b926-1bed44ce3566',
          user_first_name: 'Otho',
          user_middle_name: 'c',
          user_last_name: 'Dickinson',
          user_email: 'Mara_Anderson22@gmail.com',
          user_birthdate: "1998-04-12",
          user_sex: 'FEMALE',
          user_password: '$2b$10$ezZFiFuz5wYT9OztzBvYF.5BhizbvGYdfZVtZnhKJX7GBvsU3SYoq',
          user_role: 'ADMIN',
          created_at: "2020-10-02T05:31:57.671Z"
        },
        {
          user_uid: '67b769a5-25e7-4da4-b9b6-28435e4a06ea',
          user_first_name: 'Kassandra',
          user_middle_name: 'a',
          user_last_name: 'Hickle',
          user_email: 'Alden84@yahoo.com',
          user_birthdate: "1988-02-10",
          user_sex: 'MALE',
          user_password: '$2b$10$OMbx/6PpOffgBMFC6OaBiOOuwnyI5xeRr3VouKPK1o/YbOexVk7Rq',
          user_role: 'DOCTOR',
          created_at: "2021-01-29T11:10:49.426Z"
        }
      ]);
    });

    return knex("doctors")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("doctors").insert([
        {
          doctor_uid: 'df5c43b9-37e5-4af5-bc9e-a7484607d8ff',
          doctor_licence_num: "1234567",
          doctor_verification_status: "PENDING",
          doctor_licence_img: "http://newstogov.com/wp-content/uploads/2019/10/prc1.jpg",
          doctor_licence_exp: "2022-10-28",
        },
        {
          doctor_uid: '5f2192b0-0e3a-4c77-9593-33f3f27ec441',
          doctor_licence_num: "0483958",
          doctor_verification_status: "PENDING",
          doctor_licence_img: "http://newstogov.com/wp-content/uploads/2019/10/prc1.jpg",
          doctor_licence_exp: "2021-12-12",
        },
        {
          doctor_uid: '405e9a6c-ed50-448b-b8c8-a769edab51f4',
          doctor_licence_num: "5844731",
          doctor_verification_status: "PENDING",
          doctor_licence_img: "http://newstogov.com/wp-content/uploads/2019/10/prc1.jpg",
          doctor_licence_exp: "2023-01-09",
        },
        {
          doctor_uid: '67b769a5-25e7-4da4-b9b6-28435e4a06ea',
          doctor_licence_num: "1206496",
          doctor_verification_status: "PENDING",
          doctor_licence_img: "http://newstogov.com/wp-content/uploads/2019/10/prc1.jpg",
          doctor_licence_exp: "2022-05-09",
        },
      ]);
    });
};

export { seed };

/*
Raw login: Email: Clara50@hotmail.com Pass: pigUb80WORZF2Ul
Raw login: Email: Dewitt.Becker90@yahoo.com Pass: wm7vCIiODfraF3v
Raw login: Email: Lynn41@hotmail.com Pass: HTjtwSku6wyzc1Z
Raw login: Email: Rashawn.Schoen69@hotmail.com Pass: bPL6XnnNSAe3SQ8
Raw login: Email: Elsie50@hotmail.com Pass: _N7MFuMpV_7hEQj
Raw login: Email: Beaulah30@yahoo.com Pass: 6cKqysjBtUig3LB
Raw login: Email: Russel10@hotmail.com Pass: aODnd_rJcCYSQbj
Raw login: Email: Joany.Cremin51@yahoo.com Pass: oA9915RX57pRytp
Raw login: Email: Mara_Anderson22@gmail.com Pass: 8BK2LyE9V1BPCBN
Raw login: Email: Alden84@yahoo.com Pass: amguKFMTzTYt4mL
*/
