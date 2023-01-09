const db = require('./conection.js');

const Demanda = db.sequelize.define('demandas', {
    nome: {
        type: db.Sequelize.STRING
    }

})

//Demanda.sync({force: true})
module.exports = Demanda; 