const path = require('path');

const hbs = require('hbs');

const express = require('express');

const geocode = require('./utils/geocode');

const forecast = require('./utils/forecast');

//template engine:dynamic webpages---
//handlebars--dynamic webpages and resuable code
//partials--set up headers and footers of different webpages

const app = express();

const port = process.env.PORT || 3000;
//defines path for express config

const index = path.join(__dirname, '../public');
const template = path.join(__dirname, '../templates/views');
const partials = path.join(__dirname, '../templates/partials');

//handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', template);
hbs.registerPartials(partials);

// a static directory to serve
app.use(express.static(index));      //static takes the path to the folder

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Website',
        name: "Shreya Maheshwari"
    });             //render generate html output
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        description:'It uses data from the open weather map api and mapbox.',
        name: "Shreya Maheshwari"
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        question:'How to  use it?',
        description: 'Enter your address in the search bar to get the forecast of your location and you will get your weather forecast.',
        name: "Shreya Maheshwari",
        title: "Help"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Must provide an address'
        });
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render("404", {
        title: '404 ',
        name: 'Shreya Maheshwari',
        message: "Help article not found."
    });
})

app.get('*', (req, res) => {                 // *=match anything that has not match till now
    res.render('404', {
        title: "404 ",
        message: "Page not found",
        name: "Shreya Maheshwari"
    });
});

app.listen(port, () => {
    console.log('Server is running.' + port);
})