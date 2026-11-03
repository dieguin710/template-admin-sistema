
// 1. REFERÊNCIAS DOS ELEMENTOS HTML


// Selecionar o corpo da tabela de usuários.

// Selecionar o formulário de cadastro.

// Selecionar os campos de nome, e-mail e administrador.



// 2. CONTROLE DE EDIÇÃO


// Criar uma variável para guardar a linha que está sendo editada.
// Exemplo: let linhaEmEdicao = null;



// 3. EVENTO DO FORMULÁRIO


// Adicionar um evento de envio (submit) ao formulário.

// Impedir que a página seja recarregada ao enviar o formulário.

// Chamar a função responsável por salvar os dados.



// 4. FUNÇÃO PARA CADASTRAR E ATUALIZAR


function saveData(e) {

  // Impedir o comportamento padrão do formulário.

  // Capturar o nome digitado pelo usuário.

  // Capturar o e-mail digitado pelo usuário.

  // Verificar se a opção de administrador está marcada.
  // Exemplo: marcado = "Sim"; desmarcado = "Não".


  // Verificar se existe uma linha em edição.

  if (/* verificar se existe uma linha em edição */) {

    // Recuperar os dados da linha que será atualizada.

    // Atualizar o nome, o e-mail e o status de administrador
    // nas células correspondentes da tabela.

    // Limpar a variável de controle de edição.

    // Exibir uma mensagem de atualização bem-sucedida.

  } else {

    // Criar um novo elemento HTML <tr> para a tabela.

    // Inserir as células com:
    // imagem, nome, e-mail, administrador e ações.

    // Criar os botões Editar e Excluir.

    // Adicionar um evento de clique ao botão Editar.

    // Adicionar um evento de clique ao botão Excluir.

    // Adicionar a nova linha ao corpo da tabela.

  }

  // Atualizar as estatísticas do painel administrativo.

  // Limpar os campos do formulário.
}



// 5. FUNÇÃO PARA EXCLUIR UM USUÁRIO


function deletar(linha) {

  // Verificar se a linha excluída está sendo editada.

  // Se estiver, limpar o controle de edição e o formulário.

  // Remover a linha da tabela.

  // Atualizar as estatísticas do painel administrativo.

  // Exibir uma mensagem de confirmação.
}



// 6. FUNÇÃO PARA OBTER OS DADOS DA LINHA


function obterDadosDaLinha(linha) {

  // Selecionar todas as células (<td>) da linha recebida.

  // Recuperar o nome do usuário.

  // Recuperar o e-mail do usuário.

  // Verificar se o usuário é administrador.

  // Retornar os dados encontrados para serem utilizados
  // pelas funções de edição e atualização.
}



// 7. FUNÇÃO PARA EDITAR UM USUÁRIO


function editar(linha) {

  // Guardar a linha que será editada.

  // Recuperar os dados da linha usando obterDadosDaLinha().

  // Preencher o campo de nome com os dados encontrados.

  // Preencher o campo de e-mail com os dados encontrados.

  // Marcar ou desmarcar a opção de administrador.

  // Colocar o foco no campo de nome.
}



// 8. ATUALIZAR AS ESTATÍSTICAS DO PAINEL


// Criar uma função chamada atualizarEstatisticas().

// Contar quantos usuários existem na tabela.

// Contar quantos usuários possuem o status de administrador "Sim".

// Atualizar o elemento HTML que exibe o total de usuários.

// Atualizar o elemento HTML que exibe o total de administradores.

// Exemplo:
// Total de usuários: 10
// Total de administradores: 3

// IMPORTANTE:
// Chamar atualizarEstatisticas() depois de cadastrar,
// editar ou excluir um usuário.

// Ao editar o status de um usuário comum para administrador,
// incrementar a quantidade de administradores.

// Ao editar o status de um administrador para usuário comum,
// diminuir a quantidade de administradores.

// Evitar incrementar ou diminuir manualmente sem verificar
// o estado atual da tabela. Recalcular os totais evita erros.
;
