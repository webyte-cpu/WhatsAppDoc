const up = function (knex) {
  return knex.schema
    .alterTable("schedules", (table) => {
      table.time("start_time").notNullable().alter();
      table.time("end_time").notNullable().alter();
    })
    .alterTable("unavailable_dates", (table) => {
      table.time("start_time").notNullable().alter();
      table.time("end_time").notNullable().alter();
    });
};

const down = function (knex) {};

export { up, down };
