const express = require('express');
const app = express();
const path = require('path');
var cons = require('consolidate');
const router = express.Router();
var exphbs  = require('express-handlebars');
var events = require('./events');
var history = require('./history');
history.load()
events.load()

app.use(express.static(__dirname + '/css'));

router.get('/', function(req, res){
    res.sendFile(path.join(__dirname+'/views/index.html'));
});

// router.get('/signup', function(req,res){
//     res.sendfile(path.join(__dirname+'/views/signup.handlebars'));
// });


router.get('/signup', function(req, res){
    res.render('signup')
})

router.get('/map', function(req,res){
    res.render("map", {"key": process.env.KEY, "events": JSON.stringify(events.getNewEventsForUser(1)), "history":history.getEventsForUser(1)});
});

router.post('/register/:id', function(req, res){
    res.send("ok");
    history.saveEvent(1,req.params.id, events.getEventById(req.params.id).name,new Date(), 10);
    history.save();
})

router.get('/history', function(req,res){
    res.sendfile(path.join(__dirname+'/views/history.html'));
});

app.use(express.static(__dirname + '/css'));
router.get('/dashboard', function(req, res){
    res.render('dashboard', {"name": "Hazel Green", "age": "25", "location": "Surry Hills", "team": "Girl Geek","history":history.getEventsForUser(1)})
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
