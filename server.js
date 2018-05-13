// MAIN SERVER FILE

var port = 3000;

// DEPENDENCIES
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

// ROUTES
var index = require('./routes/index');
var todos = require('./routes/todos');



// VIEW ENGINE (EJS)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


// MIDDLE WARE FOR CLIENT STATIC FILE (ANGULAR UI)
app.use(express.static(path.join(__dirname, './Client/dist/Client')));




// MIDDLE WARE FROM BODYPARSER
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// FOR ROUTES
app.use('/', index);
app.use('/api/v1/', todos);

app.listen(port, function () {
    console.log('Server started on port 3000...');
});
