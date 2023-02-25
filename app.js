const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const { PORT, DB_HOST } = require('./configs/variables');
const { apiRouter } = require('./routes');
const { errorCodes } = require('./errors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', apiRouter);
app.use('*', _notFoundError);
app.use(_mainErrorHandler);

app.listen(PORT, async () => {
    try {
        mongoose.set('strictQuery', true);
        const connection = await mongoose.connect(DB_HOST);

        if (connection) {
            console.log('DB connected');
        }
    } catch (err) {
        if (err) console.log(err);

        process.exit(1);
    }
    console.log(`PORT: ${ PORT }`);
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
