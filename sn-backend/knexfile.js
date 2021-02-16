const { db } = process.env.ENV ? { db: null } : require('./.env')

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
  },
  test: {
    client: 'postgresql',
    connection: {
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.SENHA,
      database: process.env.BANCO,
      port: process.env.PORT
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
}
