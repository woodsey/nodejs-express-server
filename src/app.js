const path = require('path');
const express = require('express');
const hbs = require('hbs');


console.log(__dirname);
console.log(path.join(__dirname, '../public'));


const app = express();

// define paths for express config
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

// set up handlebars and view location
app.set('view engine', 'hbs'); // sets up handlebars with express
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicPath));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Something different'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        message: 'First, seek to understand'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page'
    })
});


app.get('/weather', (req, res) => {
    const data = {
        forecast: '',
        location: ''
    }
    res.send(data);
});


app.get('/help/*', (req, res) => {
    res.render('errors', {
        errormessage: 'Missing help page - more help on the way soon!'
    });
});

app.get('*', (req, res) => {
    res.render('errors', {
        errormessage: 'Generic error 404 page'
    });
});

app.listen(3000, () => {
    console.log("Server is running");
});