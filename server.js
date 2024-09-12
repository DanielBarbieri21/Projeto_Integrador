const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const path = require('path');
const app = express();
const port = 3000;

// Conexão com o PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres', // Substitua pelo nome correto do banco de dados
  password: '246895',
  port: 5432,
});

// Testa a conexão com o banco de dados
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Erro ao conectar no banco de dados', err.stack);
  }
  console.log('Conectado ao banco de dados PostgreSQL');
  release();
});

// Middleware para tratar JSON e servir arquivos estáticos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve arquivos estáticos da pasta 'public'

// Servir o arquivo HTML na rota principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota de cadastro
app.post('/cadastrar', async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const emailExiste = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (emailExiste.rows.length > 0) {
      return res.status(400).json({ mensagem: 'E-mail já cadastrado!' });
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    const novoUsuario = await pool.query(
      'INSERT INTO users (nome, email, senha_hash) VALUES ($1, $2, $3) RETURNING *',
      [nome, email, senhaHash]
    );

    res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!', usuario: novoUsuario.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao cadastrar usuário' });
  }
});

// Rota de login
app.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (usuario.rows.length === 0) {
      return res.status(401).json({ mensagem: 'E-mail ou senha incorretos!' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.rows[0].senha_hash);
    if (!senhaValida) {
      return res.status(401).json({ mensagem: 'E-mail ou senha incorretos!' });
    }

    res.status(200).json({ mensagem: `Bem-vindo, ${usuario.rows[0].nome}!` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro ao realizar login' });
  }
});

// Inicializa o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
