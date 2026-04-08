# BookFriends

Frontend da aplicação BookFriends, uma rede social literária para conectar leitores, compartilhar livros e facilitar trocas ou doações.

## Tecnologias

- React 18
- Vite
- React Router
- Tailwind CSS
- AWS Amplify com Amazon Cognito para autenticação

## Como executar o front

### Pré-requisitos

- Node.js 18 ou superior
- npm

### 1. Instale as dependências

```bash
npm install
```

### 2. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com base no `.env.example`.

Exemplo:

```env
VITE_AWS_REGION=sa-east-1
VITE_COGNITO_USER_POOL_ID=seu_user_pool_id
VITE_COGNITO_USER_POOL_CLIENT_ID=seu_app_client_id
VITE_COGNITO_IDENTITY_POOL_ID=seu_identity_pool_id
```

Observações:

- O login só funciona corretamente quando `VITE_AWS_REGION`, `VITE_COGNITO_USER_POOL_ID` e `VITE_COGNITO_USER_POOL_CLIENT_ID` estão preenchidos.
- `VITE_COGNITO_IDENTITY_POOL_ID` é opcional no código atual, mas pode ser necessário dependendo da configuração AWS.
- Se o `.env` não estiver configurado, a tela de login continua acessível, porém a autenticação real ficará desabilitada.

### 3. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

O Vite exibirá a URL local no terminal, normalmente:

```bash
http://localhost:5173
```

### 4. Gerar build de produção

```bash
npm run build
```

Os arquivos gerados ficam na pasta `dist/`.

## Como a aplicação funciona

O BookFriends é um frontend focado na experiência de uma comunidade de leitores. Depois do login, o usuário navega por áreas protegidas da aplicação para descobrir livros, ver perfis, encontrar conexões e trocar mensagens.

### Fluxo principal

1. O usuário acessa `/login`.
2. Pode fazer login, criar conta, confirmar cadastro por código ou redefinir senha.
3. Depois de autenticado, o acesso às demais rotas é liberado.
4. A navegação principal acontece dentro do layout com cabeçalho no desktop e barra inferior no mobile.

### Autenticação

A autenticação é feita com AWS Amplify integrado ao Amazon Cognito.

Recursos já implementados:

- login com e-mail e senha
- cadastro de novo usuário
- confirmação de cadastro por código
- reenvio de código de confirmação
- fluxo de recuperação de senha
- proteção de rotas para usuários autenticados

## Principais telas

### Home

Página inicial institucional com apresentação da proposta da plataforma, benefícios e CTA para começar a usar o sistema.

### Feed de livros

Lista os livros disponíveis para troca ou doação usando dados mockados. O usuário pode:

- buscar por título ou autor
- filtrar por tipo: troca, doação ou ambos
- filtrar por gênero
- abrir a página de detalhes do livro

### Detalhe do livro

Mostra informações completas do livro:

- capa
- autor
- gênero
- condição
- descrição
- proprietário do livro

Também permite demonstrar interesse no livro e iniciar contato com o dono.

### Adicionar livro

Formulário para cadastrar um novo livro com:

- título
- autor
- gênero
- condição
- tipo de disponibilidade
- descrição
- upload visual de capa

No estado atual, o envio está simulado no frontend e redireciona para o perfil após sucesso.

### Perfil

Exibe os dados do usuário e sua estante de livros. Quando o perfil é o do próprio usuário, a tela permite:

- adicionar livro
- acessar edição de perfil
- visualizar banner, avatar, bio e gêneros favoritos

Quando é o perfil de outro usuário, a tela permite abrir conversa e consultar seus livros.

### Configurações de perfil

Tela de edição do perfil com atualização visual de:

- avatar
- banner
- nome
- localização
- gênero
- bio
- gêneros favoritos

Atualmente a persistência também está simulada no frontend.

### Conexões

Tela que apresenta matches entre leitores com base em compatibilidade, gêneros em comum e quantidade de livros de interesse mútuo.

### Mensagens

Interface de chat com:

- lista de conversas
- busca por conversa
- visualização das mensagens
- envio de novas mensagens

Os dados de conversa e mensagens também estão mockados no projeto.

## Estrutura atual dos dados

Hoje a aplicação combina dois tipos de fonte:

- autenticação real via Cognito
- dados mockados para livros, perfis, matches e mensagens

Isso significa que o fluxo de login pode ser real, enquanto boa parte da experiência interna ainda funciona com dados estáticos de demonstração.

## Rotas principais

- `/login`: autenticação
- `/`: página inicial
- `/feed`: catálogo de livros
- `/book/:bookId`: detalhe do livro
- `/add-book`: cadastro de livro
- `/matches`: conexões entre leitores
- `/messages/:conversationId?`: mensagens
- `/profile/:userId?`: perfil do usuário atual ou de outro usuário
- `/profile-settings`: edição do perfil

## Observações para desenvolvimento

- O projeto usa `createBrowserRouter` para navegação.
- O `AuthProvider` centraliza o estado de autenticação.
- As rotas internas são protegidas por `ProtectedRoute`.
- A interface foi construída com foco responsivo, com navegação adaptada para desktop e mobile.
- Parte do conteúdo ainda está em modo de protótipo, com ações simuladas no frontend.
