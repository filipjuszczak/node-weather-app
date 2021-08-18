const request = require('request');

const forecast = function (latitude, longitude, callback) {
  const URL = `http://api.weatherstack.com/current?access_key=<ACCESS_KEY>&query=${latitude},${longitude}`;

  request({ url: URL, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined);

      return;
    }

    if (body.error) {
      callback('Unable to find location!', undefined);

      return;
    }

    const { temperature, pressure, humidity, wind_speed } = body.current;

    callback(undefined, {
      temperature,
      pressure,
      humidity,
      windSpeed: wind_speed,
    });
  });
};

module.exports = forecast;
