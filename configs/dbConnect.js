const mongoose = require('mongoose');

const { DB_HOST } = require('./variables');

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(DB_HOST);
    } catch (err) {
        console.log(err);
    }
};

module.exports = connectDB;
