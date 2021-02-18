const { db } = process.env.ENV ? { db: null } : require('./.env')

module.exports = {
  development: {
    client: 'postgresql',
    connection: 'postgres://sdnvgxdiihzmtm:8d41b03a81d648492d9e659d8dd1c847515227c283426f4bece30ec02cc14a05@ec2-35-174-118-71.compute-1.amazonaws.com:5432/d2pfco2najfqef' 
    /*db*/,
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
