const { db } = process.env.ENV ? null : require('./.env')

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
      tableName: 'knex_migrations'
    }
  }
}
