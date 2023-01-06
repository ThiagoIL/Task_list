const express = require ('express');
const app = express();
const handlebars = require('express-handlebars');
const Sequelize = require('sequelize');


app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

const conexao = new Sequelize('tasks', 'root', '', {
    host: "localhost",
    dialect: 'mysql'
});


app.get('/home', function(req, res){
    res.render('index')
});

app.listen(8081, function(){
    console.log("Auto bots lets road!!!")
})