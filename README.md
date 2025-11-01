# PPPP Empreendedores API

## Descrição

A PPPP Empreendedores API é uma aplicação para conectar empreendedores locais e clientes. Ela permite o registro de empreendedores, clientes, empreendimentos, categorias e produtos, além de oferecer funcionalidades de busca e gerenciamento.

## Funcionalidades

- Registro e login de empreendedores e clientes.
- Registro, edição e remoção de empreendimentos, categorias e produtos (apenas para empreendedores).
- Busca de empreendimentos por nome, categoria e empreendimentos destacados (apenas para clientes).
- Busca de produtos (apenas para clientes).
- Autenticação via JWT.
- Documentação da API disponível via Swagger.

## Tecnologias Utilizadas

- Node.js
- Express
- JWT (Json Web Token)
- Swagger UI Express
- js-yaml

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/patgom343-training/pppp_empreendedores.git
   ```

2. Navegue até o diretório do projeto:
   ```bash
   cd pppp_empreendedores
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

## Endpoints Principais

- **POST /auth/register**: Registro de usuários.
- **POST /auth/login**: Login de usuários.
- **POST /business/categories**: Registro de categorias (apenas para empreendedores).
- **PUT /business/categories**: Edição de categorias (apenas para empreendedores).
- **DELETE /business/categories**: Remoção de categorias (apenas para empreendedores).
- **POST /business/businesses**: Registro de empreendimentos (apenas para empreendedores).
- **PUT /business/businesses**: Edição de empreendimentos (apenas para empreendedores).
- **DELETE /business/businesses**: Remoção de empreendimentos (apenas para empreendedores).
- **POST /products**: Registro de produtos (apenas para empreendedores).
- **PUT /products**: Edição de produtos (apenas para empreendedores).
- **DELETE /products**: Remoção de produtos (apenas para empreendedores).
- **GET /search/businesses**: Busca de empreendimentos (apenas para clientes).
- **GET /search/products**: Busca de produtos (apenas para clientes).
- **GET /starred**: Busca de empreendimentos destacados (apenas para clientes).

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## Licença

Este projeto está licenciado sob a licença ISC.
