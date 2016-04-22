import express from 'express';
import APIError from '../helpers/APIError';
import {default as conf} from '../config';
import logger from 'morgan';
import expressWinston from 'express-winston';
import winstonInstance from '../helpers/winston';


export let router = express.Router();

// if error is not an instanceOf APIError, convert it.
router.use((err, req, res, next) => {
    if (err instanceof expressValidation.ValidationError) {
        // validation error contains errors which is an array of error each containing message[]
        const unifiedErrorMessage = err.errors.map(error => error.messages.join('. ')).join(' and ');
        const error = new APIError(unifiedErrorMessage, err.status, true);
        return next(error);
    } else if (!(err instanceof APIError)) {
        const apiError = new APIError(err.message, err.status, err.isPublic);
        return next(apiError);
    }
    return next(err);
});


// catch 404 and forward to error handler
router.use((req, res, next) => {
    const err = new APIError('API not found', httpStatus.NOT_FOUND);
    return next(err);
});


// log error in winston transports except when executing test suite
if (conf.get('env') !== 'test') {
    router.use(expressWinston.errorLogger({
        winstonInstance
    }));
}


// error handler, send stacktrace only during development
router.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    res.status(err.status).json({
        message: err.isPublic ? err.message : httpStatus[err.status],
        stack: conf.get('env') === 'development' ? err.stack : {}
    })
});