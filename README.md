# 🔐 Projeto Integrador - Sistema de Autenticação Profissional

Um sistema robusto, escalável e profissional de autenticação e gerenciamento de usuários construído com **Node.js**, **Express** e **PostgreSQL**.

## 📋 Características

✅ **Autenticação JWT** - Tokens seguros e com expiração configurável  
✅ **Senhas com Hash** - Uso de bcrypt com salt rounds configurável  
✅ **Validação Robusta** - Validação de inputs com Joi  
✅ **Segurança** - Helmet, CORS, Rate Limiting  
✅ **Logging Estruturado** - Winston para logs detalhados  
✅ **Tratamento de Erros** - Middleware centralizado de erros  
✅ **Paginação** - Suporte a paginação em listagens  
✅ **Banco de Dados** - PostgreSQL com migrations  
✅ **Frontend Moderno** - Interface responsiva com abas  
✅ **Documentação Completa** - API bem documentada  

## 🚀 Início Rápido

### Pré-requisitos

- **Node.js** 16.0.0 ou superior
- **npm** 8.0.0 ou superior
- **PostgreSQL** 12.0 ou superior

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/DanielBarbieri21/Projeto_Integrador.git
cd Projeto_Integrador
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais:
```env
DB_USER=postgres
DB_PASSWORD=sua_senha
DB_HOST=localhost
DB_PORT=5432
DB_NAME=projeto_integrador
PORT=3000
JWT_SECRET=sua_chave_super_secreta_com_32_caracteres_minimo
```

4. **Execute as migrations**
```bash
npm run migrate
```

5. **Inicie o servidor**
```bash
# Desenvolvimento (com auto-reload)
npm run dev

# Produção
npm start
```

6. **Acesse a aplicação**
```
http://localhost:3000
```

## 📚 Documentação da API

### Autenticação

#### Registrar Novo Usuário
```http
POST /api/auth/registrar
Content-Type: application/json

{
  "nome": "João Silva",
  "email": "joao@example.com",
  "senha": "Senha@123"
}
```

**Resposta (201 Created):**
```json
{
  "sucesso": true,
  "mensagem": "Usuário registrado com sucesso",
  "dados": {
    "usuario": {
      "id": 1,
      "nome": "João Silva",
      "email": "joao@example.com"
    },
    "token": "eyJhbGc..."
  }
}
```

#### Fazer Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "joao@example.com",
  "senha": "Senha@123"
}
```

**Resposta (200 OK):**
```json
{
  "sucesso": true,
  "mensagem": "Login realizado com sucesso",
  "dados": {
    "usuario": {
      "id": 1,
      "nome": "João Silva",
      "email": "joao@example.com"
    },
    "token": "eyJhbGc..."
  }
}
```

#### Obter Perfil (Autenticado)
```http
GET /api/auth/perfil
Authorization: Bearer <token>
```

**Resposta (200 OK):**
```json
{
  "sucesso": true,
  "dados": {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@example.com",
    "criado_em": "2026-01-14T10:30:00Z"
  }
}
```

#### Alterar Senha (Autenticado)
```http
POST /api/auth/alterar-senha
Authorization: Bearer <token>
Content-Type: application/json

