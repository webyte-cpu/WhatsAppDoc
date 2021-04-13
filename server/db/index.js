import knex from "knex";
import knexFile from "../knex/knexfile.js";
const pg = knex(knexFile.development);
export default pg;
