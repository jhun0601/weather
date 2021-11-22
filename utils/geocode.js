const request = require("request");
const geoCoord = (address, callback) => {
  const API_KEY = "AIzaSyCh_7bfEIVL6nR9YOQd0GlqK7KyYltw7Xg";
  const geoUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${API_KEY}`;
  request({ url: geoUrl, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect GeoMap.", undefined);
      //   console.log("Unable to connect GeoMap.");
    } else if (
      body.status === "INVALID_REQUEST" ||
      body.results[0] === undefined
    ) {
      callback("Could not find place. Try another search", undefined);
      //   console.log("Could not find place.");
    } else {
      const formatted_address = body.results[0].formatted_address;
      const { lat, lng } = body.results[0].geometry.location;

      callback(undefined, {
        lat,
        lng,
        location: formatted_address,
      });
    }
  });
};
module.exports = geoCoord;
