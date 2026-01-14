const winston = require('winston');

/**
 * Configuração do sistema de logging com Winston
 */
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  defaultMeta: { service: 'projeto-integrador' },
  transports: [
    // Arquivo para erros
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),
    // Arquivo para todos os logs
    new winston.transports.File({
      filename: 'logs/combined.log',
    }),
  ],
});

// Em desenvolvimento, também registra no console
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(({ level, message, timestamp }) => {
          return `${timestamp} [${level}]: ${message}`;
        })
      ),
    })
  );
}

module.exports = logger;
