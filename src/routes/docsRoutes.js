const express = require('express');
const path = require('path');

const router = express.Router();

/**
 * GET /api/docs
 * Retorna informações sobre a documentação da API
 */
router.get('/', (req, res) => {
  res.status(200).json({
    sucesso: true,
    mensagem: 'Documentação da API',
    documentacao: {
      'README.md': '/README.md',
      'API_DOCUMENTATION.md': '/API_DOCUMENTATION.md',
      'QUICK_START.md': '/QUICK_START.md',
    },
    endpoints: {
      health: 'GET /api/health',
      auth: {
        registrar: 'POST /api/auth/registrar',
        login: 'POST /api/auth/login',
        perfil: 'GET /api/auth/perfil (requer autenticação)',
        atualizarPerfil: 'PUT /api/auth/perfil (requer autenticação)',
        alterarSenha: 'POST /api/auth/alterar-senha (requer autenticação)',
      },
      usuarios: {
        listar: 'GET /api/usuarios',
        obter: 'GET /api/usuarios/:id',
        deletar: 'DELETE /api/usuarios/:id (requer autenticação)',
      },
    },
    exemplos: {
      registrar: {
        url: 'POST /api/auth/registrar',
        body: {
          nome: 'João Silva',
          email: 'joao@example.com',
          senha: 'SenhaForte@123',
        },
      },
      login: {
        url: 'POST /api/auth/login',
        body: {
          email: 'joao@example.com',
          senha: 'SenhaForte@123',
        },
      },
    },
  });
});

module.exports = router;
