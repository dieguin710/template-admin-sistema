// 1. REFERÊNCIAS DOS ELEMENTOS HTML
const prodForm = document.querySelector('#prod-form');
const prodName = document.querySelector('#prod-name');
const prodPrice = document.querySelector('#prod-price');
const prodQty = document.querySelector('#prod-qty');

// Referenciando a tabela de produtos
const tableProductsBody = document.querySelector('#table-products-body');
let linhaProdutoEmEdicao = null;

// Inicialização: Carrega os produtos salvos ao abrir a página
document.addEventListener('DOMContentLoaded', carregarDadosDoLocalStorage);

if (prodForm) {
  prodForm.addEventListener('submit', saveData);
}

// Obter e salvar os dados
function saveData(e) {
  e.preventDefault();

  // Listar os values dos campos
  let nome = prodName.value.trim();
  let preco = Number.parseFloat(prodPrice.value).toFixed(2);
  let qty = Number.parseInt(prodQty.value) || 0;

  if (linhaProdutoEmEdicao) {
    // Modo Edição: Atualiza a linha existente
    const dados = obterDadosDaLinha(linhaProdutoEmEdicao);
    dados[1].textContent = nome;
    dados[2].textContent = 'R$ ' + preco;
    dados[3].textContent = qty;

    linhaProdutoEmEdicao = null; // Limpa o estado de edição
    alert('Produto editado com sucesso!');
  } else {
    // Modo Cadastro: Cria uma nova linha e gera um ID simulado
    const idGerado = '#' + Math.floor(1000 + Math.random() * 9000);
    adicionarLinhaNaTabela(idGerado, nome, `R$ ${preco}`, qty);
    alert('Produto cadastrado com sucesso!');
  }

  prodForm.reset();
  atualizarEstatisticasESalvar();
}

// Função auxiliar para criar e injetar a linha na tabela HTML
function adicionarLinhaNaTabela(id, nome, preco, qty) {
  const tr = document.createElement('tr');

  tr.innerHTML = `
        <td>${id}</td>
        <td>${nome}</td>
        <td>${preco}</td>
        <td>${qty}</td>
        <td>
            <button type="button" class="btn-excluir">Excluir</button>
            <button type="button" class="btn-editar">Editar</button>
        </td>
    `;

  // Adiciona os eventos nos botões recém-criados
  const btnExcluir = tr.querySelector('.btn-excluir');
  const btnEditar = tr.querySelector('.btn-editar');

  btnExcluir.addEventListener('click', () => deletar(tr));
  btnEditar.addEventListener('click', () => editar(tr));

  tableProductsBody.appendChild(tr);
}

// Pegar as células da linha
function obterDadosDaLinha(tr) {
  return tr.querySelectorAll('td');
}

// Deletar Produto
function deletar(tr) {
  const celulas = obterDadosDaLinha(tr);
  const nomeProduto = celulas[1] ? celulas[1].textContent : '';

  const confirmDelete = confirm(
    `Tem certeza que gostaria de deletar o produto "${nomeProduto}"?`,
  );

  if (confirmDelete) {
    tr.remove();
    alert('Produto excluído com sucesso!');
    atualizarEstatisticasESalvar();
  }
}

// Editar Produto | coloca os dados de volta nos campos
function editar(tr) {
  linhaProdutoEmEdicao = tr;
  const dados = obterDadosDaLinha(tr);

  // Remove o "R$ " do preço antes de jogar de volta no input numérico
  const precoLimpo = dados[2].textContent.replace('R$ ', '');

  prodName.value = dados[1].textContent;
  prodPrice.value = precoLimpo;
  prodQty.value = dados[3].textContent;
}

// MÓDULO DE PERSISTÊNCIA: Salva os produtos atuais no LocalStorage
function salvarNoLocalStorage() {
  const linhas = tableProductsBody.querySelectorAll('tr');
  const produtos = [];

  linhas.forEach((linha) => {
    const colunas = obterDadosDaLinha(linha);
    if (colunas && colunas.length >= 4) {
      produtos.push({
        id: colunas[0].textContent,
        nome: colunas[1].textContent,
        preco: colunas[2].textContent,
        qty: colunas[3].textContent
      });
    }
  });

  localStorage.setItem('produtos_dashboard', JSON.stringify(produtos));
}

// MÓDULO DE PERSISTÊNCIA: Recupera os dados ao atualizar a página
function carregarDadosDoLocalStorage() {
  const dadosSalvos = localStorage.getItem('produtos_dashboard');
  if (dadosSalvos) {
    const produtos = JSON.parse(dadosSalvos);
    tableProductsBody.innerHTML = ''; // Limpa a tabela antes de reconstruir
    produtos.forEach(prod => {
      adicionarLinhaNaTabela(prod.id, prod.nome, prod.preco, prod.qty);
    });
  }
  atualizarEstatisticas(); // Calcula os totais iniciais
}

// Atualiza o painel visual e grava as alterações no disco local
function atualizarEstatisticasESalvar() {
  atualizarEstatisticas();
  salvarNoLocalStorage();
}

// ATUALIZAR AS ESTATÍSTICAS DO PAINEL DE PRODUTOS
function atualizarEstatisticas() {
  const linhas = tableProductsBody.querySelectorAll('tr');
  const totalItensDiferentes = linhas.length;
  let estoqueTotal = 0;
  let valorTotalEstoque = 0;

  linhas.forEach((linha) => {
    const colunas = obterDadosDaLinha(linha);
    if (colunas && colunas.length >= 4) {
      const qtd = Number.parseInt(colunas[3].textContent) || 0;
      // Converte "R$ 10.50" de volta para o número 10.50
      const preco = Number.parseFloat(colunas[2].textContent.replace('R$ ', '')) || 0;

      estoqueTotal += qtd;
      valorTotalEstoque += (qtd * preco);
    }
  });

  // Referências opcionais para elementos de contagem no seu Dashboard HTML
  const countProdDiferentes = document.querySelector('#count-products-types');
  const countEstoqueTotal = document.querySelector('#count-products-stock');
  const countValorEstoque = document.querySelector('#count-products-value');

  if (countProdDiferentes) countProdDiferentes.textContent = totalItensDiferentes;
  if (countEstoqueTotal) countEstoqueTotal.textContent = estoqueTotal;
  if (countValorEstoque) countValorEstoque.textContent = 'R$ ' + valorTotalEstoque.toFixed(2);
}

// função auxiliar - para controlar os inputs Number
const type = 'number';

document.querySelectorAll(`input[type="${type}"]`).forEach((input) => {
  input.addEventListener('input', (e) => {
    if (e.target.value !== '' && Number(e.target.value) < 0) {
      e.target.value = 0;
    }
  });
});
