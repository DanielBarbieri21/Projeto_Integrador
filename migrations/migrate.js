require('dotenv').config();
const { Pool } = require('pg');

// Configuração do pool
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'postgres',
});

/**
 * Executar todas as migrations
 */
const executarMigrations = async () => {
  const client = await pool.connect();

  try {
    console.log('Iniciando migrations...');

    // Migration 001: Criar tabela de usuários
    await client.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(120) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        senha_hash VARCHAR(255) NOT NULL,
        criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Índice para melhorar buscas por email
      CREATE INDEX IF NOT EXISTS idx_usuarios_email ON usuarios(email);
    `);

    console.log('✓ Migration 001: Tabela de usuários criada');

    console.log('✓ Todas as migrations executadas com sucesso');
  } catch (error) {
    console.error('Erro ao executar migrations:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
};

// Executar se for chamado diretamente
if (require.main === module) {
  executarMigrations()
    .then(() => {
      console.log('Migrations finalizadas');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Falha nas migrations:', error.message);
      process.exit(1);
    });
}

module.exports = { executarMigrations };