{
  "senhaAtual": "Senha@123",
  "novaSenha": "NovaSenha@456"
}
```

### Usuários

#### Listar Usuários
```http
GET /api/usuarios?pagina=1&limite=10
```

**Resposta (200 OK):**
```json
{
  "sucesso": true,
  "dados": {
    "usuarios": [
      {
        "id": 1,
        "nome": "João Silva",
        "email": "joao@example.com",
        "criado_em": "2026-01-14T10:30:00Z"
      }
    ],
    "total": 1,
    "pagina": 1,
    "limite": 10,
    "totalPaginas": 1
  }
}
```

#### Obter Usuário Específico
```http
GET /api/usuarios/1
```

#### Deletar Usuário (Autenticado)
```http
DELETE /api/usuarios/1
Authorization: Bearer <token>
```

## 📁 Estrutura do Projeto

```
Projeto_Integrador/
├── src/
│   ├── config/           # Configurações (BD, logger, env)
│   ├── controllers/      # Controladores de requisições
│   ├── middlewares/      # Middlewares (auth, erros, logger)
│   ├── models/           # Models de dados
│   ├── routes/           # Definição de rotas
│   ├── services/         # Lógica de negócio
│   ├── utils/            # Utilitários (validators, JWT, errors)
│   └── server.js         # Arquivo principal
├── public/               # Frontend (HTML, CSS, JS)
├── migrations/           # Migrations do BD
├── tests/                # Testes unitários
├── logs/                 # Arquivos de log
├── .env.example          # Exemplo de variáveis de ambiente
├── package.json          # Dependências
└── README.md             # Este arquivo
```

## 🔐 Segurança

### Implementações de Segurança

- **Helmet.js** - Define headers de segurança HTTP
- **CORS** - Controle de acesso entre domínios
- **Rate Limiting** - Limite de requisições por IP
- **Bcrypt** - Hashing de senhas com salt
- **JWT** - Tokens com expiração
- **Validação Joi** - Validação de inputs
- **HTTPS Ready** - Pronto para produção com SSL/TLS

### Requisitos de Senha

- Mínimo 8 caracteres
- Máximo 128 caracteres
- Deve conter letra maiúscula
- Deve conter letra minúscula
- Deve conter número

## 🧪 Testes

```bash
# Executar todos os testes
npm test

# Testes com cobertura
npm test -- --coverage

# Testes em modo watch
npm run test:watch
```

## 📝 Scripts Disponíveis

```bash
npm start              # Inicia o servidor em produção
npm run dev            # Inicia o servidor com nodemon
npm test               # Executa os testes
npm run test:watch     # Executa testes em modo watch
npm run lint           # Executa ESLint
npm run migrate        # Executa as migrations
npm run migrate:rollback # Reverte as migrations
```

## 🌳 Variáveis de Ambiente

| Variável | Padrão | Descrição |
|----------|--------|-----------|
| `NODE_ENV` | development | Ambiente (development/production) |
| `PORT` | 3000 | Porta do servidor |
| `DB_USER` | postgres | Usuário do PostgreSQL |
| `DB_PASSWORD` | - | Senha do PostgreSQL |
| `DB_HOST` | localhost | Host do PostgreSQL |
| `DB_PORT` | 5432 | Porta do PostgreSQL |
| `DB_NAME` | postgres | Nome do banco de dados |
| `JWT_SECRET` | - | Chave secreta para JWT (mín. 32 caracteres) |
| `JWT_EXPIRATION` | 7d | Tempo de expiração do token |
| `LOG_LEVEL` | info | Nível de logging |
| `CORS_ORIGIN` | http://localhost:3000 | Origem CORS permitida |
| `BCRYPT_ROUNDS` | 10 | Rounds do bcrypt |
| `RATE_LIMIT_WINDOW` | 15 | Janela de rate limiting (minutos) |
| `RATE_LIMIT_MAX_REQUESTS` | 100 | Máximo de requisições na janela |

## 🐛 Troubleshooting

### Erro: "Variáveis de ambiente ausentes"
Certifique-se de ter copiado `.env.example` para `.env` e preenchido todos os valores obrigatórios.

### Erro: "Falha ao conectar ao PostgreSQL"
Verifique se o PostgreSQL está rodando e se as credenciais em `.env` estão corretas.

### Erro: "JWT_SECRET deve ter pelo menos 32 caracteres"
Gere uma chave segura com:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 📦 Dependências Principais

- **express** - Framework web
- **pg** - Cliente PostgreSQL
- **bcryptjs** - Hashing de senhas
- **jsonwebtoken** - Geração e verificação de JWT
- **joi** - Validação de schemas
- **helmet** - Segurança HTTP
- **cors** - CORS middleware
- **express-rate-limit** - Rate limiting
- **winston** - Logging estruturado
- **dotenv** - Variáveis de ambiente

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request



   ---

🛠️ **Software desenvolvido por Daniel Barbieri**  
Engenheiro de Software | Full Stack Developer  

Código construído com foco em eficiência, organização, escalabilidade e boas práticas de desenvolvimento.

🌐 GitHub: https://github.com/DanielBarbieri21  
💼 LinkedIn: https://www.linkedin.com/in/daniel-barbieri-4990462a/

---



## 🙏 Agradecimentos

- Comunidade Node.js
- Contributors
- Inspiração em boas práticas de desenvolvimento

---

<div align="center">

⭐ Se este projeto foi útil, considere dar uma estrela! ⭐

</div>
