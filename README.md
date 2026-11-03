# Treinamento Fullstack JavaScript

Projeto didático para praticar HTML, CSS e JavaScript com páginas de login, dashboard, usuários, produtos e configurações.

## Como clonar o projeto

Você precisa ter o [Git](https://git-scm.com/downloads) instalado. No terminal, execute:

```bash
git clone https://github.com/leo-gomes-dev/template-admin-poo-javascript.git
cd template-admin-poo-javascript
```

O código-fonte está no [GitHub](https://github.com/leo-gomes-dev/template-admin-poo-javascript).

## Como executar

1. Abra a pasta `template-admin-poo-javascript` no VS Code.
2. Inicie um servidor local, como a extensão **Live Server**.
3. Abra `index.html` pelo servidor no navegador.
4. Entre com as credenciais de demonstração:

   - **E-mail:** `aluno@fullstack.dev`
   - **Senha:** `123456`

O projeto não precisa de instalação de dependências. Um servidor local ajuda a manter os caminhos e o armazenamento do navegador consistentes.

## Estrutura do projeto

```text
├── index.html                  # Tela de login
├── scripts/
│   └── main.js                 # Ponto de entrada e lógica JavaScript
├── styles/
│   ├── style.css               # Estilos do login
│   └── dashboard-base.css      # Estilos compartilhados do painel
└── pages/
    ├── dashboard/              # Resumo e trilhas de prática
    ├── usuarios/               # Cadastro e listagem de usuários
    ├── produtos/               # Cadastro e controle de estoque
    └── configuracoes/          # Preferências da aplicação
```

Cada página tem seu próprio HTML e CSS. `scripts/main.js` contém classes JavaScript compartilhadas entre as telas.

## O que praticar

### Fundamentos

- Identifique a estrutura semântica no HTML e os estilos compartilhados no CSS.
- Acompanhe eventos de formulário e seletores do DOM em `scripts/main.js`.
- Cadastre e remova usuários e produtos pelas páginas correspondentes.
- Altere as preferências e observe como elas são lembradas.

### Desafios avançados

- Separe as classes em arquivos e módulos JavaScript.
- Adicione pesquisa, edição, filtros e paginação às tabelas.
- Inclua validação de campos e mensagens de retorno na interface.
- Crie novas métricas para o dashboard e mantenha os valores atualizados.
- Substitua o armazenamento local por uma API e um backend JavaScript.

## Dados e autenticação

Os dados de exemplo ficam no `localStorage` do navegador. Para reiniciar a prática, limpe os dados do site nas ferramentas do desenvolvedor do navegador.

O login é apenas uma simulação para exercícios de interface. Não use essas credenciais ou esse mecanismo para proteger dados reais. Autenticação segura precisa de um backend.
