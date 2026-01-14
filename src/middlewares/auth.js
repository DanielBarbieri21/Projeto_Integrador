const logger = require('../config/logger');
const { extrairToken, verificarToken } = require('../utils/jwt');
const { UnauthorizedError } = require('../utils/errors');

/**
 * Middleware de autenticação JWT
 * Verifica se o usuário está autenticado
 */
const autenticar = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = extrairToken(authHeader);

    if (!token) {
      throw new UnauthorizedError('Token não fornecido');
    }

    const decoded = verificarToken(token);
    req.usuarioId = decoded.id;
    req.usuario = decoded;

    next();
  } catch (error) {
    logger.warn(`Falha na autenticação: ${error.message}`);
    res.status(error.statusCode || 401).json({
      sucesso: false,
      mensagem: error.message || 'Erro na autenticação',
    });
  }
};

/**
 * Middleware opcional de autenticação
 * Não bloqueia se não estiver autenticado
 */
const autenticarOpcional = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = extrairToken(authHeader);

    if (token) {
      const decoded = verificarToken(token);
      req.usuarioId = decoded.id;
      req.usuario = decoded;
      req.autenticado = true;
    } else {
      req.autenticado = false;
    }

    next();
  } catch (error) {
    logger.debug(`Erro opcional na autenticação: ${error.message}`);
    req.autenticado = false;
    next();
  }
};

module.exports = {
  autenticar,
  autenticarOpcional,
};
