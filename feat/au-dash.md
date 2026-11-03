// Aguarda o DOM carregar completamente antes de rodar as contas
document.addEventListener('DOMContentLoaded', () => {
renderizarDadosDoDashboard();
});

function renderizarDadosDoDashboard() {
// 1. REFERÊNCIAS DOS ELEMENTOS DO SEU HTML
const userCountEl = document.querySelector('#dashboard-user-count');
const productCountEl = document.querySelector('#dashboard-product-count');
const stockCountEl = document.querySelector('#dashboard-stock-count');
const stockValueEl = document.querySelector('#dashboard-stock-value');

// 2. RECUPERAÇÃO DOS DADOS DO LOCALSTORAGE
const usuariosSalvos = localStorage.getItem('usuarios_dashboard');
const produtosSalvos = localStorage.getItem('produtos_dashboard');

// Converte para Array caso existam dados, senão inicia vazio
const listaUsuarios = usuariosSalvos ? JSON.parse(usuariosSalvos) : [];
const listaProdutos = produtosSalvos ? JSON.parse(produtosSalvos) : [];

// 3. CÁLCULO DAS MÉTRICAS
const totalUsuarios = listaUsuarios.length;
const totalProdutosDiferentes = listaProdutos.length;

let totalUnidadesEstoque = 0;
let valorTotalEstoque = 0;

listaProdutos.forEach((produto) => {
// Garante que a quantidade seja um número inteiro
const qtd = Number.parseInt(produto.qty) || 0;

    // Remove "R$ " e limpa espaços antes de converter o preço para float
    const precoLimpo = produto.preco ? produto.preco.replace('R$ ', '').trim() : '0';
    const preco = Number.parseFloat(precoLimpo) || 0;

    // Soma os acumuladores
    totalUnidadesEstoque += qtd;
    valorTotalEstoque += (qtd * preco);

});

// 4. INJEÇÃO DOS DADOS FORMATADOS NO HTML
if (userCountEl) {
userCountEl.textContent = totalUsuarios;
}

if (productCountEl) {
productCountEl.textContent = totalProdutosDiferentes;
}

if (stockCountEl) {
stockCountEl.textContent = totalUnidadesEstoque;
}

if (stockValueEl) {
// Formata o valor financeiro acumulado no padrão de moeda brasileiro (R$ X.XXO,XX)
stockValueEl.textContent = 'R$ ' + valorTotalEstoque.toLocaleString('pt-BR', {
minimumFractionDigits: 2,
maximumFractionDigits: 2
});
}
}

======================segunda opção=============================

// Tudo roda dentro do evento de carregamento do DOM
document.addEventListener('DOMContentLoaded', () => {

// 1. REFERÊNCIAS DOS ELEMENTOS (Mapeadas com segurança)
const userCountEl = document.querySelector('#dashboard-user-count');
const productCountEl = document.querySelector('#dashboard-product-count');
const stockCountEl = document.querySelector('#dashboard-stock-count');
const stockValueEl = document.querySelector('#dashboard-stock-value');

// 2. RECUPERAÇÃO DOS DADOS DO LOCALSTORAGE
const usuariosSalvos = localStorage.getItem('usuarios_dashboard');
const produtosSalvos = localStorage.getItem('produtos_dashboard');

const listaUsuarios = usuariosSalvos ? JSON.parse(usuariosSalvos) : [];
const listaProdutos = produtosSalvos ? JSON.parse(produtosSalvos) : [];

// 3. CÁLCULO DAS MÉTRICAS
const totalUsuarios = listaUsuarios.length;
const totalProdutosDiferentes = listaProdutos.length;

let totalUnidadesEstoque = 0;
let valorTotalEstoque = 0;

listaProdutos.forEach((produto) => {
const qtd = Number.parseInt(produto.qty) || 0;
const precoLimpo = produto.preco ? produto.preco.replace('R$ ', '').trim() : '0';
const preco = Number.parseFloat(precoLimpo) || 0;

    totalUnidadesEstoque += qtd;
    valorTotalEstoque += (qtd * preco);

});

// 4. INJEÇÃO DOS DADOS NO HTML
if (userCountEl) userCountEl.textContent = totalUsuarios;
if (productCountEl) productCountEl.textContent = totalProdutosDiferentes;
if (stockCountEl) stockCountEl.textContent = totalUnidadesEstoque;

if (stockValueEl) {
stockValueEl.textContent = 'R$ ' + valorTotalEstoque.toLocaleString('pt-BR', {
minimumFractionDigits: 2,
maximumFractionDigits: 2
});
}
});
