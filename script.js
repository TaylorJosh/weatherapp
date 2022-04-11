let weather = {
    apiKey: 9cb9a596789f79b3b2c064f6e8a93e81,
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=imperial&appid=" +
          this.apiKey
      )
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity, temp_min, temp_max } = data.main;
      const { speed } = data.wind;
      document.querySelector(".date").innerText = new Date().toDateString();
      document.querySelector(".city").innerText = "Weather in " + name;
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp_min").innerText = "low " + temp_min;
      document.querySelector(".temp_max").innerText = "high " + temp_max;
      document.querySelector(".temp").innerText = temp + "°F";
      document.querySelector(".humidity").innerText =
        "humidity: " + humidity + "%";
      document.querySelector(".wind").innerText =
        "wind speed: " + speed + " mph";
      document.querySelector(".weather").classList.remove("loading");
          },
    search: function () {
      this.fetchWeather(document.querySelector(".searchBar").value);
    },
  };
  
  document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
  
  document
    .querySelector(".searchBar")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });
  
  weather.fetchWeather("Charlotte");
