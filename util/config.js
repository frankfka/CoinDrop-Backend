// Retrieves all environment variables
if (process.env.NODE_ENV !== 'production') {
    const envFile = require('path').resolve(process.cwd(), '.env');
    const dotenv = require('dotenv');
    dotenv.config({path: envFile});
}
module.exports = {
    logEnv: process.env.LOG_FORMAT, // For logger
    port: process.env.PORT, // Port to serve
    databaseUri: process.env.DATABASE_URI, // URI with database and auth
    encryptionAlgorithm: process.env.ENCRYPTION_ALGORITHM, // Algorithm to be used to encrypt ID's
    encryptionKey: process.env.ENCRYPTION_KEY, // Key used for encryption
    coinDetailsApiKey: process.env.COIN_DETAILS_API_KEY, // Key used to call CryptoCompare
    configVersion: process.env.CONFIG_VERSION // Backend config version
};