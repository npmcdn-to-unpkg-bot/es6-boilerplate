import config from './config/env';
import app from './config/express';

var knexConfig = require('./knexfile');
var knex = require('knex')(knexConfig.development);
var bookshelf = require('bookshelf')(knex);
var api = require('./middlewares/kalamata')(app, { apiRoot: '/kalamata' });


var Thing = bookshelf.Model.extend({
    tableName: 'things'
});

var User = bookshelf.Model.extend({
    tableName: 'users',
    things: function() {
        return this.hasMany(Thing);
    }
});


api.expose(User);
api.expose(Thing);
//console.log(app._router.stack);
api.beforeGetThings(execThingsQuery);
api.beforeGetRelatedThings(execThingsQuery);

function execThingsQuery(req, res, model) {
    // only get things that are not flagged as deleted
    model.where({'deleted': false});
}

let port = process.env.PORT || config.default.port

let server = app.listen(port, () => {
    app.emit('listening', null)
});

server.on('listening', function() {
  console.log(`Express server started on port ${server.address().port} at ${server.address().address} (mode: ${config.default.env})`);
});

export default app;