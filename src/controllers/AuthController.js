const AuthService = require('../services/AuthService');
const logger = require('../config/logger');

/**
 * Controller de Autenticação
 */
class AuthController {
  /**
   * POST /auth/registrar
   */
  static async registrar(req, res, next) {
    try {
      const { nome, email, senha } = req.body;

      const resultado = await AuthService.registrar(nome, email, senha);

      res.status(201).json({
        sucesso: true,
        mensagem: 'Usuário registrado com sucesso',
        dados: resultado,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /auth/login
   */
  static async login(req, res, next) {
    try {
      const { email, senha } = req.body;

      const resultado = await AuthService.login(email, senha);

      res.status(200).json({
        sucesso: true,
        mensagem: 'Login realizado com sucesso',
        dados: resultado,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /auth/perfil
   */
  static async obterPerfil(req, res, next) {
    try {
      const usuario = await AuthService.obterPerfil(req.usuarioId);

      res.status(200).json({
        sucesso: true,
        dados: usuario,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * PUT /auth/perfil
   */
  static async atualizarPerfil(req, res, next) {
    try {
      const { nome, email } = req.body;

      const usuarioAtualizado = await AuthService.atualizarPerfil(
        req.usuarioId,
        nome,
        email
      );

      res.status(200).json({
        sucesso: true,
        mensagem: 'Perfil atualizado com sucesso',
        dados: usuarioAtualizado,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /auth/alterar-senha
   */
  static async alterarSenha(req, res, next) {
    try {
      const { senhaAtual, novaSenha } = req.body;

      const resultado = await AuthService.alterarSenha(
        req.usuarioId,
        senhaAtual,
        novaSenha
      );

      res.status(200).json({
        sucesso: true,
        mensagem: resultado.mensagem,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
