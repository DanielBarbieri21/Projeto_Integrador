# Contribuindo para o Projeto Integrador

Obrigado por considerar contribuir para o Projeto Integrador! É a dedicação de pessoas como você que faz este projeto tão ótimo.

## Processo de Desenvolvimento

### 1. Fork e Clone
```bash
git clone https://github.com/SEU_USUARIO/Projeto_Integrador.git
cd Projeto_Integrador
```

### 2. Crie uma Branch
```bash
git checkout -b feature/MinhaFeature
```

### 3. Instale as Dependências
```bash
npm install
```

### 4. Faça suas Mudanças
- Escreva código limpo e bem documentado
- Adicione testes para novas funcionalidades
- Siga o estilo de código do projeto

### 5. Teste
```bash
npm test
npm run lint
```

### 6. Commit e Push
```bash
git add .
git commit -m "Adiciona: descrição clara da mudança"
git push origin feature/MinhaFeature
```

### 7. Abra um Pull Request
Descreva suas mudanças e por que elas são necessárias.

## Padrões de Código

### Nomes e Convenções
- **Variáveis e Funções**: camelCase
- **Classes**: PascalCase
- **Constantes**: UPPER_CASE
- **Arquivos**: camelCase ou PascalCase (conforme o tipo)

### Commits
- Use mensagens descritivas
- Prefixos: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `test:`, `chore:`

### Exemplos
```bash
git commit -m "feat: adiciona autenticação JWT"
git commit -m "fix: corrige validação de email"
git commit -m "docs: atualiza README"
```

## Reportando Bugs

1. Verifique se o bug já foi reportado
2. Descreva o comportamento esperado vs. o atual
3. Forneça exemplos para reproduzir
4. Mencione sua versão do Node.js e SO

## Sugestões de Melhorias

- Use títulos claros e descritivos
- Forneça exemplos específicos
- Explique o comportamento esperado

## Perguntas

- Use GitHub Issues para perguntas
- Procure por respostas existentes primeiro

---

Obrigado por contribuir! 🎉
