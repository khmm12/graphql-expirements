require('babel-register')

const { join } = require('path')

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: join(__dirname, 'dev.sqlite3')
    },
    useNullAsDefault: true,
    migrations: {
      directory: join(__dirname, 'database/migrations')
    },
    seeds: {
      directory: join(__dirname, 'database/seeds/dev')
    }
  }
}
