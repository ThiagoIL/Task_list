const db = require('./conection.js');

const Demanda = db.sequelize.define('demandas', {
    nome: {
        type: db.Sequelize.STRING
    },
    feito: {
        type: db.Sequelize.BOOLEAN            
    },
    descricao: {
        type: db.Sequelize.TEXT('long')
    },
    prioridade: {
        type: db.Sequelize.BOOLEAN
    }

})

// Demanda.sync({force: true})
module.exports = Demanda; 