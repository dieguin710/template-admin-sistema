// Selecionar o formulário de login.
const form = document.querySelector('#login-form');

// Selecionar os campos de e-mail e senha.
const email = document.querySelector('#login-email');
const password = document.querySelector('#login-password');

// 2. EVENTO DO FORMULÁRIO

// Escutar o evento de envio do formulário.
// Quando o usuário clicar em entrar, chamar a função loginUser.
if (form) {
  form.addEventListener('submit', loginUser);
}

// 3. FUNÇÃO DE LOGIN
function loginUser(e) {
  // Impedir que a página seja recarregada ao enviar o formulário.
  e.preventDefault();

  // Capturar os valores digitados e remover espaços nas extremidades.
  const emailDigitado = email.value.trim();
  const senhaDigitada = password.value;

  // Validar se os campos foram preenchidos.
  // Se algum campo estiver vazio, avisar o usuário e interromper.
  if (emailDigitado === '' || senhaDigitada === '') {
    alert('Preencha os campos para prosseguir.');
    return;
  }

  // Verificar se o e-mail e a senha correspondem às credenciais de teste.
  // E-mail: aluno@fullstack.dev
  // Senha: 123456
  if (emailDigitado === 'aluno@fullstack.dev' && senhaDigitada === '123456') {
    // Exibir uma mensagem de boas-vindas no console.
    console.log(`Seja bem-vindo, ${emailDigitado}!`);

    // Redirecionar o usuário para o painel.
    window.location.href = 'pages/dashboard/dashboard.html';
  } else {
    // Informar quando as credenciais estiverem incorretas.
    alert('E-mail ou senha incorretos.');
  }
}
