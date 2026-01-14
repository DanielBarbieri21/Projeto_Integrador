const express = require('express');
const UsuarioController = require('../controllers/UsuarioController');
const { autenticar } = require('../middlewares/auth');

const router = express.Router();

/**
 * GET /usuarios
 * Lista todos os usuários (com paginação)
 */
router.get('/', UsuarioController.listar);

/**
 * GET /usuarios/:id
 * Obtém dados de um usuário específico
 */
router.get('/:id', UsuarioController.obter);

/**
 * DELETE /usuarios/:id
 * Deleta um usuário (requer autenticação)
 */
router.delete('/:id', autenticar, UsuarioController.deletar);

module.exports = router;
