const pino = require('pino');
const pinoExpress = require('express-pino-logger');
const { logFormat } = require('./configUtil');

const stdLogger = pino({
  // Either pass a pino-pretty config object or false
  prettyPrint: logFormat === 'dev' ? {
    translateTime: true,
    levelFirst: true,
    ignore: 'pid,hostname',
  } : false,
});

const reqLogger = pinoExpress({ logger: stdLogger });

module.exports = { logger: stdLogger, reqLogger };
