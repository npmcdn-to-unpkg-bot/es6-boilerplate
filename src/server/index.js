import {default as conf} from './config';
import {default as bookshelf} from './db';
import fs from 'fs';
import {up as initDB} from './db/migrations/add-users-and-things';
import {seed} from './db/seeds/seed';
var Promise = require("bluebird");

// init database
console.log("Initialize database: " + conf.get('database.connection.filename'))

fs.exists(conf.get('database.connection.filename'), function(exists) {
    if (exists) {
        console.log(conf.get('database.connection.filename') + "database already exist !")
    } else {
        initDB(bookshelf.knex, Promise);

        if (conf.get('env') === "development") {
            console.log("Seeding the database")
            seed(bookshelf.knex, Promise);
        }
    }
});


var app = require('./config/express').default

let server = app.listen(conf.get('port'), () => {
    app.emit('listening', null)
});

server.on('listening', function() {
    console.log(`Express server started on port ${server.address().port} at ${server.address().address} (mode: ${conf.get('env')})`);
});

export default app;