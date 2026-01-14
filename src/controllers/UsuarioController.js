const UsuarioService = require('../services/UsuarioService');
const logger = require('../config/logger');

/**
 * Controller de Usuários
 */
class UsuarioController {
  /**
   * GET /usuarios/:id
   */
  static async obter(req, res, next) {
    try {
      const { id } = req.params;

      const usuario = await UsuarioService.obterPerfil(id);

      res.status(200).json({
        sucesso: true,
        dados: usuario,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /usuarios
   */
  static async listar(req, res, next) {
    try {
      const pagina = parseInt(req.query.pagina, 10) || 1;
      const limite = parseInt(req.query.limite, 10) || 10;

      const resultado = await UsuarioService.listarTodos(pagina, limite);

      res.status(200).json({
        sucesso: true,
        dados: resultado,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /usuarios/:id
   */
  static async deletar(req, res, next) {
    try {
      const { id } = req.params;

      const resultado = await UsuarioService.deletar(id);

      res.status(200).json({
        sucesso: true,
        mensagem: resultado.mensagem,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UsuarioController;
