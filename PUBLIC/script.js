document.addEventListener("DOMContentLoaded", function () {
    const cadastroForm = document.getElementById('cadastroForm');
    const loginForm = document.getElementById('loginForm');
    const mensagem = document.getElementById('mensagem');

    // Armazenar usuários em um array (para fins de demonstração)
    let usuarios = [];

    // Função para cadastrar o usuário
    cadastroForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;

        // Verificar se o usuário já existe
        const usuarioExistente = usuarios.find(usuario => usuario.email === email);
        if (usuarioExistente) {
            mensagem.textContent = 'Usuário já cadastrado!';
            return;
        }

        // Cadastrar novo usuário (hashing de senha poderia ser feito no backend)
        const novoUsuario = { nome, email, senha };
        usuarios.push(novoUsuario);

        mensagem.textContent = 'Usuário cadastrado com sucesso!';
        cadastroForm.reset();
    });

    // Função para realizar login do usuário
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.getElementById('loginEmail').value;
        const senha = document.getElementById('loginSenha').value;

        // Procurar o usuário no array
        const usuarioEncontrado = usuarios.find(usuario => usuario.email === email && usuario.senha === senha);

        if (usuarioEncontrado) {
            mensagem.textContent = `Bem-vindo, ${usuarioEncontrado.nome}!`;
        } else {
            mensagem.textContent = 'E-mail ou senha incorretos!';
        }

        loginForm.reset();
    });
});
