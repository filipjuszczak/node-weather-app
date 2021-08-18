const request = require('request');

const geocode = function (address, callback) {
  const URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address,
  )}.json?access_token=<TOKEN>`;

  request({ url: URL, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to location services!', undefined);
      return;
    }

    if (body.features.length === 0) {
      callback('Unable to find location! Try another search.', undefined);
      return;
    }

    callback(undefined, {
      latitude: body.features[0].center[1],
      longitude: body.features[0].center[0],
    });
  });
};

module.exports = geocode;
