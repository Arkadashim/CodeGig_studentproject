const express = require('express');
const exphbs = require('express-handlebars');
const body = require('body-parser');
const path = require('path');

// db context
const db = require('./config/database');
const bodyParser = require('body-parser');

//testing db
db.authenticate()
    .then(() => console.log('Connected'))
    .catch(err => console.log(err))

const app = express();

// handlebars
app.engine('handlebars', exphbs.engine( {defaultLayout: 'main'} ));
app.set('view engine', 'handlebars');

// body parser
app.use(bodyParser.urlencoded({extended: false}));

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//index route
app.get('/', (req, res) => res.render('index', {layout: 'landing'}));

//Gig routes
app.use('/gigs', require('./routes/gigs'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));