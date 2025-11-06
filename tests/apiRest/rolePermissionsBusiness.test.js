require('dotenv').config();
const request = require('supertest');
const { expect } = require('chai');
const { gerarUsuario } = require('./helpers/usuariosRandom.js');

const baseUrl = process.env.BASE_URL_REST;

describe('Role Permissions', () => {
  let businessToken;

  before(async () => {
    // Gera um novo usuário random do tipo business
    const novoUsuario = gerarUsuario('business');
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
    businessToken = businessLogin.body.token;
  });

  //***TESTS BUSINESS business/categories***
  describe('BUSINESS /business/categories', () => {
    
    it('Confirma que usuario de tipo business pode acessar POST endpoints', async () => {
      const resposta = await request(baseUrl)
        .post('/business/categories')
        .set('Authorization', `Bearer ${businessToken}`)
        .send({
          name: "beleza"
        });
      expect(resposta.status).to.equal(201);
      expect(resposta.body.message).to.equal('Category created successfully');
    });

    it('Confirma que usuario de tipo business pode acessar PUT endpoints', async () => {
      const resposta = await request(baseUrl)
        .put('/business/categories')
        .set('Authorization', `Bearer ${businessToken}`)
        .send({
          id: 3,
          name: "fitness"
        });
      expect(resposta.status).to.equal(200);
      expect(resposta.body.message).to.equal('Category updated successfully');
    });

    it('Confirma que usuario de tipo business pode acessar DELETE endpoints', async () => {
      const resposta = await request(baseUrl)
        .delete('/business/categories')
        .set('Authorization', `Bearer ${businessToken}`)
        .query({
          id: 3
        });
      expect(resposta.status).to.equal(200);
      expect(resposta.body.message).to.equal('Category deleted successfully');
    });

    it('Confirma que usuario de tipo business pode acessar GET endpoints', async () => {
      const resposta = await request(baseUrl)
        .get('/business/categories')
        .set('Authorization', `Bearer ${businessToken}`);
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

  //***TESTS BUSINESS business/businesses***
  describe('BUSINESS /business/businesses', () => {
    
    it('Confirma que usuario de tipo business pode acessar POST endpoints', async () => {
      const resposta = await request(baseUrl)
        .post('/business/businesses')
        .set('Authorization', `Bearer ${businessToken}`)
        .send({
          name: "Pão de queijo Caseirinho",
          category: "gastronomia",
          description: "Pão de queijo caseiro congelados ou assados",
          isStarred: true,
          contact: "paodequeijo@caseiro.com"
        });
      //console.log(resposta.body);
      expect(resposta.status).to.equal(201);
      expect(resposta.body.message).to.equal('Business registered successfully');
    });

    it('Confirma que usuario de tipo business pode acessar PUT endpoints', async () => {
      const resposta = await request(baseUrl)
        .put('/business/businesses')
        .set('Authorization', `Bearer ${businessToken}`)
        .send({
          id: 1,
          name: "Larissa Modas",
          category: "Moda",
          description: "Moda feminina",
          isStarred: true,
          contact: "larissa@moda.com"
        });
      //console.log(resposta.body);
      expect(resposta.status).to.equal(200);
      expect(resposta.body.message).to.equal('Business updated successfully');
    });

    it('Confirma que usuario de tipo business pode acessar DELETE endpoints', async () => {
      const resposta = await request(baseUrl)
        .delete('/business/businesses')
        .set('Authorization', `Bearer ${businessToken}`)
        .query({
          id: 1
        });
      //console.log(resposta.body);
      expect(resposta.status).to.equal(200);
      expect(resposta.body.message).to.equal('Business deleted successfully');
    });

    it('Confirma que usuario de tipo business pode acessar GET endpoints', async () => {
      const resposta = await request(baseUrl)
        .get('/business/businesses')
        .set('Authorization', `Bearer ${businessToken}`);
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

    it('Confirma que usuario de tipo business pode acessar GET by-category', async () => {
      const resposta = await request(baseUrl)
        .get('/business/by-category')
        .set('Authorization', `Bearer ${businessToken}`)
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

    it('Confirma que usuario de tipo business pode acessar GET starred', async () => {
      const resposta = await request(baseUrl)
        .get('/business/starred')
        .set('Authorization', `Bearer ${businessToken}`);

      expect(resposta.status).to.equal(200);
      expect(resposta.body).to.be.an('array').that.is.not.empty;
      resposta.body.forEach(item => {
        expect(item).to.have.property('id');
        expect(item.id).to.be.a('number');
        expect(item).to.have.property('isStarred');
        expect(item.isStarred).to.be.a('boolean');
      });
    });

    it('Confirma que usuario de tipo business pode acessar GET by-name', async () => {
      const resposta = await request(baseUrl)
        .get('/business/by-name')
        .set('Authorization', `Bearer ${businessToken}`)
        .query({
          name: "Artesanato Local"
        });

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

  //***TESTS BUSINESS /products***
  describe('BUSINESS /products', () => {
  
    it('Confirma que usuario de tipo business pode acessar POST endpoints', async () => {
    const resposta = await request(baseUrl)
      .post('/products')
      .set('Authorization', `Bearer ${businessToken}`)
      .send({
            businessId: 2,
            name: "Pao de Queijo congelado",
            price: 10,
            isStarred: true
            });
      //console.log(resposta.body);
      expect(resposta.status).to.equal(201);
      expect(resposta.body.message).to.equal('Product added successfully')
    });

    it('Confirma que usuario de tipo business pode acessar PUT endpoints', async () => {
    const resposta = await request(baseUrl)
      .put('/products')
      .set('Authorization', `Bearer ${businessToken}`)
      .send({
            id: 1,
            businessId: 2,
            name: "Brinquedos artesanais",
            price: 30,
            isStarred: false
            });
          
      //console.log(resposta.body);
      expect(resposta.status).to.equal(200);
      expect(resposta.body.message).to.equal('Product updated successfully')
    });

    it('Confirma que usuario de tipo business pode acessar DELETE endpoints', async () => {
      // Usando IDs válidos do banco simulado
      const resposta = await request(baseUrl)
        .delete('/products')
        .set('Authorization', `Bearer ${businessToken}`)
        .query({ 
                id: 3,
                businessId: 2
              })
       // console.log(resposta.body);
      expect(resposta.status).to.equal(200);
      expect(resposta.body.message).to.equal('Product deleted successfully')
    });

    it('Confirma que usuario de tipo business pode acessar GET endpoints', async () => {
    
    const resposta = await request(baseUrl)
      .get('/products')
      .set('Authorization', `Bearer ${businessToken}`)

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

    it('Confirma que usuario de tipo business pode acessar GET starred', async () => {
    
    const resposta = await request(baseUrl)
      .get('/products/starred')
      .set('Authorization', `Bearer ${businessToken}`)

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

        it('Confirma que usuario de tipo business pode acessar GET by-name', async () => {
    
    const resposta = await request(baseUrl)
      .get('/products/by-name')
      .set('Authorization', `Bearer ${businessToken}`)
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