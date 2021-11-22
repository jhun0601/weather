const request = require("request");

const forecast = (lat, lng, location, callback) => {
  const API_KEY = "d7a0833a2fb306944e45ba31ee3c8e05";
  const url = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${lat},${lng}`;
  request({ url: url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect weather service.", undefined);
    } else if (body.error) {
      callback("Could not find place.", undefined);
    } else {
      const data = body.current;
      callback(
        undefined,
        data.weather_descriptions[0] +
          ". It is currently " +
          data.temperature +
          " degrees out. There is a " +
          data.feelslike +
          "% chance of rain."
      );
    }
  });
};
module.exports = forecast;
