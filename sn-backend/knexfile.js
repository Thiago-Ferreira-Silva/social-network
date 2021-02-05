const { db } = require('./.env')

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
    connection: {
      database:process.env.DB_name,
        user: process.env.DB_user,
        password: process.env.DB_password
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
}
