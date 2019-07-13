const express = require('express');
const app = express();
const path = require('path');
var cons = require('consolidate');
const router = express.Router();
var exphbs  = require('express-handlebars');

app.use(express.static(__dirname + '/css'));

router.get('/', function(req, res){
    res.sendFile(path.join(__dirname+'/views/index.html'));
});

router.get('/home', function(req,res){
    res.sendfile(path.join(__dirname+'/views/home.html'));
});

router.get('/map', function(req,res){
    res.sendfile(path.join(__dirname+'/views/map.html'));
});

router.get('/history', function(req,res){
    res.sendfile(path.join(__dirname+'/views/history.html'));
});

router.get('/dashboard', function(req, res){
    res.render('dashboard', {"name": "Hazel Green", "age": "25", "location": "Surry Hills", "team": "Girl Geek"})
})


app.use('/', router);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.engine('handlebars', exphbs());
app.set('view engine', 'html');
app.set('view engine', 'handlebars');

const server = app.listen(7000, () => {
    console.log(`Express running → PORT ${server.address().port}`);
});
