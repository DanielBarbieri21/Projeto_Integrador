// ===== CONFIGURAÇÕES =====
const API_BASE_URL = 'http://localhost:3000/api';
let tokenAtual = localStorage.getItem('token');

// ===== ELEMENTOS DOM =====
const cadastroForm = document.getElementById('cadastroForm');
const loginForm = document.getElementById('loginForm');
const alterarSenhaForm = document.getElementById('alterarSenhaForm');
const mensagem = document.getElementById('mensagem');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const logoutBtn = document.getElementById('logoutBtn');

// ===== EVENT LISTENERS - TABS =====
tabBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const tabName = btn.dataset.tab;
    abrirAba(tabName);
  });
});

/**
 * Abre uma aba
 */
function abrirAba(tabName) {
  // Remove active de todos os botões e conteúdos
  tabBtns.forEach((btn) => btn.classList.remove('active'));
  tabContents.forEach((content) => content.classList.remove('active'));

  // Adiciona active ao botão e conteúdo clicado
  document
    .querySelector(`[data-tab="${tabName}"]`)
    .classList.add('active');
  document.getElementById(tabName).classList.add('active');

  // Se abrir perfil, carrega dados
  if (tabName === 'perfil') {
    carregarPerfil();
  }
}

// ===== HELPERS =====
/**
 * Exibe mensagem de alerta
 */
function mostrarMensagem(texto, tipo = 'info') {
  mensagem.textContent = texto;
  mensagem.className = `alert alert-${tipo}`;

  // Auto-oculta após 5 segundos
  setTimeout(() => {
    mensagem.className = 'alert alert-hidden';
  }, 5000);
}

/**
 * Armazena token
 */
function armazenarToken(token) {
  tokenAtual = token;
  localStorage.setItem('token', token);
}

/**
 * Remove token
 */
function removerToken() {
  tokenAtual = null;
  localStorage.removeItem('token');
}

/**
 * Faz requisição à API
 */
async function fazerRequisicao(endpoint, opcoes = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...opcoes.headers,
  };

  // Adiciona token se existir
  if (tokenAtual) {
    headers.Authorization = `Bearer ${tokenAtual}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...opcoes,
      headers,
    });

    const dados = await response.json();

    if (!response.ok) {
      const erro = dados.mensagem || 'Erro na requisição';
      throw new Error(erro);
    }

    return dados;
  } catch (error) {
    mostrarMensagem(error.message, 'error');
    throw error;
  }
}

// ===== CADASTRO =====
cadastroForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const senha = document.getElementById('senha').value;

  try {
    const resultado = await fazerRequisicao('/auth/registrar', {
      method: 'POST',
      body: JSON.stringify({ nome, email, senha }),
    });

    armazenarToken(resultado.dados.token);
    mostrarMensagem(resultado.mensagem, 'success');

    cadastroForm.reset();

    // Redireciona para perfil após 2 segundos
    setTimeout(() => {
      abrirAba('perfil');
    }, 1500);
  } catch (error) {
    console.error('Erro ao cadastrar:', error);
  }
});

// ===== LOGIN =====
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('loginEmail').value.trim();
  const senha = document.getElementById('loginSenha').value;

  try {
    const resultado = await fazerRequisicao('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, senha }),
    });

    armazenarToken(resultado.dados.token);
    mostrarMensagem(resultado.mensagem, 'success');

    loginForm.reset();

    // Redireciona para perfil após 2 segundos
    setTimeout(() => {
      abrirAba('perfil');
    }, 1500);
  } catch (error) {
    console.error('Erro ao fazer login:', error);
  }
});

// ===== PERFIL =====
/**
 * Carrega dados do perfil
 */
async function carregarPerfil() {
  if (!tokenAtual) {
    document.getElementById('perfilNaoAutenticado').style.display = 'block';
    document.getElementById('perfilAutenticado').style.display = 'none';
    return;
  }

  try {
    const resultado = await fazerRequisicao('/auth/perfil', {
      method: 'GET',
    });

    document.getElementById('perfilNaoAutenticado').style.display = 'none';
    document.getElementById('perfilAutenticado').style.display = 'block';

    // Exibe dados do usuário
    const card = document.getElementById('dadosUsuario');
    card.innerHTML = `
      <h3>Seu Perfil</h3>
      <div class="user-info">
        <div class="user-info-item">
          <span class="user-info-label">Nome:</span>
          <span class="user-info-value">${resultado.dados.nome}</span>
        </div>
        <div class="user-info-item">
          <span class="user-info-label">E-mail:</span>
          <span class="user-info-value">${resultado.dados.email}</span>
        </div>
        <div class="user-info-item">
          <span class="user-info-label">Membro desde:</span>
          <span class="user-info-value">${new Date(resultado.dados.criado_em).toLocaleDateString('pt-BR')}</span>
        </div>
      </div>
    `;
  } catch (error) {
    document.getElementById('perfilNaoAutenticado').style.display = 'block';
    document.getElementById('perfilAutenticado').style.display = 'none';
    console.error('Erro ao carregar perfil:', error);
  }
}

// ===== ALTERAR SENHA =====
alterarSenhaForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const senhaAtual = document.getElementById('senhaAtual').value;
  const novaSenha = document.getElementById('novaSenha').value;

  try {
    const resultado = await fazerRequisicao('/auth/alterar-senha', {
      method: 'POST',
      body: JSON.stringify({ senhaAtual, novaSenha }),
    });

    mostrarMensagem(resultado.mensagem, 'success');
    alterarSenhaForm.reset();
  } catch (error) {
    console.error('Erro ao alterar senha:', error);
  }
});

// ===== LOGOUT =====
logoutBtn.addEventListener('click', () => {
  removerToken();
  mostrarMensagem('Você foi desconectado', 'info');
  abrirAba('login');
  loginForm.reset();
});

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
  // Verifica se há token ao carregar a página
  if (tokenAtual) {
    abrirAba('perfil');
  }
});
