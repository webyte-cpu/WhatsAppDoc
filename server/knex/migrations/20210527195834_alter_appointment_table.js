const up = function (knex) {
  return knex.schema.alterTable("appointments", (table) => {
    table.timestamps();
  });
};

const down = function (knex) {};

export { up, down };
