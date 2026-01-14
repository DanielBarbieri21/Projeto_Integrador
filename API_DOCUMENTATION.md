# API Documentation

## Base URL
```
http://localhost:3000/api
```

## Authentication
Todas as rotas que requerem autenticação usam Bearer Token no header:
```
Authorization: Bearer <seu_token_jwt>
```

## Endpoints

### Health Check

#### GET /health
Verifica o status da API

**Response (200 OK)**
```json
{
  "sucesso": true,
  "mensagem": "API está funcionando",
  "timestamp": "2026-01-14T10:30:00.000Z"
}
```

---

### Auth Endpoints

#### POST /auth/registrar
Registra um novo usuário

**Body**
```json
{
  "nome": "João Silva",
  "email": "joao@example.com",
  "senha": "SenhaForte@123"
}
```

**Response (201 Created)**
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
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Errors**
- 400: Validação falhou
- 409: E-mail já cadastrado

---

#### POST /auth/login
Faz login de um usuário

**Body**
```json
{
  "email": "joao@example.com",
  "senha": "SenhaForte@123"
}
```

**Response (200 OK)**
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
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Errors**
- 401: E-mail ou senha incorretos

---

#### GET /auth/perfil
Obtém o perfil do usuário autenticado

**Headers**
```
Authorization: Bearer <token>
```

**Response (200 OK)**
```json
{
  "sucesso": true,
  "dados": {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@example.com",
    "criado_em": "2026-01-14T10:30:00.000Z"
  }
}
```

**Errors**
- 401: Token não fornecido ou inválido
- 404: Usuário não encontrado

---

#### PUT /auth/perfil
Atualiza o perfil do usuário autenticado

**Headers**
```
Authorization: Bearer <token>
```

**Body**
```json
{
  "nome": "João Silva Atualizado",
  "email": "novoemail@example.com"
}
```

**Response (200 OK)**
```json
{
  "sucesso": true,
  "mensagem": "Perfil atualizado com sucesso",
  "dados": {
    "id": 1,
    "nome": "João Silva Atualizado",
    "email": "novoemail@example.com"
  }
}
```

**Errors**
- 401: Token não fornecido ou inválido
- 409: E-mail já cadastrado

---

#### POST /auth/alterar-senha
Altera a senha do usuário autenticado

**Headers**
```
Authorization: Bearer <token>
```

**Body**
```json
{
  "senhaAtual": "SenhaAntiga@123",
  "novaSenha": "NovaSenha@456"
}
```

**Response (200 OK)**
```json
{
  "sucesso": true,
  "mensagem": "Senha alterada com sucesso"
}
```

**Errors**
- 401: Senha atual incorreta
- 404: Usuário não encontrado

---

### Usuario Endpoints

#### GET /usuarios
Lista todos os usuários com paginação

**Query Parameters**
- `pagina` (default: 1)
- `limite` (default: 10)

**Response (200 OK)**
```json
{
  "sucesso": true,
  "dados": {
    "usuarios": [
      {
        "id": 1,
        "nome": "João Silva",
        "email": "joao@example.com",
        "criado_em": "2026-01-14T10:30:00.000Z"
      }
    ],
    "total": 1,
    "pagina": 1,
    "limite": 10,
    "totalPaginas": 1
  }
}
```

---

#### GET /usuarios/:id
Obtém dados de um usuário específico

**Response (200 OK)**
```json
{
  "sucesso": true,
  "dados": {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@example.com",
    "criado_em": "2026-01-14T10:30:00.000Z"
  }
}
```

**Errors**
- 404: Usuário não encontrado

---

#### DELETE /usuarios/:id
Deleta um usuário (requer autenticação)

**Headers**
```
Authorization: Bearer <token>
```

**Response (200 OK)**
```json
{
  "sucesso": true,
  "mensagem": "Usuário deletado com sucesso"
}
```

**Errors**
- 401: Token não fornecido ou inválido
- 404: Usuário não encontrado

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Requisição bem-sucedida |
| 201 | Created - Recurso criado |
| 400 | Bad Request - Erro de validação |
| 401 | Unauthorized - Não autenticado |
| 403 | Forbidden - Sem permissão |
| 404 | Not Found - Recurso não encontrado |
| 409 | Conflict - Conflito (ex: email duplicado) |
| 500 | Internal Server Error - Erro do servidor |

---

## Error Response Format

Todos os erros seguem este formato:

```json
{
  "sucesso": false,
  "mensagem": "Descrição do erro",
  "erros": ["Erro 1", "Erro 2"] // Opcional, apenas para validações
}
```

---

## Rate Limiting

A API implementa rate limiting:
- **Limite**: 100 requisições por 15 minutos por IP
- **Header de resposta**: `RateLimit-Remaining`

---

## Exemplos com cURL

### Registrar
```bash
curl -X POST http://localhost:3000/api/auth/registrar \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "email": "joao@example.com",
    "senha": "SenhaForte@123"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@example.com",
    "senha": "SenhaForte@123"
  }'
```

### Obter Perfil
```bash
curl -X GET http://localhost:3000/api/auth/perfil \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

### Listar Usuários
```bash
curl -X GET "http://localhost:3000/api/usuarios?pagina=1&limite=10"
```

---

## Validações

### Senha
- Mínimo 8 caracteres
- Máximo 128 caracteres
- Deve conter letra maiúscula (A-Z)
- Deve conter letra minúscula (a-z)
- Deve conter número (0-9)

### Email
- Deve ser um email válido
- Máximo 255 caracteres

### Nome
- Mínimo 3 caracteres
- Máximo 120 caracteres

---

## Notas Importantes

1. **Tokens JWT** expiram em 7 dias (configurável em .env)
2. **Senhas** são hasheadas com bcrypt (rounds configurável em .env)
3. **Database** utiliza PostgreSQL com índices para otimização
4. **CORS** está configurado para desenvolvimento, ajuste para produção
