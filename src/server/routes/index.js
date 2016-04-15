// Import node module
import express from 'express';
const router = express.Router();

// Arrow functions
router.get('/', (req, res) => {
  //res.setHeader('content-type', 'text/plain')
  res.send('<HTML><HEADER><BODY>Hello World!!</BODY></HEARDER></HTML>');
  //res.sendFile('./src/client/index.html', {root: __dirname + });
});
// Exporting an object as the default import for this module
export default router;