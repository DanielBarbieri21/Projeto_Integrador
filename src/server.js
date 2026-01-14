require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');

const config = require('./config/environment');
const logger = require('./config/logger');
const { testConnection } = require('./config/database');

const loggerMiddleware = require('./middlewares/logger');
const { tratarErros, naoEncontrado } = require('./middlewares/errors');

const authRoutes = require('./routes/authRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const healthRoutes = require('./routes/healthRoutes');
const docsRoutes = require('./routes/docsRoutes');

const app = express();

// ===== SEGURANÇA =====
app.use(helmet()); // Configura headers de segurança
app.use(cors({ origin: config.cors.origin })); // CORS

// Rate Limiting
const limiter = rateLimit({
  windowMs: config.security.rateLimitWindow * 60 * 1000, // minutos
  max: config.security.rateLimitMaxRequests,
  message: 'Muitas requisições deste IP, tente novamente mais tarde',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

// ===== MIDDLEWARES =====
app.use(express.json({ limit: '10kb' })); // Limita tamanho do body
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(loggerMiddleware); // Logging

// ===== ARQUIVOS ESTÁTICOS =====
app.use(express.static(path.join(__dirname, '../public')));

// ===== ROTAS DA API =====
app.use('/api/health', healthRoutes);
app.use('/api/docs', docsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuarioRoutes);

// ===== ROTA PRINCIPAL (SPA) =====
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// ===== TRATAMENTO DE ERROS =====
app.use(naoEncontrado); // 404
app.use(tratarErros); // Erro global

// ===== INICIALIZAÇÃO =====
const iniciarServidor = async () => {
  try {
    // Testa conexão com BD
    const bdConectado = await testConnection();
    if (!bdConectado) {
      throw new Error('Falha ao conectar ao banco de dados');
    }

    // Inicia o servidor
    app.listen(config.port, () => {
      logger.info(`
╔════════════════════════════════════════════╗
║     Projeto Integrador - Servidor Ativo    ║
╠════════════════════════════════════════════╣
║  📍 Servidor: http://localhost:${config.port}${' '.repeat(config.port.toString().length > 4 ? 0 : 4 - config.port.toString().length)}║
║  🌍 Ambiente: ${config.nodeEnv}${' '.repeat(15 - config.nodeEnv.length)}║
║  📚 API Docs: http://localhost:${config.port}/api/docs${' '.repeat(config.port.toString().length > 4 ? 0 : 0)}║
╚════════════════════════════════════════════╝
      `);
    });
  } catch (error) {
    logger.error('Erro ao iniciar servidor:', error.message);
    process.exit(1);
  }
};

// Tratamento de erros não capturados
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Promise rejeitada não tratada:', reason);
});

process.on('uncaughtException', (error) => {
  logger.error('Exceção não capturada:', error);
  process.exit(1);
});

iniciarServidor();

module.exports = app;
