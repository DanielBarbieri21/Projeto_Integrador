document.addEventListener("DOMContentLoaded", function () {
    const cadastroForm = document.getElementById('cadastroForm');
    const loginForm = document.getElementById('loginForm');
    const mensagem = document.getElementById('mensagem');

    // Função para cadastrar o usuário
    cadastroForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;

        fetch('/cadastrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome, email, senha }),
        })
        .then(response => response.json())
        .then(data => {
            mensagem.textContent = data.mensagem;
            cadastroForm.reset();
        })
        .catch(error => {
            console.error('Erro:', error);
            mensagem.textContent = 'Erro ao cadastrar usuário';
        });
    });

    // Função para realizar login do usuário
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.getElementById('loginEmail').value;
        const senha = document.getElementById('loginSenha').value;

        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, senha }),
        })
        .then(response => response.json())
        .then(data => {
            mensagem.textContent = data.mensagem;
            loginForm.reset();
        })
        .catch(error => {
            console.error('Erro:', error);
            mensagem.textContent = 'Erro ao realizar login';
        });
    });
});
