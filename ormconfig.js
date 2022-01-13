module.exports = {
  "type": process.env.TYPEORM_CONNECTION,
  "host": process.env.TYPEORM_HOST,
  "port": process.env.POSTGRES_PORT,
  "username": process.env.POSTGRES_USER,
  "password": process.env.POSTGRES_PASSWORD,
  "database": process.env.POSTGRES_DB,
  "synchronize": true,
  "entities": [
    "src/entity/*.ts"
  ],
  // "subscribers": [
  //   "src/subscriber/*.js"
  // ],
  // "migrations": [
  //   "src/migration/*.js"
  // ],
  "cli": {
    "entitiesDir": "src/entity",
    "migrationsDir": "src/migration",
    "subscribersDir": "src/subscriber"
  }
}