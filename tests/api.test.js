const request = require('supertest');
const app = require('../src/server');

describe('Health Check', () => {
  test('GET /api/health deve retornar status 200', async () => {
    const response = await request(app).get('/api/health');

    expect(response.status).toBe(200);
    expect(response.body.sucesso).toBe(true);
    expect(response.body.mensagem).toBe('API está funcionando');
  });
});

describe('Autenticação', () => {
  test('POST /api/auth/registrar com dados válidos', async () => {
    const novoUsuario = {
      nome: 'Teste User',
      email: `teste${Date.now()}@example.com`,
      senha: 'TesteSenha@123',
    };

    const response = await request(app)
      .post('/api/auth/registrar')
      .send(novoUsuario);

    expect(response.status).toBe(201);
    expect(response.body.sucesso).toBe(true);
    expect(response.body.dados.usuario.email).toBe(novoUsuario.email);
    expect(response.body.dados.token).toBeDefined();
  });

  test('POST /api/auth/registrar com email duplicado deve retornar erro', async () => {
    const usuario = {
      nome: 'Teste User',
      email: `duplicado${Date.now()}@example.com`,
      senha: 'TesteSenha@123',
    };

    // Primeiro registro
    await request(app).post('/api/auth/registrar').send(usuario);

    // Tentativa de duplicar
    const response = await request(app)
      .post('/api/auth/registrar')
      .send(usuario);

    expect(response.status).toBe(409);
    expect(response.body.sucesso).toBe(false);
  });

  test('POST /api/auth/login com credenciais válidas', async () => {
    const usuario = {
      nome: 'Login Test',
      email: `login${Date.now()}@example.com`,
      senha: 'LoginSenha@123',
    };

    // Registra
    await request(app).post('/api/auth/registrar').send(usuario);

    // Faz login
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: usuario.email,
        senha: usuario.senha,
      });

    expect(response.status).toBe(200);
    expect(response.body.sucesso).toBe(true);
    expect(response.body.dados.token).toBeDefined();
  });

  test('POST /api/auth/login com senha incorreta', async () => {
    const usuario = {
      nome: 'Wrong Password Test',
      email: `wrongpass${Date.now()}@example.com`,
      senha: 'CorrectSenha@123',
    };

    // Registra
    await request(app).post('/api/auth/registrar').send(usuario);

    // Tenta login com senha errada
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: usuario.email,
        senha: 'WrongSenha@123',
      });

    expect(response.status).toBe(401);
    expect(response.body.sucesso).toBe(false);
  });
});

describe('Usuários', () => {
  test('GET /api/usuarios deve retornar lista de usuários', async () => {
    const response = await request(app).get('/api/usuarios');

    expect(response.status).toBe(200);
    expect(response.body.sucesso).toBe(true);
    expect(Array.isArray(response.body.dados.usuarios)).toBe(true);
    expect(response.body.dados).toHaveProperty('total');
    expect(response.body.dados).toHaveProperty('pagina');
    expect(response.body.dados).toHaveProperty('limite');
  });
});
