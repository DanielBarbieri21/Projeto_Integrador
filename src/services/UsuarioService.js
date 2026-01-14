const Usuario = require('../models/Usuario');
const logger = require('../config/logger');
const { NotFoundError } = require('../utils/errors');

/**
 * Service de Usuários
 */
class UsuarioService {
  /**
   * Obtém perfil de um usuário
   */
  static async obterPerfil(usuarioId) {
    try {
      const usuario = await Usuario.encontrarPorId(usuarioId);
      if (!usuario) {
        throw new NotFoundError('Usuário não encontrado');
      }
      return usuario;
    } catch (error) {
      logger.error('Erro ao obter perfil:', error.message);
      throw error;
    }
  }

  /**
   * Lista todos os usuários
   */
  static async listarTodos(pagina, limite) {
    try {
      const resultado = await Usuario.listarTodos(pagina, limite);
      return resultado;
    } catch (error) {
      logger.error('Erro ao listar usuários:', error.message);
      throw error;
    }
  }

  /**
   * Deleta um usuário
   */
  static async deletar(usuarioId) {
    try {
      const usuario = await Usuario.encontrarPorId(usuarioId);
      if (!usuario) {
        throw new NotFoundError('Usuário não encontrado');
      }

      await Usuario.deletar(usuarioId);
      logger.info(`Usuário deletado: ${usuario.email}`);

      return { mensagem: 'Usuário deletado com sucesso' };
    } catch (error) {
      logger.error('Erro ao deletar usuário:', error.message);
      throw error;
    }
  }
}

module.exports = UsuarioService;
