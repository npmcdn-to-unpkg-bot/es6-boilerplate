module.exports = {

  development: {
    client: 'sqlite',
    connection: {
      filename: "./db/mydb.db"
    },
    seeds: {
      directory: './db/seeds'
    },
    migrations: {
      directory: './db/migrations'
    }
  }

};
