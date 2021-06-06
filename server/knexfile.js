// Update with your config settings.
import dotenv from "dotenv";
dotenv.config();
process.env.PG_CONNECTION_STRING || dotenv.config({ path: "../.env" });

if (!process.env.PG_CONNECTION_STRING)
  throw new Error("Connection string is not set @knex/knexfile.js");

const defaultConfig = {
  client: "pg",
  connection: process.env.PG_CONNECTION_STRING,
  pool: {
    min: 2,
    max: 10,
  },
  
  migrations: {
    tableName: "knex_migrations",
    directory: "./knex/migrations",
  },
  timezone: "UTC",
};

const knex = {
  development: {
    ...defaultConfig,
    seeds: {
      directory: "./knex/seeds/dev",
    },
  },
  test: {
    ...defaultConfig,
    connection: process.env.PG_TEST_CONNECTION_STRING,
    pool: { min: 0, max: 10, idleTimeoutMillis: 500 },
    seeds: {
      directory: "./knex/seeds/dev",
    },
    
  },
  production: {
    ...defaultConfig,
  },
};

export default knex;
