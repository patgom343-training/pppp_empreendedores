require('dotenv').config();
const request = require('supertest');
const { expect } = require('chai');
const postLogin = require('./fixtures/postLogin.json')

describe('User Login', () => {
    describe('POST /auth/login', () => {
        it('Deve retornar 200 com um token em string quando usar credenciais validas', async () => {
            const bodyLogin = { ...postLogin };
            const resposta = await request(process.env.BASE_URL_REST)
                .post('/auth/login')
                .set('Content-Type', 'application/json')
                .send(bodyLogin);
            expect(resposta.status).to.equal(200);
            expect(resposta.body.token).to.be.a('string');
        });

        it('Login com usuario não registrado e retorna 401 com mensagem de erro', async () => {
            const resposta = await request(process.env.BASE_URL_REST)
                .post('/auth/login')
                .set('Content-Type', 'application/json')
                .send({
                    username: 'usuarioInvalido',
                    password: '222222'
                });
            expect(resposta.status).to.equal(401);
            expect(resposta.body.message).to.equal('Invalid credentials');
            expect(resposta.body).to.not.have.property('token');
        });
    });
});