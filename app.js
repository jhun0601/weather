const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCoord = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

const publicPath = path.join(__dirname, "public/");
const viewsPath = path.join(__dirname, "templates/views");
const partialsPath = path.join(__dirname, "templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "jhunmark Ng",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "jhunmark Ng",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Jhunmark Ng",
  });
});
app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: "You must provide address",
    });
  }

  geoCoord(address, (error, { lat, lng, location } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }
    forecast(lat, lng, location, (error, forecastData) => {
      if (error) {
        return res.send({
          error,
        });
      }

      return res.send({
        forecast: forecastData,
        location,
        address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "you must provide search term",
    });
  }
  console.log(req.query);
  res.send({
    products: [],
  });
});
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Jhunmark Ng",
    message: "Help article not found",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Jhunmark Ng",
    message: "Page not found",
  });
});

app.listen(5000, () => {
  console.log("Server 5000");
});
