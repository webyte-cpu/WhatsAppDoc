export const up = function (knex) {
  return knex.schema
    .alterTable("doctors", (table) => {
      table.dropColumn("doctor_verification_status");
    })
    .alterTable("doctors", (table) => {
      table
        .enu("doctor_verification_status", [
          "PENDING",
          "VERIFIED",
          "UNVERIFIED",
          "DECLINDED",
        ])
        .defaultTo("UNVERIFIED");
    });
};

export const down = function (knex) {
  return knex.schema
    .alterTable("doctors", (table) => {
      table.dropColumn("doctor_verification_status");
    })
    .alterTable("doctors", (table) => {
      table
        .enu("doctor_verification_status", [
          "PENDING",
          "VERIFIED",
          "UNVERIFIED",
        ])
        .defaultTo("PENDING")
    });
};
