// Retrieves all environment variables
if (process.env.NODE_ENV !== 'production') {
    const dotenv = require('dotenv');
    dotenv.config();
}
module.exports = {
    logEnv: process.env.LOG_FORMAT, // For logger
    port: process.env.PORT, // Port to serve
    databaseUri: process.env.DATABASE_URI // URI with database and auth
};