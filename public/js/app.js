const weatherForm = document.querySelector("form");
const search = document.getElementById("searchLocation");
const messageOne = document.getElementById("message");
const result = document.getElementById("result");

const port = process.env.PORT;

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  messageOne.textContent = "Loading . . . ";
  result.textContent = "";
  if (port === 5000) {
    const url = "http://localhost:5000";
  }
  fetch("/weather?address=" + search.value).then((response) => {
    console.log(port);
    console.log(url);
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        result.textContent = data.forecast;
      }
    });
  });
});
