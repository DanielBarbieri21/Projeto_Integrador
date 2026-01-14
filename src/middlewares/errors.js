const logger = require('../config/logger');

/**
 * Middleware de tratamento de erros centralizado
 */
const tratarErros = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const mensagem = err.message || 'Erro interno do servidor';

  // Log do erro
  const nivelLog = statusCode >= 500 ? 'error' : 'warn';
  logger[nivelLog](`[${req.method} ${req.path}] ${statusCode} - ${mensagem}`, {
    stack: err.stack,
    body: req.body,
  });

  // Resposta padronizada
  res.status(statusCode).json({
    sucesso: false,
    mensagem,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

/**
 * Middleware para erros de rota não encontrada
 */
const naoEncontrado = (req, res) => {
  res.status(404).json({
    sucesso: false,
    mensagem: `Rota ${req.method} ${req.path} não encontrada`,
  });
};

module.exports = {
  tratarErros,
  naoEncontrado,
};
