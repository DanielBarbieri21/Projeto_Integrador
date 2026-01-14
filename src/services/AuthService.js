const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { gerarToken } = require('../utils/jwt');
const config = require('../config/environment');
const logger = require('../config/logger');
const { ConflictError, UnauthorizedError, NotFoundError } = require('../utils/errors');

/**
 * Service de Autenticação
 */
class AuthService {
  /**
   * Registra novo usuário
   */
  static async registrar(nome, email, senha) {
    try {
      // Verifica se email já existe
      const usuarioExistente = await Usuario.encontrarPorEmail(email);
      if (usuarioExistente) {
        throw new ConflictError('E-mail já cadastrado');
      }

      // Hash da senha
      const senhaHash = await bcrypt.hash(senha, config.security.bcryptRounds);

      // Cria o usuário
      const usuario = await Usuario.criar(nome, email, senhaHash);

      // Gera token JWT
      const token = gerarToken(usuario.id);

      logger.info(`Novo usuário registrado: ${usuario.email}`);

      return {
        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
        },
        token,
      };
    } catch (error) {
      logger.error('Erro ao registrar usuário:', error.message);
      throw error;
    }
  }

  /**
   * Realiza login
   */
  static async login(email, senha) {
    try {
      // Busca o usuário
      const usuario = await Usuario.encontrarPorEmail(email);
      if (!usuario) {
        throw new UnauthorizedError('E-mail ou senha incorretos');
      }

      // Verifica senha
      const senhaValida = await bcrypt.compare(senha, usuario.senha_hash);
      if (!senhaValida) {
        throw new UnauthorizedError('E-mail ou senha incorretos');
      }

      // Gera token JWT
      const token = gerarToken(usuario.id);

      logger.info(`Login realizado: ${usuario.email}`);

      return {
        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
        },
        token,
      };
    } catch (error) {
      logger.error('Erro ao fazer login:', error.message);
      throw error;
    }
  }

  /**
   * Obtém perfil do usuário autenticado
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
   * Atualiza perfil do usuário
   */
  static async atualizarPerfil(usuarioId, nome, email) {
    try {
      // Verifica se novo email já está em uso
      if (email) {
        const usuarioExistente = await Usuario.encontrarPorEmail(email);
        if (usuarioExistente && usuarioExistente.id !== usuarioId) {
          throw new ConflictError('E-mail já cadastrado');
        }
      }

      const usuarioAtualizado = await Usuario.atualizar(usuarioId, nome, email);
      logger.info(`Perfil atualizado: ${usuarioAtualizado.email}`);

      return usuarioAtualizado;
    } catch (error) {
      logger.error('Erro ao atualizar perfil:', error.message);
      throw error;
    }
  }

  /**
   * Altera senha do usuário
   */
  static async alterarSenha(usuarioId, senhaAtual, novaSenha) {
    try {
      const usuario = await Usuario.encontrarPorId(usuarioId);
      if (!usuario) {
        throw new NotFoundError('Usuário não encontrado');
      }

      // Busca com hash para verificar
      const usuarioComSenha = await Usuario.encontrarPorEmail(usuario.email);
      const senhaValida = await bcrypt.compare(senhaAtual, usuarioComSenha.senha_hash);
      if (!senhaValida) {
        throw new UnauthorizedError('Senha atual incorreta');
      }

      // Hash da nova senha
      const novaSenhaHash = await bcrypt.hash(novaSenha, config.security.bcryptRounds);

      // Atualiza senha no BD (adicionar campo na migration)
      await Usuario.pool.query(
        'UPDATE usuarios SET senha_hash = $1, atualizado_em = NOW() WHERE id = $2',
        [novaSenhaHash, usuarioId]
      );

      logger.info(`Senha alterada: ${usuario.email}`);

      return { mensagem: 'Senha alterada com sucesso' };
    } catch (error) {
      logger.error('Erro ao alterar senha:', error.message);
      throw error;
    }
  }
}

module.exports = AuthService;
