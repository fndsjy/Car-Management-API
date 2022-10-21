/**
 * @file Manages database connection configuration.
 * @author Fendy Sanjaya
 */

/** Destruct environment variable to get database configuration */
const {
  DB_USERNAME = "postgres",
  DB_PASSWORD = "fendys",
  DB_HOST = "127.0.0.1",
  DB_NAME = "db_chapter6",
} = process.env;

module.exports = {
  development: {
    "username": DB_USERNAME,
    "password": DB_PASSWORD,
    "database": DB_NAME,
    "host": DB_HOST,
    "dialect": "postgres"
  },
  test: {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": DB_HOST,
    "dialect": "postgres"
  },
  production: {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": DB_HOST,
    "dialect": "postgres"
  }
}
