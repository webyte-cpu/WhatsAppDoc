const seed = function (knex) {
  // Deletes ALL existing entries
  return knex('schedules')
    // .del()
    .then(function () {
      // Inserts seed entries
      return knex('schedules').insert([
        {
          schedule_uid: 'd8b605d8-68c8-4f97-b80b-633ef167b801',
          doctor_clinic_uid: '0afdaddf-536e-4b67-8617-52783e64f6b5',
          start_time: "10:30:00Z",
          end_time: "11:30:00Z",
          day_of_week: JSON.stringify([4])
        },
        {
          schedule_uid: '9733cbae-dc7d-451c-af9c-ed7618ca9029',
          doctor_clinic_uid: '0afdaddf-536e-4b67-8617-52783e64f6b5',
          start_time: "8:00:00Z",
          end_time: "9:00:00Z",
          day_of_week: JSON.stringify([1, 3])
        },
      ]);
    });
};

export { seed }