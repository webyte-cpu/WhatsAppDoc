// Update with your config settings.
import dotenv from "dotenv";
dotenv.config();
process.env.PG_CONNECTION_STRING || dotenv.config({ path: "../.env" });

if (!process.env.PG_CONNECTION_STRING)
  console.log("Connection string is not set @knex/knexfile.js");

const knex = {
  development: {
    client: "pg",
    connection: process.env.PG_CONNECTION_STRING,
  },
};

export default knex;
