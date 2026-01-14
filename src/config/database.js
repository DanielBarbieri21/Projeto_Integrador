const { Pool } = require('pg');
const logger = require('./logger');

/**
 * Configura o pool de conexões PostgreSQL
 */
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'postgres',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Tratamento de erros de conexão
pool.on('error', (err) => {
  logger.error('Erro inesperado no pool de conexões', err);
});

pool.on('connect', () => {
  logger.info('Conexão estabelecida com PostgreSQL');
});

/**
 * Testa a conexão com o banco de dados
 */
const testConnection = async () => {
  try {
    const result = await pool.query('SELECT NOW()');
    logger.info(`✓ PostgreSQL conectado: ${result.rows[0].now}`);
    return true;
  } catch (error) {
    logger.error('✗ Erro ao conectar ao PostgreSQL:', error.message);
    return false;
  }
};

module.exports = {
  pool,
  testConnection,
};
