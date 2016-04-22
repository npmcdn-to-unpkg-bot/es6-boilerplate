import express from 'express'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import methodOverride from 'method-override';
import cors from 'cors';
import httpStatus from 'http-status';
import expressWinston from 'express-winston';
import expressValidation from 'express-validation';
import logger from 'morgan';
import winstonInstance from '../helpers/winston';
import {default as conf} from '../config';

export let router = express.Router();

if (conf.get('env') === 'development') {
    router.use(logger('dev'));
}

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(cookieParser());
router.use(compress());
router.use(methodOverride());

// disable 'X-Powered-By' header in response


// enable CORS - Cross Origin Resource Sharing
router.use(cors());

// enable detailed API logging in dev env
if (conf.get('env') === 'development') {
    expressWinston.requestWhitelist.push('body');
    expressWinston.responseWhitelist.push('body');
    router.use(expressWinston.logger({
        winstonInstance,
        meta: true, 	// optional: log meta data about request (defaults to true)
        msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
        colorStatus: true 	// Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).
    }));
}


export default router
