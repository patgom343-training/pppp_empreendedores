require('dotenv').config();
const request = require('supertest');
const { expect } = require('chai');
const { gerarUsuario } = require('./helpers/usuariosRandom.js');

const baseUrl = process.env.BASE_URL_REST;

describe('NEGATIVE TESTS para os endpoints de business e produtos', () => {
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

  //***NEGATIVE TESTS BUSINESS business/categories***
  describe('NEGATIVE TESTS BUSINESS /business/categories', () => {
    
    it('Validar que não permite ingresar categorias duplicadas', async () => {
      const resposta = await request(baseUrl)
        .post('/business/categories')
        .set('Authorization', `Bearer ${businessToken}`)
        .send({
          name: "gastronomia"
        });
      expect(resposta.status).to.equal(409);
      expect(resposta.body.message).to.equal('Category already exists');
    });

    it('Validar que não é possivel atualizar uma categoria que não existe', async () => {
      const resposta = await request(baseUrl)
        .put('/business/categories')
        .set('Authorization', `Bearer ${businessToken}`)
        .send({
          id: 6,
          name: "fitness"
        });
      expect(resposta.status).to.equal(404);
      expect(resposta.body.message).to.equal('Category not found');
    });

    it('Validar que não é possivel eliminar uma categoria que não existe', async () => {
      const resposta = await request(baseUrl)
        .delete('/business/categories')
        .set('Authorization', `Bearer ${businessToken}`)
        .query({
          id: 9
        });
      expect(resposta.status).to.equal(404);
      expect(resposta.body.message).to.equal('Category not found');
    });
  });

  //***NEGATIVE TESTS BUSINESS business/businesses***
  describe('NEGATIVE TESTS BUSINESS /business/businesses', () => {
    
    it('Validar que nao é possível adicionar um negócio com uma categoria inválida', async () => {
      const resposta = await request(baseUrl)
        .post('/business/businesses')
        .set('Authorization', `Bearer ${businessToken}`)
        .send({
          name: "Pão de queijo Caseirinho",
          category: "123",
          description: "Pão de queijo caseiro congelados ou assados",
          isStarred: true,
          contact: "paodequeijo@caseiro.com"
        });
      expect(resposta.status).to.equal(400);
      expect(resposta.body.message).to.equal("Category '123' not found. Please register the category first.");
    });

    it('Validar que não é possivel atualizar um negócio que não existe', async () => {
      const resposta = await request(baseUrl)
        .put('/business/businesses')
        .set('Authorization', `Bearer ${businessToken}`)
        .send({
          id: 50,
          name: "Larissa Modas",
          category: "Moda",
          description: "Moda feminina",
          isStarred: true,
          contact: "larissa@moda.com"
        });
      expect(resposta.status).to.equal(404);
      expect(resposta.body.message).to.equal('Business not found');
    });

    it('Validar que não é possivel eliminar um negócio que não existe', async () => {
      const resposta = await request(baseUrl)
        .delete('/business/businesses')
        .set('Authorization', `Bearer ${businessToken}`)
        .query({
          id: 50
        });
      expect(resposta.status).to.equal(404);
      expect(resposta.body.message).to.equal('Business not found');
    });


    it('Validar que não se pode buscar um negocio com uma categoria invalida em GET by-category', async () => {
      const resposta = await request(baseUrl)
        .get('/business/by-category')
        .set('Authorization', `Bearer ${businessToken}`)
        .query({
          category: "palavra"
        });
      expect(resposta.status).to.equal(404);
      expect(resposta.body.message).to.equal('Category not found');
    });


    it('Validar que não se pode buscar um negocio com um nome invalido GET em by-name', async () => {
      const resposta = await request(baseUrl)
        .get('/business/by-name')
        .set('Authorization', `Bearer ${businessToken}`)
        .query({
          name: "Casa da arte"
        });
      expect(resposta.status).to.equal(404);
      expect(resposta.body.message).to.equal('Business not found');
    });
  });

  //***NEGATIVE TESTS BUSINESS /products***
  describe('NEGATIVE TESTS BUSINESS /products', () => {
  
    it('Validar que não é possivel registrar um produto para um negócio invalido', async () => {
      const resposta = await request(baseUrl)
        .post('/products')
        .set('Authorization', `Bearer ${businessToken}`)
        .send({
          businessId: 54,
          name: "Pao de Queijo congelado",
          price: 10,
          isStarred: true
        });
      expect(resposta.status).to.equal(400);
      expect(resposta.body.message).to.equal('Business with ID 54 not found. Please register the business first.');
    });

    it('Validar que não é possivel atualizar um produto que não existe', async () => {
      const resposta = await request(baseUrl)
        .put('/products')
        .set('Authorization', `Bearer ${businessToken}`)
        .send({
          id: 60,
          businessId: 2,
          name: "Brinquedos artesanais",
          price: 30,
          isStarred: false
        });
      expect(resposta.status).to.equal(404);
      expect(resposta.body.message).to.equal('Product not found');
    });

    it('Validar que não é possivel eliminar um produto que não existe', async () => {
      const resposta = await request(baseUrl)
        .delete('/products')
        .set('Authorization', `Bearer ${businessToken}`)
        .query({
          id: 67,
          businessId: 2
        });
      expect(resposta.status).to.equal(404);
      expect(resposta.body.message).to.equal('Product not found');
    });

    it('Validar que não se pode buscar um produto com um nome invalido GET em by-name', async () => {
      const resposta = await request(baseUrl)
        .get('/products/by-name')
        .set('Authorization', `Bearer ${businessToken}`)
        .query({
          name: "Lampada de Sal"
        });
      expect(resposta.status).to.equal(404);
      expect(resposta.body.message).to.equal('Product not found');
    });
  });
}); 