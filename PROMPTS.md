
**Objetivo**
Criar uma API Rest para o registro de empreendimentos e produtos para conectar empreendedores locais e clientes.
**Contexto**
- A API possui as seguintes funcionalidades: registro para login de empreendedores, registro para login de clientes, registro de novos empreendimentos, registro das categorias, registro de produtos, busca de empreendimentos por nome, busca de empreendimentos por categoria.
- Para que eu possa usar as funcionalidades de registro de empreendimento, registro de categoria  e registro de produto, preciso fazer login como empreendedor.
- Exemplo de categorias:  gastronomia, artesanato e moda.
- Para que eu possa usar especificamente só as funcionalidades de pesquisar por empreendimentos e produtos preciso fazer login como cliente. 
- Clientes apenas fazem pesquisa de empreendimentos por nome, empreendimentos por categoria e produtos (não podem registar, editar ou excluir dados), empreendedores acessam todas as funcionalidades do sistema.
- Os produtos podem ser classificados como “estrela”, representando o produto favorito ou mais vendido de cada empreendedor.  
- Os empreendedores devem associar cada empreendimento a uma categoria.
Usuários com o papel customer podem acessar apenas os endpoints GET.
Usuários com o papel customer são impedidos de acessar endpoints POST.
Usuários com o papel business têm acesso total às funcionalidades.


**Regras**
- Não me pergunte nada, só faça.
- A documentação da API deve ser feita com Swagger, em forma de arquivo, crie esse arquivo em uma pasta de recursos. O swagger precisa descrever o modelo JSON da resposta de cada endpoint com base na forma que API for implementada. O Swagger também deve contemplar os status code de erro que serão implementados na API.
- Adicione um endpoint para renderizar o Swagger.
- Construa um arquivo README para descrever o projeto
- Divida a API em camadas: routes, controllers, service e model
- Armazene os dados da API em um banco de dados em memória
- Utilize a biblioteca express para construir a API Rest
- Faça com que a autenticação seja parte do Middleware, utilizando token JWT como modelo de autenticação, e implemente as regras de autenticação seguindo as informações descritas no contexto.
- Para registrar um empreendimento deve estar registrada a categoria.
- Para registrar um produto deve estar registrado o empreendimento. 
