module.exports = {
  // "type": "postgres",
  "type": process.env.TYPEORM_CONNECTION,
  // "host": "localhost",
  "host": process.env.TYPEORM_HOST,
  "port": process.env.POSTGRES_PORT,
  "username": process.env.POSTGRES_USER,
  // "password":"password",
  "password": process.env.POSTGRES_PASSWORD,
  "database": process.env.POSTGRES_DB,
  // "database": "test",
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
    // "migrationsDir": "src/migration",
    // "subscribersDir": "src/subscriber"
  }
}