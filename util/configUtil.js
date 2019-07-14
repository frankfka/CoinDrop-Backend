// Retrieves all environment variables
if (process.env.NODE_ENV !== 'production') {
    const envFile = require('path').resolve(process.cwd(), '.env');
    const dotenv = require('dotenv');
    dotenv.config({path: envFile});
}

// Config
LOG_FORMAT = process.env.LOG_FORMAT ? process.env.LOG_FORMAT : 'common';
PORT = 4000;
CONFIG_VERSION = '1.0.0';
PROFILE_ENCRYPTION_ALGORITHM = 'aes256';
CLIENT_ENCRYPTION_ALGORITHM = 'sha256';

module.exports = {
    logEnv: LOG_FORMAT, // For errorLogger
    port: PORT, // Port to serve
    configVersion: CONFIG_VERSION, // Backend config version
    profileAlgorithm: PROFILE_ENCRYPTION_ALGORITHM, // Algorithm to be used to encrypt ID's
    profileKey: process.env.PROFILE_ENCRYPTION_KEY, // Key used for encryption for profiles
    clientAlgorithm: CLIENT_ENCRYPTION_ALGORITHM, // Algorithm for client validation
    clientSigningKey: process.env.CLIENT_SIGNING_KEY, // Key used to sign client requests
    coinDetailsApiKey: process.env.COIN_DETAILS_API_KEY, // Key used to call CryptoCompare
    databaseUri: process.env.DATABASE_URI, // URI with database and auth
};