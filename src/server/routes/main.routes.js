// Import node module
import express from 'express';
const router = express.Router();

// Arrow functions
router.get('/', (req, res) => {
  //res.setHeader('content-type', 'text/plain')
  //res.send('Hello World!! HIHIHI');
  res.sendfile('./src/server/public/index.html');
});
// Exporting an object as the default import for this module
export default router;