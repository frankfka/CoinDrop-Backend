const { app } = require('./app');
const { port } = require('./util/configUtil');

/*
Start the MongoDB connection first. If this fails, exit the process.
Otherwise start the server as expected
 */
function startServer() {
  app.listen(port, () => console.log(`Listening on Port ${port}`));
}

require('./service/databaseService').connect()
  .then(() => {
    startServer();
  })
  .catch((err) => {
    console.error(`Could not connect to MongoDB: ${err.stack}`);
    process.exit(1);
  });
