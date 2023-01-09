const Sequelize = require('sequelize');
const sequelize = new Sequelize('tasks', 'root', '', {
    host: "localhost",
    dialect: 'mysql'
});


sequelize.authenticate().then(function(){
    console.log("conectado ao banco com sucesso")
}).catch(function(erro){
    console.log("Não foi possivel conectar ao banco!"+erro)
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}