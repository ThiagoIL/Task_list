const Sequelize = require('sequelize');
const conexao = new Sequelize('tasks', 'root', '', {
    host: "localhost",
    dialect: 'mysql'
});


conexao.authenticate().then(function(){
    console.log("conectado ao banco com sucesso")
}).catch(function(erro){
    console.log("Não foi possivel conectar ao banco!"+erro)
})