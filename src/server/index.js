console.log("Starting server")
import express from 'express';
import routes from './routes/main.routes';

const app = express();

app.use('/', routes);

// arrow functions
const server = app.listen(3000, () => {
	// destructuring
  const {address, port} = server.address();

  // string interpolation:
  console.log(`Server listening at http://${address}:${port}`);
});

export default app;