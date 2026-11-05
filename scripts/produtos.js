// 1. REFERÊNCIAS DOS ELEMENTOS HTML
const prodForm = document.querySelector('#prod-form');
const prodName = document.querySelector('#prod-name');
const prodPrice = document.querySelector('#prod-price');
const prodQty = document.querySelector('#prod-qty');

// Referenciando a tabela de produtos
const tableProductsBody = document.querySelector('#table-products-body');
let linhaProdutoEmEdicao = null;

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

    salvarProdutos()
    linhaProdutoEmEdicao = null; // Limpa o estado de edição
    alert('Produto editado com sucesso!');
  } else {
    // Modo Cadastro: Cria uma nova linha
    const tr = document.createElement('tr');

    // Gera um ID simples para simular um codigo unico
    const idGerado = '#' + Math.floor(1000 + Math.random() * 9000);

    tr.innerHTML = `
            <td>${idGerado}</td>
            <td>${nome}</td>
            <td>R$ ${preco}</td>
            <td>${qty}</td>
            <td>
                <button type="button" class="btn-excluir">Excluir</button>
                <button type="button" class="btn-editar">Editar</button>
            </td>
        `;

    tableProductsBody.appendChild(tr);

    // Adiciona os eventos nos botões recém-criados
    const btnExcluir = tr.querySelector('.btn-excluir');
    const btnEditar = tr.querySelector('.btn-editar');

    btnExcluir.addEventListener('click', () => deletar(tr));
    btnEditar.addEventListener('click', () => editar(tr));
    salvarProdutos()
    alert('Produto cadastrado com sucesso!');
  }

  prodForm.reset();
}

function salvarProdutos() {
  const linhas = tableProductsBody.querySelectorAll("tr");
  const produtos = [];
  linhas.forEach((linha) => {
  const dados = obterDadosDaLinha(linha);
  if(dados) {
    produtos.push({
      id: dados[0].textContent,
      nome: dados[1].textContent,
      preco: dados[2].textContent,
      estoque: dados[3].textContent,
    })
  }
  })
  localStorage.setItem("produtos", JSON.stringify(produtos))
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
  }
}

// Editar Produto | coloca os dados de volta nos campos
function editar(tr) {
  linhaProdutoEmEdicao = tr;
  const dados = obterDadosDaLinha(tr);

  // Remove o "R$ " do preço antes de jogar de volta no input numrico
  const precoLimpo = dados[2].textContent.replace('R$ ', '');

  prodName.value = dados[1].textContent;
  prodPrice.value = precoLimpo;
  prodQty.value = dados[3].textContent;
}

// função auxiliar -  para controlar os inputs Number
const type = 'number';

document.querySelectorAll(`input[type="${type}"]`).forEach((input) => {
  input.addEventListener('input', (e) => {
    if (e.target.value !== '' && Number(e.target.value) < 0) {
      e.target.value = 0;
    }
  });
});

function puxarDadosLocalStorage {
  const dadosSalvos = localStorage.getItem("produtos");
  if (dadosSalvos) {
    const produtos = JSON.parse(dadosSalvos);
    tableProductsBody.innerHTML = ""
    produtos.push({
      id: dados[0].textContent,
      nome: dados[1].textContent,
      preco: dados[2].textContent,
      estoque: dados[3].textContent,
    })
  }
}

puxarDadosLocalStorage()
