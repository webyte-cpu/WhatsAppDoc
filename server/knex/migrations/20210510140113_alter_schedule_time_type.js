const up = function (knex) {
  return knex.schema
    .alterTable("schedules", (table) => {
      table.dropColumn("start_time");
      table.dropColumn("end_time");
    })
    .alterTable("schedules", (table) => {
      table.timestamp("start_time").notNullable();
      table.timestamp("end_time").notNullable();
    })
    .alterTable("unavailable_dates", (table) => {
      table.dropColumn("start_time");
      table.dropColumn("end_time");
    })
    .alterTable("unavailable_dates", (table) => {
      table.timestamp("start_time").notNullable();
      table.timestamp("end_time").notNullable();
    });
};

const down = function (knex) {
  return knex.schema
    .alterTable("schedules", (table) => {
      table.time("start_time").notNullable();
      table.time("end_time").notNullable();
    })
    .alterTable("unavailable_dates", (table) => {
      table.time("start_time").notNullable().alter();
      table.time("end_time").notNullable().alter();
    });
};

export { up, down };
