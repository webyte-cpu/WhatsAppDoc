import pg from "../../db";

const up = function (knex) {
  knex.schema.alterTable("users", function (t) {
    t.unique("user_email");
  });
};

const down = function (knex) {
  knex.schema.alterTable("users", function (t) {
    t.dropUnique("user_email");
  });
};

export default { up, down };
