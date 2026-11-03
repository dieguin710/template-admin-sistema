// 1. REFERÊNCIAS DOS ELEMENTOS HTML
const userForm = document.querySelector('#user-form');
const userName = document.querySelector('#user-name');
const userEmail = document.querySelector('#user-email');
const userAdmin = document.querySelector('#user-admin');

// referenciando os campos da tabela
const table = document.querySelector('#table-users-body');
let linhaEmEdicao = null;

// Inicialização: Carrega os dados salvos ao abrir a página
document.addEventListener('DOMContentLoaded', carregarDadosDoLocalStorage);

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
        adicionarLinhaNaTabela(name, email, admin);
        alert('Usuário cadastrado com sucesso!');
    }

    userForm.reset();
    atualizarEstatisticasESalvar();

}

// Função auxiliar para criar e injetar a linha na tabela HTML
function adicionarLinhaNaTabela(name, email, admin) {
const tr = document.createElement('tr');
tr.innerHTML = `         <td>Foto</td>
        <td>${name}</td>
        <td>${email}</td>
        <td>${admin}</td>
        <td>
            <button type="button" class="btn-excluir">Excluir</button>
            <button type="button" class="btn-editar">Editar</button>
        </td>
    `;

    const btnExcluir = tr.querySelector('.btn-excluir');
    const btnEditar = tr.querySelector('.btn-editar');

    btnExcluir.addEventListener('click', () => deletar(tr));
    btnEditar.addEventListener('click', () => editar(tr));

    table.appendChild(tr);

}

// Obter os dados das células da linha
function obterDadosDaLinha(tr) {
return tr.querySelectorAll('td');
}

// Deletar usuário
function deletar(tr) {
const celulas = obterDadosDaLinha(tr);
const nomeUsuario = celulas ? celulas[1].textContent : "";
const confirmDelete = confirm(`Deseja realmente excluir o usuário ${nomeUsuario}?`);

    if (confirmDelete) {
        tr.remove();
        alert('Usuário excluído com sucesso!');
        atualizarEstatisticasESalvar();
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

// MÓDULO DE PERSISTÊNCIA: Salva a tabela atual no LocalStorage
function salvarNoLocalStorage() {
const linhas = table.querySelectorAll('tr');
const usuarios = [];

    linhas.forEach((linha) => {
        const colunas = obterDadosDaLinha(linha);
        if (colunas && colunas.length >= 4) {
            usuarios.push({
                name: colunas[1].textContent,
                email: colunas[2].textContent,
                admin: colunas[3].textContent
            });
        }
    });

    localStorage.setItem('usuarios_dashboard', JSON.stringify(usuarios));

}

// MÓDULO DE PERSISTÊNCIA: Recupera os dados ao atualizar a página
function carregarDadosDoLocalStorage() {
const dadosSalvos = localStorage.getItem('usuarios_dashboard');
if (dadosSalvos) {
const usuarios = JSON.parse(dadosSalvos);
table.innerHTML = ''; // Limpa a tabela antes de reconstruir
usuarios.forEach(user => {
adicionarLinhaNaTabela(user.name, user.email, user.admin);
});
}
atualizarEstatisticas(); // Calcula os totais iniciais
}

// Atualiza o painel visual e grava as alterações no disco local
function atualizarEstatisticasESalvar() {
atualizarEstatisticas();
salvarNoLocalStorage();
}

// ATUALIZAR AS ESTATÍSTICAS DO PAINEL
function atualizarEstatisticas() {
const linhas = table.querySelectorAll('tr');
const total = linhas.length;
let adminCount = 0;

    linhas.forEach((linha) => {
        const colunas = obterDadosDaLinha(linha);
        if (colunas && colunas[3] && colunas[3].textContent === 'Sim') {
            adminCount++;
        }
    });

    const totalUsuarios = document.querySelector('#count-users');
    const totalAdmin = document.querySelector('#count-admins');

    if (totalUsuarios) totalUsuarios.textContent = total;
    if (totalAdmin) totalAdmin.textContent = adminCount;

}
