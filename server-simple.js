require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// ===== SEGURANÇA =====
app.use(helmet());
app.use(cors());

// ===== MIDDLEWARES =====
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== ARQUIVOS ESTÁTICOS =====
app.use(express.static(path.join(__dirname, 'public')));

// ===== ROTA PRINCIPAL =====
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ===== HEALTH CHECK =====
app.get('/api/health', (req, res) => {
  res.json({
    sucesso: true,
    mensagem: '✅ API funcionando! Mas PostgreSQL não está conectado.',
    timestamp: new Date().toISOString(),
  });
});

// ===== ROTA DE TESTE =====
app.post('/api/auth/registrar', (req, res) => {
  res.status(503).json({
    sucesso: false,
    mensagem: '⚠️ PostgreSQL não está conectado. Por favor, inicie o PostgreSQL e execute npm run migrate',
  });
});

app.post('/api/auth/login', (req, res) => {
  res.status(503).json({
    sucesso: false,
    mensagem: '⚠️ PostgreSQL não está conectado. Por favor, inicie o PostgreSQL e execute npm run migrate',
  });
});

// ===== INICIALIZAÇÃO =====
app.listen(port, () => {
  console.log(`
╔════════════════════════════════════════════╗
║  🚀 Servidor Rodando (Modo Simplificado)   ║
╠════════════════════════════════════════════╣
║  📍 URL: http://localhost:${port}           ║
║  🌍 Ambiente: ${process.env.NODE_ENV || 'development'}             ║
║                                            ║
║  ⚠️  ATENÇÃO:                              ║
║  PostgreSQL não está conectado!            ║
║                                            ║
║  📝 Para funcionar completamente:          ║
║  1. Inicie o PostgreSQL                    ║
║  2. Execute: npm run migrate               ║
║  3. Reinicie com: npm run dev              ║
╚════════════════════════════════════════════╝
  `);
});

module.exports = app;
