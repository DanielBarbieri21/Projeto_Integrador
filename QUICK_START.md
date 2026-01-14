# 🚀 Guia de Início Rápido

## 1️⃣ Pré-requisitos

Certifique-se de ter instalado:
- **Node.js** (v16 ou superior): https://nodejs.org/
- **PostgreSQL** (v12 ou superior): https://www.postgresql.org/

## 2️⃣ Instalação Básica

```bash
# Clone o repositório
git clone https://github.com/DanielBarbieri21/Projeto_Integrador.git
cd Projeto_Integrador

# Instale as dependências
npm install
```

## 3️⃣ Configuração do Banco de Dados

### PostgreSQL (Windows)
1. Abra o pgAdmin (incluído no PostgreSQL)
2. Crie um novo banco chamado `projeto_integrador`
3. Anote o usuário (padrão: `postgres`) e senha

### Alternativa (Comando SQL)
```bash
psql -U postgres
CREATE DATABASE projeto_integrador;
\q
```

## 4️⃣ Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```bash
cp .env.example .env
```

Edite o `.env` com suas credenciais PostgreSQL:

```env
DB_USER=postgres
DB_PASSWORD=sua_senha_aqui
DB_HOST=localhost
DB_PORT=5432
DB_NAME=projeto_integrador
PORT=3000
JWT_SECRET=gere_uma_chave_secreta_aqui_minimo_32_caracteres
```

**Para gerar uma chave JWT segura:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 5️⃣ Executar as Migrations

```bash
npm run migrate
```

Isso criará as tabelas necessárias no banco de dados.

## 6️⃣ Iniciar o Servidor

```bash
# Desenvolvimento (com reload automático)
npm run dev

# Produção
npm start
```

Você verá algo como:
```
╔════════════════════════════════════════════╗
║     Projeto Integrador - Servidor Ativo    ║
╠════════════════════════════════════════════╣
║  📍 Servidor: http://localhost:3000        ║
║  🌍 Ambiente: development                  ║
║  📚 API Docs: http://localhost:3000/api/docs║
╚════════════════════════════════════════════╝
```

## 7️⃣ Acessar a Aplicação

Abra seu navegador e vá para:
```
http://localhost:3000
```

## 8️⃣ Primeiro Teste

1. Clique em **"Cadastro"**
2. Preencha os dados:
   - Nome: `João Silva`
   - E-mail: `joao@example.com`
   - Senha: `SenhaForte@123` (deve ter maiúscula, minúscula e número)
3. Clique em **"Criar Conta"**

Se tudo deu certo, você verá a mensagem de sucesso e será redirecionado para o perfil!

## 📚 Próximos Passos

- Leia [README.md](README.md) para documentação completa
- Verifique [API_DOCUMENTATION.md](API_DOCUMENTATION.md) para detalhes da API
- Consulte [CONTRIBUTING.md](CONTRIBUTING.md) para contribuir

## ❓ Troubleshooting

### Erro: "Variáveis de ambiente ausentes"
```
Solução: Execute `cp .env.example .env` e preencha os valores
```

### Erro: "Falha ao conectar ao PostgreSQL"
```
Solução:
1. Verifique se PostgreSQL está rodando
2. Confirme as credenciais em .env
3. Teste com: psql -U postgres
```

### Erro: "Porto 3000 já está em uso"
```
Solução:
1. Altere PORT em .env para 3001 (ou outra)
2. Ou mate o processo: lsof -i :3000 | kill -9 [PID]
```

### Erro: "Senha deve conter..."
```
Solução: Senha deve ter:
- Mínimo 8 caracteres
- Letra maiúscula (A-Z)
- Letra minúscula (a-z)
- Número (0-9)
```

## 📞 Suporte

- GitHub Issues: [Abra uma issue](https://github.com/DanielBarbieri21/Projeto_Integrador/issues)
- Email: contato@danielbarbieri.com

---

Happy coding! 🎉
