const express = require('express');
const cors = require('cors');

require('dotenv').config();

const { configs, dbConnect, statusCodesEnum } = require('./configs');
const { apiRouter } = require('./routes');
const { errorCodes, ErrorHandler } = require('./errors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// http://localhost:5173

app.use(cors({ origin: _configureCors }));

app.use('/', apiRouter);
app.use('*', _notFoundError);
app.use(_mainErrorHandler);

app.listen(configs.PORT, () => {
    dbConnect();
});

function _notFoundError(err, req, res, next) {
    next({
        status: err.status || errorCodes.NOT_FOUND,
        message: err.message || 'NOT FOUND'
    });
}

// eslint-disable-next-line no-unused-vars
function _mainErrorHandler(err, req, res, _) {
    res
        .status(err.status || errorCodes.SERVER_ERROR)
        .json({
            message: err.message || 'Unknown error'
        });
}

function _configureCors(origin, cb) {
    const whiteList = configs.ALLOWED_ORIGINS.split(';');

    if (!origin && process.env.NODE_DEV === 'dev') {
        return cb(null, true);
    }

    if (!whiteList.includes(origin)) {
        return cb(new ErrorHandler(statusCodesEnum.FORBIDDEN, 'Cors not allowed'), false);
    }

    return cb(null, true);
}
