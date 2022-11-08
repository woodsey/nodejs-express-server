const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


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
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        })
    } else {
        const location = req.query.address;
        geocode(location, (error, geoData) => {
            if (error) {
                return res.send({
                    error: error
                });
            }

            forecast(geoData.latitude + ',' + geoData.longitude, (error, forecastData) => {
                if (error) {
                    return res.send({
                        error: error
                    });
                }

                const data = {
                    forecast: forecastData,
                    location: geoData.longitude + ' - ' + geoData.latitude,
                    address: location
                }
                return res.send(data);

                console.log(chalk.yellow('Location: ' + geoData.location + ' = Lat: ' + geoData.latitude + ' - Long: ' + geoData.longitude));
                console.log(chalk.blue(forecastData));
            });
        });


    }
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search query'
        })
    }
    res.send({
        products: [req.query.search]
    })
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