const { pool } = require('../config/database');
const logger = require('../config/logger');

/**
 * Model de Usuário
 */
class Usuario {
  /**
   * Busca usuário por ID
   */
  static async encontrarPorId(id) {
    try {
      const resultado = await pool.query(
        'SELECT id, nome, email, criado_em FROM usuarios WHERE id = $1',
        [id]
      );
      return resultado.rows[0];
    } catch (error) {
      logger.error('Erro ao buscar usuário por ID:', error);
      throw error;
    }
  }

  /**
   * Busca usuário por email
   */
  static async encontrarPorEmail(email) {
    try {
      const resultado = await pool.query(
        'SELECT id, nome, email, senha_hash, criado_em FROM usuarios WHERE email = $1',
        [email.toLowerCase()]
      );
      return resultado.rows[0];
    } catch (error) {
      logger.error('Erro ao buscar usuário por email:', error);
      throw error;
    }
  }

  /**
   * Cria novo usuário
   */
  static async criar(nome, email, senhaHash) {
    try {
      const resultado = await pool.query(
        'INSERT INTO usuarios (nome, email, senha_hash) VALUES ($1, $2, $3) RETURNING id, nome, email, criado_em',
        [nome, email.toLowerCase(), senhaHash]
      );
      return resultado.rows[0];
    } catch (error) {
      logger.error('Erro ao criar usuário:', error);
      throw error;
    }
  }

  /**
   * Atualiza usuário
   */
  static async atualizar(id, nome, email) {
    try {
      const resultado = await pool.query(
        'UPDATE usuarios SET nome = $1, email = $2, atualizado_em = NOW() WHERE id = $3 RETURNING id, nome, email',
        [nome, email.toLowerCase(), id]
      );
      return resultado.rows[0];
    } catch (error) {
      logger.error('Erro ao atualizar usuário:', error);
      throw error;
    }
  }

  /**
   * Deleta usuário
   */
  static async deletar(id) {
    try {
      const resultado = await pool.query(
        'DELETE FROM usuarios WHERE id = $1 RETURNING id',
        [id]
      );
      return resultado.rows[0];
    } catch (error) {
      logger.error('Erro ao deletar usuário:', error);
      throw error;
    }
  }

  /**
   * Lista todos os usuários (com paginação)
   */
  static async listarTodos(pagina = 1, limite = 10) {
    try {
      const offset = (pagina - 1) * limite;
      
      const usuarios = await pool.query(
        'SELECT id, nome, email, criado_em FROM usuarios ORDER BY criado_em DESC LIMIT $1 OFFSET $2',
        [limite, offset]
      );

      const total = await pool.query('SELECT COUNT(*) FROM usuarios');

      return {
        usuarios: usuarios.rows,
        total: parseInt(total.rows[0].count, 10),
        pagina,
        limite,
        totalPaginas: Math.ceil(parseInt(total.rows[0].count, 10) / limite),
      };
    } catch (error) {
      logger.error('Erro ao listar usuários:', error);
      throw error;
    }
  }
}

module.exports = Usuario;
