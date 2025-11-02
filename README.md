# PPP Local Business API

## Descrição

A PPP Local Business API é uma aplicação para conectar empreendedores locais e clientes. Ela permite o registro de empreendedores, clientes, empreendimentos, categorias e produtos, além de oferecer funcionalidades de busca e gerenciamento.

## Funcionalidades

- **Autenticação e Autorização**:
  - Registro e login de usuários com dois papéis distintos:
    - `customer`: Pode acessar apenas os endpoints de registro, login e todos as consultas por empreendimentos e produtos.
    - `business`: Pode acessar todas as funcionalidades do sistema.
  - Autenticação via JWT.

- **Gestão de Empreendimentos e Categorias** (apenas para `business`):
  - Registro, edição e remoção de empreendimentos.
  - Registro, edição e remoção de categorias.

- **Gestão de Produtos** (apenas para `business`):
  - Registro, edição e remoção de produtos.

- **Funcionalidades para Clientes (`customer`)**:
  - Busca de empreendimentos por nome, categoria e empreendimentos destacados.
  - Busca de produtos.

- **Documentação da API**:
  - Disponível via Swagger.

## Tecnologias Utilizadas

- Node.js
- Express
- JWT (Json Web Token)
- Swagger UI Express
- js-yaml
- Jest (para testes)
- Supertest (para testes de integração)

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/patgom343-training/pppp_empreendedores.git
   ```

2. Navegue até o diretório do projeto:
   ```bash
   cd ppp_local_business_api
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

## Uso

1. Inicie o servidor:
   ```bash
   npm run start
   ```

2. Acesse a documentação da API em:
   ```
   http://localhost:3000/api-docs
   ```

## Testes

1. Para rodar os testes automatizados:
   ```bash
   npm test
   ```

## Endpoints Principais

- **Autenticação**:
  - **POST /auth/register**: Registro de usuários.
  - **POST /auth/login**: Login de usuários.

- **Gestão de Categorias** (apenas para `business`):
  - **POST /business/categories**: Registro de categorias.
  - **PUT /business/categories**: Edição de categorias.
  - **DELETE /business/categories**: Remoção de categorias.

- **Gestão de Empreendimentos** (apenas para `business`):
  - **POST /business/businesses**: Registro de empreendimentos.
  - **PUT /business/businesses**: Edição de empreendimentos.
  - **DELETE /business/businesses**: Remoção de empreendimentos.

- **Gestão de Produtos** (apenas para `business`):
  - **POST /products**: Registro de produtos.
  - **PUT /products**: Edição de produtos.
  - **DELETE /products**: Remoção de produtos.

- **Funcionalidades para Clientes** (`customer`):
  - **GET /search/businesses**: Busca de empreendimentos. 
  - **GET /search/products**: Busca de produtos.
  - **GET /starred**: Busca de empreendimentos destacados.


