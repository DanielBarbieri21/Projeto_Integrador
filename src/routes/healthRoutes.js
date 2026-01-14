const express = require('express');

const router = express.Router();

/**
 * GET /api/health
 * Health check da API
 */
router.get('/health', (req, res) => {
  res.status(200).json({
    sucesso: true,
    mensagem: 'API está funcionando',
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
