import path from 'path';
module.exports = {

  development: {
    client: 'sqlite',
    connection: {
      filename: path.join(__dirname + "/db/mydb.db")
    },
    seeds: {
      directory: './db/seeds'
    },
    migrations: {
      directory: './db/migrations'
    }
  }

};
