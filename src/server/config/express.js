import express from 'express';
import expressWinston from 'express-winston';
import winstonInstance from '../helpers/winston';
import path from 'path';


import {default as models} from '../models';
import {default as User} from '../models/user';
import {default as Thing} from '../models/thing';
import {default as conf} from './index.js';
import {default as bookshelf} from '../db';
import {router as preMiddlewareRouter} from '../middlewares/preMiddleware.js';
import {router as handleErrorRouter} from '../middlewares/handleError.js';


export const app = express();



// parse body params and attache them to req.body

app.disable('x-powered-by');

//load preMiddleware router
app.use(preMiddlewareRouter);

//static file server
app.use('/', express.static( path.join( __dirname + '/../../../dist/' )));

// Call the ApiGenerator middleware to build the routes and hooks
var api = require('../middlewares/apiGenerator')(app, { apiRoot: '/kalamata' });
api.expose(User);
api.expose(Thing);

export default app;