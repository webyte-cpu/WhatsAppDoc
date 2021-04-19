import knex from "knex";
import knexFile from "../knex/knexfile.js";
export default knex(knexFile[process.env.NODE_ENV]);
