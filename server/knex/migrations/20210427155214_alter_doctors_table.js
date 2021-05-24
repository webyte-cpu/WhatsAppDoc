
const up = function(knex) {
  return knex.schema.table('doctors',(table) => {
    table.text("doctor_licence_img").notNullable().alter();
  })
  
};

const down = function(knex) {
  return knex.schema.table('doctors',(table) => {
    table.string("doctor_licence_img").notNullable().alter();
  })
};

export { up, down };
