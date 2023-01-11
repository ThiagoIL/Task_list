const express = require ('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const Demanda = require('./models/Demanda');
const path = require('path');

//path
app.use(express.static(__dirname + '/views'));
app.use(express.static(path.join(__dirname,"public")));


app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/home', function(req, res){
    Demanda.findAll({order: [["id", "DESC"]]}).then(function(demandas){
        res.render('index', {demandas: demandas})
    })
})

app.post('/add', function(req, res){
    Demanda.create({
        nome: req.body.nome
    }).then(function(){
        res.redirect('/home')
    })
})

app.get('/delete/:id', function(req, res){
    Demanda.destroy({where: {'id': req.params.id}}).then(function(){
        res.redirect('/home')

    }).catch(function(erro){
        res.send('postagem não existe')
    })
})

app.get('/editar/:id', async function (req, res){
    await Demanda.findAll({where: {'id': req.params.id}}).then(function(demanda){
        res.render('update', {oneDemanda: demanda})
    })
    
})

app.post('/update', async function(req, res){
    const demanda = await Demanda.findByPk(req.body.id)
    demanda.nome = req.body.nome
    demanda.save().then(function(){
        res.redirect('/home')
    })
})

app.listen(8081, function(){
    console.log("Auto bots lets road!!!")
})