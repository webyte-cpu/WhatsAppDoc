// Update with your config settings.
const dotenv = require("dotenv");
dotenv.config();
process.env.PG_CONNECTION_STRING || dotenv.config({ path: "../.env" });

if (!process.env.PG_CONNECTION_STRING)
  console.log("Connection string is not set @knex/knexfile.js");

const knex =  {
  development: {
    client: "pg",
    connection: process.env.PG_CONNECTION_STRING,
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};

module.exports = knex;
