const weatherForm = document.querySelector("form");
const search = document.getElementById("searchLocation");
const messageOne = document.getElementById("message");
const result = document.getElementById("result");
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  messageOne.textContent = "Loading . . . ";
  result.textContent = "";
  fetch("http://localhost:5000/weather?address=" + search.value).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          messageOne.textContent = data.error;
        } else {
          messageOne.textContent = data.location;
          result.textContent = data.forecast;
        }
      });
    }
  );
});
