require('dotenv').config();
const request = require('supertest');
const { expect } = require('chai');
const { gerarUsuario } = require('./helpers/usuariosRandom.js');

const baseUrl = process.env.BASE_URL_REST;

describe('Role Permissions', () => {
  let customerToken;

  before(async () => {
    // Gera um novo usuário random do tipo customar
    const novoUsuario = gerarUsuario('customer');
    // Registra o novo usuário
    await request(baseUrl)
      .post('/auth/register')
      .set('Content-Type', 'application/json')
      .send(novoUsuario);
    // Faz login com o novo usuário
    const businessLogin = await request(baseUrl)
      .post('/auth/login')
      .send({
        username: novoUsuario.username,
        password: novoUsuario.password
      });
    customerToken = businessLogin.body.token;
  });

  //***TESTS CUSTOMER business/categories***
  describe('CUSTOMER /business/categories', () => {
    
    it('Confirma que usuario de tipo custumer NÃO pode acessar POST endpoints', async () => {
      const resposta = await request(baseUrl)
        .post('/business/categories')
        .set('Authorization', `Bearer ${customerToken}`)
        .send({
          name: "brinquedos"
        });
      expect(resposta.status).to.equal(403);
      expect(resposta.body.message).to.equal('Access restricted to business users only');
    });

    it('Confirma que usuario de tipo custumer NÃO pode acessar PUT endpoints', async () => {
      const resposta = await request(baseUrl)
        .put('/business/categories')
        .set('Authorization', `Bearer ${customerToken}`)
        .send({
          id: 5,
          name: "Beleza",
        });
      expect(resposta.status).to.equal(403);
      expect(resposta.body.message).to.equal('Access restricted to business users only');
    });

    it('Confirma que usuario de tipo custumer NÃO pode acessar DELETE endpoints', async () => {
      const resposta = await request(baseUrl)
        .delete('/business/categories')
        .set('Authorization', `Bearer ${customerToken}`)
        .query({
          id: "2",
        });
      expect(resposta.status).to.equal(403);
      expect(resposta.body.message).to.equal('Access restricted to business users only');
    });

    it('Confirma que usuario de tipo custumer pode acessar GET endpoints', async () => {
      const resposta = await request(baseUrl)
        .get('/business/categories')
        .set('Authorization', `Bearer ${customerToken}`);
      expect(resposta.status).to.equal(200);
      expect(resposta.body).to.be.an('array').that.is.not.empty;
      resposta.body.forEach(item => {
        expect(item).to.have.property('id');
        expect(item.id).to.be.a('number');
        expect(item).to.have.property('name');
        expect(item.name).to.be.a('string');
      });
    });
  });

  //***TESTS CUSTOMER business/businesses***
  describe('CUSTOMER /business/businesses', () => {
    
    it('Confirma que usuario de tipo custumer NÃO pode acessar POST endpoints', async () => {
      const resposta = await request(baseUrl)
        .post('/business/businesses')
        .set('Authorization', `Bearer ${customerToken}`)
        .send({
          name: "Pão de queijo Caseirinho",
          category: "gastronomia",
          description: "Pão de queijo caseiro congelados ou assados",
          isStarred: true,
          contact: "paodequeijo@caseiro.com"
        });
      //console.log(resposta.body);
      expect(resposta.status).to.equal(403);
      expect(resposta.body.message).to.equal('Access restricted to business users only');
    });

    it('Confirma que usuario de tipo custumer NÃO pode acessar PUT endpoints', async () => {
      const resposta = await request(baseUrl)
        .put('/business/businesses')
        .set('Authorization', `Bearer ${customerToken}`)
        .send({
          id: 1,
          name: "Restaurante Empadao",
          category: "gastronomico",
          description: "Restaurante para reunões familiares",
          isStarred: false,
          contact: "restaurante@empadao.com"
        });
      //console.log(resposta.body);
      expect(resposta.status).to.equal(403);
      expect(resposta.body.message).to.equal('Access restricted to business users only');
    });

    it('Confirma que usuario de tipo custumer NÃO pode acessar DELETE endpoints', async () => {
      const resposta = await request(baseUrl)
        .delete('/business/businesses')
        .set('Authorization', `Bearer ${customerToken}`)
        .query({
          id: 2
        });
      //console.log(resposta.body);
      expect(resposta.status).to.equal(403);
      expect(resposta.body.message).to.equal('Access restricted to business users only');
    });

    it('Confirma que usuario de tipo custumer pode acessar GET endpoints', async () => {
      const resposta = await request(baseUrl)
        .get('/business/businesses')
        .set('Authorization', `Bearer ${customerToken}`);
      //console.log(resposta.body);
      expect(resposta.status).to.equal(200);
      expect(resposta.body).to.be.an('array').that.is.not.empty;
      resposta.body.forEach(item => {
        expect(item).to.have.property('id');
        expect(item.id).to.be.a('number');
        expect(item).to.have.property('category');
        expect(item.category).to.be.a('string');
        expect(item).to.have.property('owner');
        expect(item.owner).to.be.a('string');
        expect(item).to.have.property('description');
        expect(item.description).to.be.a('string');
        expect(item).to.have.property('isStarred');
        expect(item.isStarred).to.be.a('boolean');
        expect(item).to.have.property('contact');
        expect(item.contact).to.be.a('string')
      });
    });

    it('Confirma que usuario de tipo custumer pode acessar GET by-category', async () => {
      const resposta = await request(baseUrl)
        .get('/business/by-category')
        .set('Authorization', `Bearer ${customerToken}`)
        .query({
          category: "gastronomia"
        });
      //console.log(resposta.body);
      expect(resposta.status).to.equal(200);
      expect(resposta.body).to.be.an('array').that.is.not.empty;
      resposta.body.forEach(item => {
        expect(item).to.have.property('id');
        expect(item.id).to.be.a('number');
        expect(item).to.have.property('category');
        expect(item.category).to.be.a('string');
      });
    });

    it('Confirma que usuario de tipo custumer pode acessar GET starred', async () => {
      const resposta = await request(baseUrl)
        .get('/business/starred')
        .set('Authorization', `Bearer ${customerToken}`);
      //console.log(resposta.body);
      expect(resposta.status).to.equal(200);
      expect(resposta.body).to.be.an('array').that.is.not.empty;
      resposta.body.forEach(item => {
        expect(item).to.have.property('id');
        expect(item.id).to.be.a('number');
        expect(item).to.have.property('isStarred');
        expect(item.isStarred).to.be.a('boolean');
      });
    });

    it('Confirma que usuario de tipo custumer pode acessar GET by-name', async () => {
      const resposta = await request(baseUrl)
        .get('/business/by-name')
        .set('Authorization', `Bearer ${customerToken}`)
        .query({
          name: "Artesanato Local"
        });
      //console.log(resposta.body);
      expect(resposta.status).to.equal(200);
      expect(resposta.body).to.be.an('array').that.is.not.empty;
      resposta.body.forEach(item => {
        expect(item).to.have.property('id');
        expect(item.id).to.be.a('number');
        expect(item).to.have.property('name');
        expect(item.name).to.be.a('string');
      });
    });
  });

  //***TESTS CUSTOMER /products***
  describe('CUSTOMER /products', () => {
  
    it('Confirma que usuario de tipo custumer NÃO pode acessar POST endpoints', async () => {
    const resposta = await request(baseUrl)
      .post('/products')
      .set('Authorization', `Bearer ${customerToken}`)
      .send({
            businessId: 2,
            name: "Pao de Queijo congelado",
            price: 10,
            isStarred: true
            });
      //console.log(resposta.body);
      expect(resposta.status).to.equal(403);
      expect(resposta.body.message).to.equal('Access restricted to business users only')
    });

    it('Confirma que usuario de tipo custumer NÃO pode acessar PUT endpoints', async () => {
    const resposta = await request(baseUrl)
      .put('/products')
      .set('Authorization', `Bearer ${customerToken}`)
      .send({
            id: 5,
            businessId: 2,
            name: "Vela de mel",
            price: 2,
            isStarred: false
            });
          
      //console.log(resposta.body);
      expect(resposta.status).to.equal(403);
      expect(resposta.body.message).to.equal('Access restricted to business users only')
    });

    it('Confirma que usuario de tipo custumer NÃO pode acessar DELETE endpoints', async () => {
      // Usando IDs válidos do banco simulado
      const resposta = await request(baseUrl)
        .delete('/products')
        .set('Authorization', `Bearer ${customerToken}`)
        .query({ id: 4,
                businessId: 2 
              })

      expect(resposta.status).to.equal(403);
    });

    it('Confirma que usuario de tipo custumer pode acessar GET endpoints', async () => {
    
    const resposta = await request(baseUrl)
      .get('/products')
      .set('Authorization', `Bearer ${customerToken}`)

      expect(resposta.status).to.equal(200);
      expect(resposta.body).to.be.an('array').that.is.not.empty;
      resposta.body.forEach(item => {
        expect(item).to.have.property('id');
        expect(item.id).to.be.a('number');
        expect(item).to.have.property('name');
        expect(item.name).to.be.a('string');
        expect(item).to.have.property('price');
        expect(item.price).to.be.a('number');
        expect(item).to.have.property('isStarred');
        expect(item.isStarred).to.be.a('boolean');
      });
    });

    it('Confirma que usuario de tipo custumer pode acessar GET starred', async () => {
    
    const resposta = await request(baseUrl)
      .get('/products/starred')
      .set('Authorization', `Bearer ${customerToken}`)

      expect(resposta.status).to.equal(200);
      expect(resposta.body).to.be.an('array').that.is.not.empty;
      resposta.body.forEach(item => {
        expect(item).to.have.property('id');
        expect(item.id).to.be.a('number');
        expect(item).to.have.property('name');
        expect(item.name).to.be.a('string');
        expect(item).to.have.property('price');
        expect(item.price).to.be.a('number');
        expect(item).to.have.property('isStarred');
        expect(item.isStarred).to.be.a('boolean');
        expect(item.isStarred).to.be.true; //para validar que sempre é ¨true¨ para esta consulta
      });
    });

        it('Confirma que usuario de tipo custumer pode acessar GET by-name', async () => {
    
    const resposta = await request(baseUrl)
      .get('/products/by-name')
      .set('Authorization', `Bearer ${customerToken}`)
      .query({
          name: "Cesta de Palha"
        });

      expect(resposta.status).to.equal(200);
      expect(resposta.body).to.be.an('array').that.is.not.empty;
      resposta.body.forEach(item => {
        expect(item).to.have.property('id');
        expect(item.id).to.be.a('number');
        expect(item).to.have.property('name');
        expect(item.name).to.be.a('string');
        expect(item).to.have.property('price');
        expect(item.price).to.be.a('number');
        expect(item).to.have.property('isStarred');
        expect(item.isStarred).to.be.a('boolean');
      });
    });
  });
}); 
