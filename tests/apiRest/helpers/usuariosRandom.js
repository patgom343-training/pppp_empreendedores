
function gerarUsuario(role = "business") {
  // Gera o número random, multiplica e arredonda para que não seja um valor quebrado
  const random = Math.floor(Math.random() * 1000000);
  return {
    username: `usuario${random}`,
    password: `senha${random}`,
    role
  };
}

module.exports = { gerarUsuario };