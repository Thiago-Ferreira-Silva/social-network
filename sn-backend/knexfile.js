const { db } = process.env.ENV ? { db: null} : require('./.env')

module.exports = {
  development: {
    client: 'postgresql',
    connection: db,
    migrations: {
      tableName: 'knex_migrations'
    }
  },
  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './migrations',
  }
  }
}
