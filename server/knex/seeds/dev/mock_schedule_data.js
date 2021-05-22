const seed = function (knex) {
  // Deletes ALL existing entries
  return knex('schedule')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('schedule').insert([
        {
          uid: 'd8b605d8-68c8-4f97-b80b-633ef167b801',
          doctorClinicUid: '0353121f-eeed-4687-8676-f788d3e9c8e6',
          start_time: "10:30:00Z",
          end_time: "11:30:00Z",
          day_of_week: JSON.stringify([4])
        },
        {
          uid: '9733cbae-dc7d-451c-af9c-ed7618ca9029',
          doctorClinicUid: '3a238cae-f2af-4d4b-bb34-252215b5272e',
          start_time: "8:00:00Z",
          end_time: "9:00:00Z",
          day_of_week: JSON.stringify([1, 3])
        },
      ]);
    });
};

export { seed }