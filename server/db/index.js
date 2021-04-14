const knex = require("knex");
const knexFile = require("../knex/knexfile.js");
const pg = knex(knexFile.development);
module.exports = pg;
