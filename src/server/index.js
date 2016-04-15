import config from './config/env';
import app from './config/express';

let port = process.env.PORT || config.default.port

console.log(`Starting server on port ${port}`)
let server = app.listen(port, () => {
    app.emit('listening', null)
});

server.on('listening', function() {
  console.log('Express server started on port %s at %s', server.address().port, server.address().address);
});

export default app;