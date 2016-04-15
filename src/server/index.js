import config from './config/env';
import app from './config/express';

let port = process.env.PORT || config.default.port

let server = app.listen(port, () => {
    app.emit('listening', null)
});

server.on('listening', function() {
  console.log(`Express server started on port ${server.address().port} at ${server.address().address} (mode: ${config.default.env})`);
});

export default app;