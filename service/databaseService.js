const mongoose = require('mongoose');
const { databaseUri } = require('../util/config');
mongoose.Promise = global.Promise;

function connect() {
    return mongoose.connect(databaseUri);
}

module.exports = {
    connect,
    mongoose
};