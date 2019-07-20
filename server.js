/*
Start the MongoDB connection first. If this fails, exit the process. Otherwise start the server as expected
 */
require('./service/databaseService').connect()
    .then(() => {
        startServer()
    })
    .catch((err) => {
        console.error('Could not connect to MongoDB: ' + err.stack);
        process.exit(1)
    });

function startServer() {
    const {app} = require('./app');
    const {port} = require('./util/configUtil');
    app.listen(port, () => console.log(`Listening on Port ${port}`));
}