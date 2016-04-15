console.log("Starting server")
import http from 'http';
import express from 'express';
import morgan from 'morgan';
import routes from './routes/main.routes';

let app = express();
app.server = http.createServer(app);

app.set('port', process.env.PORT || 22222);
app.use(morgan('combined'));
app.use('/public', express.static( __dirname + '/public' ));
app.use('/', routes);

console.log(__dirname);
// arrow functions
app.server.listen(app.get('port'));

app.server.on('listening', function() {
  console.log('Express server started on port %s at %s', app.server.address().port, app.server.address().address);
});

export default app;