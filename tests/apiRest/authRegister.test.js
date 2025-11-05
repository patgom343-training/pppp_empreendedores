require('dotenv').config();
const request = require('supertest');
const { expect } = require('chai');
const postRegister = require('./fixtures/postRegister.json');
const { gerarUsuario } = require('./helpers/usuariosRandom.js');

describe('User Register', () => {
    describe('POST /auth/register', () => {
        it('Valida que se permite ingresar um novo usuário e retorna 201', async () => {

            const novoUsuario = gerarUsuario();
            //console.log('Enviado para a API:', novoUsuario);
            const resposta = await request(process.env.BASE_URL_REST)
                .post('/auth/register')
                .set('Content-Type', 'application/json')
                .send(novoUsuario)
            
            expect(resposta.status).to.equal(201);
            expect(resposta.body.message).to.equal('User registered successfully');

        });

        it('Valida que se não se permite ingresar usuarios duplicados e retorna 409', async () => {
            const bodyRegister = { ...postRegister }

            const resposta = await request(process.env.BASE_URL_REST)
                .post('/auth/register')
                .set('Content-Type', 'application/json')
                .send(bodyRegister)
            //console.log(resposta.body);
            expect(resposta.status).to.equal(409);
            expect(resposta.body.message).to.equal('User already exists');
        });

        it('Valida que se não se permite registrar usuarios con tipo invalido e retorna 400', async () => {

            const resposta = await request(process.env.BASE_URL_REST)
                .post('/auth/register')
                .set('Content-Type', 'application/json')
                .send({
                        username: 'businessUser',
                        password: 'password123',
                        role: 'client' 
                })

            expect(resposta.status).to.equal(400);
            expect(resposta.body.message).to.equal('Invalid role. Allowed roles are customer and business.');
        });
    });
});