// Retrieves all environment variables
if (process.env.NODE_ENV !== 'production') {
    const envFile = require('path').resolve(process.cwd(), 'api.env');
    const dotenv = require('dotenv');
    dotenv.config({path: envFile});
}
module.exports = {
    logEnv: process.env.LOG_FORMAT, // For logger
    port: process.env.PORT, // Port to serve
    databaseUri: process.env.DATABASE_URI, // URI with database and auth
    encryptionAlgorithm: process.env.ENCRYPTION_ALGORITHM, // Algorithm to be used to encrypt ID's
    encryptionKey: process.env.ENCRYPTION_KEY, // Key used for encryption
};