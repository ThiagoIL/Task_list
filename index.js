const express = require ('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const Demanda = require('./models/Demanda');

app.use(express.static('public'));

app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/home', function(req, res){
    Demanda.findAll().then(function(demandas){
        res.render('index', {demandas: demandas})
    })
});

app.post('/add', function(req, res){
    Demanda.create({
        nome: req.body.nome
    }).then(function(){
        res.redirect('/home')
    })
});

app.listen(8081, function(){
    console.log("Auto bots lets road!!!")
})