const express = require('express');

require('dotenv').config();

const { configs, dbConnect } = require('./configs');
const { apiRouter } = require('./routes');
const { errorCodes } = require('./errors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
