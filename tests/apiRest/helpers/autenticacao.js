const request = require('supertest')
const postLogin = require('../fixtures/postLogin.json')


const obterToken = async (username, password) => {

    const bodyLogin = { ...postLogin }

    const respostaLogin = await request(process.env.BASE_URL_REST)
                    .post('/auth/login')
                    //setar o cabeçalho
                    .set('Content-Type', 'application/json')
                    //corpo da requisição
                    .send(bodyLogin)

          return respostaLogin.body.token

}

module.exports = {
    obterToken
}