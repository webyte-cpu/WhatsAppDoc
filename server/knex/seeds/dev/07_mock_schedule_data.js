const seed = function (knex) {
  // Deletes ALL existing entries
  return knex('schedules')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('schedules').insert([
        // KUB- IDH
        {
          schedule_uid: "b86703ba-2d1d-4353-8757-d89169a9ead2",
          doctor_clinic_uid: 'fd8f98e9-a0e6-4313-a908-5cc81885afc8',
          start_time: "9:30:00Z",
          end_time: "12:00:00Z",
          day_of_week: JSON.stringify([1,3,5])
        }, {
          schedule_uid: "9554a013-c182-40c1-8cf2-3a72e1ab3024",
          doctor_clinic_uid: 'fd8f98e9-a0e6-4313-a908-5cc81885afc8',
          start_time: "13:00:00Z",
          end_time: "16:30:00Z",
          day_of_week: JSON.stringify([1,3,5])
        }, 
        // KUB - Medicus
        {
          schedule_uid: "915c1fd9-8513-4afe-bfb1-bcea4318257b",
          doctor_clinic_uid: '740424a7-4e39-426f-aa53-65cf3e31609d',
          start_time: "13:00:00Z",
          end_time: "20:30:00Z",
          day_of_week: JSON.stringify([6])
        },
        // Bruen - Capiz Doctor's
        {
          schedule_uid: "a8167e9c-f3c4-4d20-aeb9-9655067c81d4",
          doctor_clinic_uid: '6ecaae63-1196-4e48-818d-0266dbed39e2',
          start_time: "07:00:00Z",
          end_time: "11:45:00Z",
          day_of_week: JSON.stringify([2,4])
        }, {
          schedule_uid: "da01b20d-8c0e-4dfe-ae45-2cfef76f6e6b",
          doctor_clinic_uid: '6ecaae63-1196-4e48-818d-0266dbed39e2',
          start_time: "14:30:00Z",
          end_time: "17:30:00Z",
          day_of_week: JSON.stringify([2,4])
        }, 
        // Bruen - Plazuela
        {
          schedule_uid: "fedf4722-1c24-4ea8-9405-3ea3e8fce7c0",
          doctor_clinic_uid: 'c69b6ead-b180-42a8-b0af-a78b69114757',
          start_time: "10:00:00Z",
          end_time: "14:30:00Z",
          day_of_week: JSON.stringify([6])
        },
        // Beier - IDH
        {
          schedule_uid: "8fb58703-698a-4c49-bffc-5a0206cded42",
          doctor_clinic_uid: '5cb1a5aa-f8b3-424b-a3b1-7c527002b6d1',
          start_time: "09:30:00Z",
          end_time: "11:15:00Z",
          day_of_week: JSON.stringify([1,3,5])
        }, {
          schedule_uid: "ec423f7d-8680-4289-820f-351dc1fe917a",
          doctor_clinic_uid: '5cb1a5aa-f8b3-424b-a3b1-7c527002b6d1',
          start_time: "14:35:00Z",
          end_time: "21:30:00Z",
          day_of_week: JSON.stringify([1,3,5])
        }, 
        // Altenwerth - Quali
        {
          schedule_uid: "b66758b3-2e2e-40d9-8eff-20ab28ad5ce6",
          doctor_clinic_uid: 'c28eb6c7-4792-4668-9650-26c3a0d380d8',
          start_time: "10:00:00Z",
          end_time: "16:30:00Z",
          day_of_week: JSON.stringify([6])
        },
        // Altenwerth - Medicus
        {
          schedule_uid: "f73ce335-e537-451b-8936-6ec06e2bcf86",
          doctor_clinic_uid: '0b13a79c-d761-4100-ac79-3e1ec1c27720',
          start_time: "13:30:00Z",
          end_time: "18:00:00Z",
          day_of_week: JSON.stringify([1,3,5])
        }, 
        // Marvin - Quali
        {
          schedule_uid: "d081d4b6-a647-4967-8d37-fd90b0dcabbe",
          doctor_clinic_uid: '7170c9e9-0296-400c-9d15-122c01992c8c',
          start_time: "07:30:00Z",
          end_time: "10:00:00Z",
          day_of_week: JSON.stringify([3,4,5])
        }, {
          schedule_uid: "ab390197-6b65-4906-b3f1-5a7959d9a468",
          doctor_clinic_uid: '7170c9e9-0296-400c-9d15-122c01992c8c',
          start_time: "14:35:00Z",
          end_time: "17:35:00Z",
          day_of_week: JSON.stringify([3,4,5])
        }, {
          schedule_uid: "4434b7b5-2d86-4b8f-afab-6b00f9a6923f",
          doctor_clinic_uid: '7170c9e9-0296-400c-9d15-122c01992c8c',
          start_time: "08:00:00Z",
          end_time: "11:00:00Z",
          day_of_week: JSON.stringify([1,2])
        }, {
          schedule_uid: "a5f92014-89ce-4c93-b1e2-60d00f35e35b",
          doctor_clinic_uid: '7170c9e9-0296-400c-9d15-122c01992c8c',
          start_time: "13:30:00Z",
          end_time: "15:30:00Z",
          day_of_week: JSON.stringify([1,2])
        }, 
        // Marvin -Medicus
        {
          schedule_uid: "8ff74450-9c1a-4923-a125-5662a8f0b6be",
          doctor_clinic_uid: '560e6298-c567-42bd-83a7-0e36306d23f7',
          start_time: "06:30:00Z",
          end_time: "10:00:00Z",
          day_of_week: JSON.stringify([6])
        }, {
          schedule_uid: "6c5d06bc-13ab-455a-9efd-06c12e706d50",
          doctor_clinic_uid: '560e6298-c567-42bd-83a7-0e36306d23f7',
          start_time: "12:44:00Z",
          end_time: "18:30:00Z",
          day_of_week: JSON.stringify([6])
        },
      ]);
    });
};

export { seed }