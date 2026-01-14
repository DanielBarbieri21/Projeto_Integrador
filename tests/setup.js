/**
 * Setup para os testes
 */

// Mock das variáveis de ambiente para testes
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret-key-with-32-characters-minimum-length';
process.env.DB_USER = 'postgres';
process.env.DB_PASSWORD = 'postgres';
process.env.DB_HOST = 'localhost';
process.env.DB_PORT = '5432';
process.env.DB_NAME = 'postgres';

// Aumenta o timeout para operações de BD
jest.setTimeout(10000);
