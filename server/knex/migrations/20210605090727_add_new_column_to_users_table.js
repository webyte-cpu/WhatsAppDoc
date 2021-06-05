const up = function (knex) {
    return knex.schema.alterTable("users", (table) => {
      table.string("user_push_token");
    });
  };
  
  const down = function (knex) {
    return knex.schema.alterTable("users", (table) => {
        table.dropColumn("user_push_token");
      });
  };
  
  export { up, down };
  