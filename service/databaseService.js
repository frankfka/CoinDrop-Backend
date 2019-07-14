const mongoose = require('mongoose');
const { databaseUri } = require('../util/configUtil');
mongoose.Promise = global.Promise;

function connect() {
    return mongoose.connect(databaseUri, {
        useNewUrlParser: true
    });
}

module.exports = {
    connect,
    mongoose
};