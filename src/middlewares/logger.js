const logger = require('../config/logger');

/**
 * Middleware de logging de requisições
 */
const loggerMiddleware = (req, res, next) => {
  const inicio = Date.now();

  // Intercepta o método send para logar depois da resposta
  const enviarOriginal = res.send;
  res.send = function (data) {
    const duracao = Date.now() - inicio;
    const statusCode = res.statusCode;
    const nivelLog = statusCode >= 400 ? 'warn' : 'info';

    logger[nivelLog](
      `${req.method} ${req.path} ${statusCode} - ${duracao}ms`
    );

    return enviarOriginal.call(this, data);
  };

  next();
};

module.exports = loggerMiddleware;
