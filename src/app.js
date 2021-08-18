const path = require('path');
const express = require('express');
const hbs = require('hbs');
const chalk = require('chalk');

const forecast = require('./utils/forecast.js');
const geocode = require('./utils/geocode.js');

const PORT = process.env.PORT || 3000;

const app = express();

const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Filip Juszczak',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Filip Juszczak',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    message:
      'To get information about weather in desired location, type the city name in the location field and press the button. Some useful information will be shown on the screen. 😊',
    name: 'Filip Juszczak',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address!',
    });
  }

  geocode(req.query.address, (error, { longitude, latitude } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, data) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        temperature: data.temperature,
        forecast: data.weatherDescriptions,
        pressure: data.pressure,
        humidity: data.humidity,
        windSpeed: data.windSpeed,
      });
    });
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404 Page',
    error: '❌ Page not found! (404)',
    name: 'Filip Juszczak',
  });
});

app.listen(PORT, () => {
  const message = chalk.green.inverse(
    `Server is up on port ${chalk.yellow(PORT)}!`,
  );
  console.log('✅', message);
});
