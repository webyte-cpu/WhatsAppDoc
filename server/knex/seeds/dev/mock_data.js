const seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          user_uid: "4a221edd-af73-4b86-b82e-2e49fad253d7",
          user_first_name: "Jessika",
          user_middle_name: "b",
          user_last_name: "Legros",
          user_email: "Llewellyn.Willms25@hotmail.com",
          user_password:
            "$2b$10$H8UXq/O.PB.8/PZyUpoxkewA87VurQ4u4EG73HPtLYUwAdZIRY.Ey",
          user_role: "DOCTOR",
          user_birthdate: "10-25-2000",
          user_sex: "FEMALE",
          created_at: "2020-09-03T04:16:46.161Z",
        },
        {
          user_uid: "ee729cc9-ad3f-4f14-b707-050bd4a96278",
          user_first_name: "Derick",
          user_middle_name: "b",
          user_last_name: "Friesen",
          user_email: "Alf.Schuster34@hotmail.com",
          user_password:
            "$2b$10$j7ZWPcFhQoB.p38.ejkw6.GPz7H5eC06Er68bZ48IP/ewrTaDkD2C",
          user_role: "DOCTOR",
          user_birthdate: "10-25-2000",
          user_sex: "FEMALE",
          created_at: "2020-10-17T06:17:36.863Z",
        },
        {
          user_uid: "436bd147-07e7-4888-ab2a-d7a7afcb53bd",
          user_first_name: "Jamarcus",
          user_middle_name: "c",
          user_last_name: "Sauer",
          user_email: "Thora_Stroman@hotmail.com",
          user_password:
            "$2b$10$.xCLU71Fso00eBW3Phfr7OAPR7JhQoCsehSfirVIisksa4GLN0MgO",
          user_role: "DOCTOR",
          user_birthdate: "10-25-2000",
          user_sex: "FEMALE",
          created_at: "2021-01-30T00:00:07.240Z",
        },
        {
          user_uid: "28d0d893-839d-4765-b174-9a522b2482b0",
          user_first_name: "Arlie",
          user_middle_name: "b",
          user_last_name: "Collins",
          user_email: "Enid12@hotmail.com",
          user_password:
            "$2b$10$BWM5svaj0bdkQphDnrxHWufWyRx6b2IbFG/pvRl38HNFCSm9H/Ncu",
          user_role: "ADMIN",
          user_birthdate: "10-25-2000",
          user_sex: "FEMALE",
          created_at: "2020-07-29T05:10:55.899Z",
        },
        {
          user_uid: "f0facb16-d790-4e2e-a50d-8a4aa91cf5ac",
          user_first_name: "Melissa",
          user_middle_name: "b",
          user_last_name: "Lockman",
          user_email: "Edwardo.Streich67@gmail.com",
          user_password:
            "$2b$10$gLWDpMzkX8rstJv2sY4Zsub94KmN40x8DuqbHvH3njG1fwMmVYNIC",
          user_role: "ADMIN",
          user_birthdate: "10-25-2000",
          user_sex: "FEMALE",
          created_at: "2020-12-23T09:50:01.921Z",
        },
        {
          user_uid: "bb057097-b67a-4db8-ac85-c04b9a3a8145",
          user_first_name: "Erin",
          user_middle_name: "a",
          user_last_name: "Thiel",
          user_email: "Jayce46@yahoo.com",
          user_password:
            "$2b$10$PCsE6wfIDYPra7fD3szLYOkZIdS7BMderHo1mWHRTpAyV0kEiCSZi",
          user_role: "ADMIN",
          user_birthdate: "10-25-2000",
          user_sex: "FEMALE",
          created_at: "2020-09-14T13:33:28.764Z",
        },
        {
          user_uid: "3a9487fb-fd18-4365-a06a-ba85def38edd",
          user_first_name: "Jada",
          user_middle_name: "c",
          user_last_name: "Hegmann",
          user_email: "Hillard_MacGyver@yahoo.com",
          user_password:
            "$2b$10$P0jRsNlTpzo07i4rEBjCteGMJ7pBXvp1u7bTvnnW4Tzkg5KxU0S4K",
          user_role: "PATIENT",
          user_birthdate: "10-25-2000",
          user_sex: "FEMALE",
          created_at: "2020-10-03T12:37:08.203Z",
        },
        {
          user_uid: "b47a7cbb-9cd9-4a7f-a756-9c978d47f042",
          user_first_name: "Marguerite",
          user_middle_name: "a",
          user_last_name: "Baumbach",
          user_email: "Keanu_Glover@hotmail.com",
          user_password:
            "$2b$10$oTc8Dy091hWYHPvpVR66RutZz7s9UGNSQ3l6h3nyqjZDZ7/kHKpUq",
          user_role: "PATIENT",
          user_birthdate: "10-25-2000",
          user_sex: "FEMALE",
          created_at: "2021-02-13T21:19:58.770Z",
        },
        {
          user_uid: "1f460205-d891-45cb-b9f3-43ccdee144a0",
          user_first_name: "Annetta",
          user_middle_name: "b",
          user_last_name: "Marquardt",
          user_email: "Sherwood.Hoeger@yahoo.com",
          user_password:
            "$2b$10$kyQ/ag.zoQ8n//ONGuDB9Os0WRGJ2XtgGA6Xk1cLnRQ1Gx6RAcqnu",
          user_role: "PATIENT",
          user_birthdate: "10-25-2000",
          user_sex: "FEMALE",
          created_at: "2020-05-20T10:01:25.413Z",
        },
        {
          user_uid: "e0ba00ca-e11a-41ce-8acf-3b29dd0f4f8f",
          user_first_name: "Sadye",
          user_middle_name: "b",
          user_last_name: "Bergstrom",
          user_email: "Jamir37@gmail.com",
          user_password:
            "$2b$10$WbvFUwzlBPMB4fuLJLgfi.0dF6P3B9OODJab.ZrVjMGTsBZCbLiaS",
          user_role: "PATIENT",
          user_birthdate: "10-25-2000",
          user_sex: "FEMALE",
          created_at: "2020-08-19T16:06:27.526Z",
        },
      ]);
    });
};

export { seed };

/* 
Raw login: Email: Llewellyn.Willms25@hotmail.com    Pass: satatani
Raw login: Email: Alf.Schuster34@hotmail.com        Pass: zeceqiya
Raw login: Email: Thora_Stroman@hotmail.com         Pass: woburego
Raw login: Email: Enid12@hotmail.com                Pass: mobemoku
Raw login: Email: Edwardo.Streich67@gmail.com       Pass: sunibara
Raw login: Email: Jayce46@yahoo.com                 Pass: maxexuda
Raw login: Email: Hillard_MacGyver@yahoo.com        Pass: ruderuge
Raw login: Email: Keanu_Glover@hotmail.com          Pass: rejucavu
Raw login: Email: Sherwood.Hoeger@yahoo.com         Pass: rojuxuje
Raw login: Email: Jamir37@gmail.com                 Pass: tosekena 
*/
