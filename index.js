const express = require ('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const Demanda = require('./models/Demanda');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');


// configurações

//session
app.use(session({
    secret: "qweqweqweqwe123123123123qweqweqwe123123123",
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

//path
app.use(express.static(__dirname + '/views'));
app.use(express.static(path.join(__dirname,"public")));
//handlebars
app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
//bodyparser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())





//routes
app.get('/home', function(req, res){
    Demanda.findAll({where: {'feito': null}, order: [["id", "DESC"]]}).then(function(demandas){
        res.render('index', {demandas: demandas})
    })
})
app.get('/feito', function(req, res){
    Demanda.findAll({where: {'feito': true}, order: [["id", "DESC"]]}).then(function(demandas){
        res.render('done', {demandas: demandas})
    })
})

app.get('/', function(req, res){
    res.redirect('/home')
})

app.get('/', function(req, res){
    res.redirect('/home')
})

app.post('/add', function(req, res){
    Demanda.create({
        nome: req.body.nome,
        descricao: req.body.descricao
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
    demanda.descricao = req.body.descricao
    demanda.save().then(function(){
        res.redirect('/home')
    })
})

app.get('/feito/:id', async function(req, res){
    const demanda = await Demanda.findByPk(req.params.id)
    demanda.feito = 1
    demanda.save().then(function(){
        res.redirect('/home')
    })
})

app.listen(8081, function(){
    console.log("Auto bots lets road!!!")
})