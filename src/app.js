const path = require('path');
const express = require('express');


console.log(__dirname);
console.log(path.join(__dirname, '../public'));


const app = express();
const publicPath = path.join(__dirname, '../public');
app.set('view engine', 'hbs'); // sets up handlebars with express
app.use(express.static(publicPath));


app.get('', (req, res) => {
    res.render('index')
});

/*
app.get('/help', (req, res) => {
    res.redirect('/help.html');
});

app.get('/about', (req, res) => {
    res.redirect('/about.html');
});
*/

app.get('/weather', (req, res) => {
    const data = {
        forecast: '',
        location: ''
    }
    res.send(data);
});

app.listen(3000, () => {
    console.log("Server is running");
});