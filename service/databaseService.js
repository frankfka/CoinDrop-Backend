const mongoose = require('mongoose');
const { databaseUri } = require('../util/configUtil');

mongoose.Promise = global.Promise;

function connect() {
  return mongoose.connect(databaseUri, {
    useNewUrlParser: true,
  });
}

function disconnect() {
  return mongoose.disconnect();
}

module.exports = {
  connect,
  disconnect,
  mongoose,
};
