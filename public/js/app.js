'use strict';

const form = document.querySelector('form');
const search = document.querySelector('input');
const messageEl = document.querySelector('#message');

const getWeather = async function (location) {
  search.value = '';
  messageEl.textContent = 'Loading...';

  const URL = `/weather?address=${location}`;
  const req = await fetch(URL);

  if (!req.ok) {
    messageEl.textContent = 'Oops! Something went wrong!';
    return;
  }

  const data = await req.json();

  if (data.error) {
    messageEl.textContent = data.error;
    return;
  }

  const markup = `
    <p>🌡 Temperature: ${data.temperature}°C</p>
    <p>⛰ Pressure: ${data.pressure} hPa</p>
    <p>💧 Humidity: ${data.humidity}%</p>
    <p>💨 Wind speed: ${data.windSpeed} km/h</p>
  `;

  messageEl.textContent = '';
  messageEl.insertAdjacentHTML('beforeend', markup);
};

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const location = search.value;
  getWeather(location);
});
