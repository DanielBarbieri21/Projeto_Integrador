const express = require('express');
const AuthController = require('../controllers/AuthController');
const { validate, authSchemas } = require('../utils/validators');
const { autenticar } = require('../middlewares/auth');

const router = express.Router();

/**
 * POST /auth/registrar
 * Registra novo usuário
 */
router.post(
  '/registrar',
  validate(authSchemas.register),
  AuthController.registrar
);

/**
 * POST /auth/login
 * Realiza login
 */
router.post(
  '/login',
  validate(authSchemas.login),
  AuthController.login
);

/**
 * GET /auth/perfil
 * Obtém perfil do usuário autenticado
 */
router.get(
  '/perfil',
  autenticar,
  AuthController.obterPerfil
);

/**
 * PUT /auth/perfil
 * Atualiza perfil do usuário
 */
router.put(
  '/perfil',
  autenticar,
  AuthController.atualizarPerfil
);

/**
 * POST /auth/alterar-senha
 * Altera senha do usuário
 */
router.post(
  '/alterar-senha',
  autenticar,
  AuthController.alterarSenha
);

module.exports = router;
