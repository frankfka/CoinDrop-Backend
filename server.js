const { app } = require('./app');
const { port } = require('./util/configUtil');
const { logger } = require('./util/logUtil');

/*
Start the MongoDB connection first. If this fails, exit the process.
Otherwise start the server as expected
 */
function startServer() {
  app.listen(port, () => logger.info(`Listening on Port ${port}`));
}

require('./service/databaseService').connect()
  .then(() => {
    startServer();
  })
  .catch((err) => {
    logger.error(`Could not connect to MongoDB: ${err.stack}`);
    process.exit(1);
  });
