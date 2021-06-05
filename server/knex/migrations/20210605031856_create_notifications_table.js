export const up = function (knex) {
  return knex.schema.createTable("notifications", (table) => {
    table.uuid("notification_uid").primary().unique().notNullable();
    table.uuid("user_uid").references("users.user_uid");
    table.string("notification_title").notNullable();
    table.string("notification_description").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.text("notification_content");
    table.integer("notification_type");
    table.string("notification_sourceType");
    table.boolean("notification_is_seen").defaultTo(false);
    table.boolean("notification_is_archive").defaultTo(false);
  });
};

export const down = function (knex) {
  return knex.schema.dropTable("notifications");
};
