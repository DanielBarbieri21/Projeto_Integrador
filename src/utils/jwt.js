const jwt = require('jsonwebtoken');
const config = require('../config/environment');
const logger = require('../config/logger');

/**
 * Gera um token JWT
 */
const gerarToken = (usuarioId) => {
  try {
    const token = jwt.sign(
      { id: usuarioId },
      config.jwt.secret,
      { expiresIn: config.jwt.expiration }
    );
    return token;
  } catch (error) {
    logger.error('Erro ao gerar token JWT:', error);
    throw error;
  }
};

/**
 * Verifica e decodifica um token JWT
 */
const verificarToken = (token) => {
  try {
    const decoded = jwt.verify(token, config.jwt.secret);
    return decoded;
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new Error('Token expirado');
    }
    if (error.name === 'JsonWebTokenError') {
      throw new Error('Token inválido');
    }
    throw error;
  }
};

/**
 * Extrai o token do header Authorization
 */
const extrairToken = (authHeader) => {
  if (!authHeader) return null;

  const partes = authHeader.split(' ');
  if (partes.length !== 2 || partes[0] !== 'Bearer') {
    return null;
  }

  return partes[1];
};

module.exports = {
  gerarToken,
  verificarToken,
  extrairToken,
};
