// 1. REFERÊNCIAS DOS ELEMENTOS HTML
const userForm = document.querySelector('#user-form');
const userName = document.querySelector('#user-name');
const userEmail = document.querySelector('#user-email');
const userAdmin = document.querySelector('#user-admin');

// referenciando os campos da tabela
const table = document.querySelector('#table-users-body');
let linhaEmEdicao = null;

if (userForm) {
  userForm.addEventListener('submit', saveData);
}

function saveData(e) {
  e.preventDefault();

  let name = userName.value.trim();
  let email = userEmail.value.trim();
  let admin = userAdmin && userAdmin.checked ? 'Sim' : 'Não';

  if (linhaEmEdicao) {
    // editando..
    const dados = obterDadosDaLinha(linhaEmEdicao);
    dados[0].textContent = 'Foto';
    dados[1].textContent = name;
    dados[2].textContent = email;
    dados[3].textContent = admin;

    linhaEmEdicao = null;
    alert('Usuário atualizado com sucesso!');
  } else {
    // cadastrando novo..
    const tr = document.createElement('tr');
    tr.innerHTML = `
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
                <button type="button" class="btn-excluir">Excluir</button>
                <button type="button" class="btn-editar">Editar</button>
            </td>
        `;

    const celulas = obterDadosDaLinha(tr);
    celulas[0].textContent = 'Foto';
    celulas[1].textContent = name;
    celulas[2].textContent = email;
    celulas[3].textContent = admin;

    table.appendChild(tr);

    const btnExcluir = tr.querySelector('.btn-excluir');
    const btnEditar = tr.querySelector('.btn-editar');

    btnExcluir.addEventListener('click', () => deletar(tr));
    btnEditar.addEventListener('click', () => editar(tr));

    alert('Usuário cadastrado com sucesso!');
  }

function salvarUsuarios() {}

  userForm.reset();
  atualizarEstatisticas();
}

// Obter os dados das células da linha
function obterDadosDaLinha(tr) {
  return tr.querySelectorAll('td');
}

// Deletar usuário
function deletar(tr) {
  const celulas = obterDadosDaLinha(tr);
  const nomeUsuario = celulas[1] ? celulas[1].textContent : '';
  const confirmDelete = confirm(
    `Deseja realmente excluir o usuário ${nomeUsuario}?`,
  );

  if (confirmDelete) {
    tr.remove();
    alert('Usuário excluído com sucesso!');
    atualizarEstatisticas();
  }
}

// Editar usuário
function editar(tr) {
  linhaEmEdicao = tr;
  const dados = obterDadosDaLinha(tr);
  userName.value = dados[1].textContent;
  userEmail.value = dados[2].textContent;
  userAdmin.checked = dados[3].textContent === 'Sim';
}

// ATUALIZAR AS ESTATÍSTICAS DO PAINEL
function atualizarEstatisticas() {
  const linhas = table.querySelectorAll('tr');
  const total = linhas.length;
  let adminCount = 0;

  linhas.forEach((linha) => {
    const colunas = obterDadosDaLinha(linha);
    if (colunas[3] && colunas[3].textContent === 'Sim') {
      adminCount++;
    }
  });

  const totalUsuarios = document.querySelector('#count-users');
  const totalAdmin = document.querySelector('#count-admins');

  if (totalUsuarios) totalUsuarios.textContent = total;
  if (totalAdmin) totalAdmin.textContent = adminCount;
}
