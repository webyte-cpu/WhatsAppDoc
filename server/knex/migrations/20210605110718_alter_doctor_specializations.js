
const up = function(knex) {
  return knex.schema.table('doctor_specializations',(table) => {
    table.uuid("doctor_uid").references("doctors.doctor_uid").notNullable().alter();
    table.uuid("specialization_uid").references("specializations.specialization_uid").notNullable().alter();
  })
};

const down = function(knex) {
  return knex.schema.table('doctor_specializations',(table) => {
    table.uuid("doctor_uid").notNullable().alter();
    table.uuid("specialization_uid").notNullable().alter();
  })
};

export { up, down };
