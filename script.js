
let weather = {
    apiKey: "95aea2fa3086c0c966339a3829c2b016", //public api key
    
    //fetchWeather functions grabs the input value which is city and shows the weather of that particular city
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
      )
        .then((response) => {
          if (!response.ok) {
            alert("No weather found."); //if the city is not present or value input is invalid the alert is sent and it will throw an error
            throw new Error("No weather found.");
          }
          return response.json();   //else it will return the data in json format
        })
        .then((data) => this.displayWeather(data));  //then we will display that data using displayWeather function
    },
    //here we pass data as parameter and we declare store the name,icon,temp, description etc. as constants. 
    //There were others as well for example min. temperature, max temperature etc.
    displayWeather: function (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];  //it was present as an array
      const { temp, humidity } = data.main; // main was containing temperature and humidity as temp and humidity
      const { speed } = data.wind;
        
      //here we grab the respective elements using their class naem and change their respective innerText according to the city entered
      document.querySelector(".city").innerText = "Weather in " + name;
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = temp + "°C";
      document.querySelector(".humidity").innerText =
        "Humidity: " + humidity + "%";
      document.querySelector(".wind").innerText =
        "Wind speed: " + speed + " km/h";
        
      document.querySelector(".weather").classList.remove("loading"); //remove the class "loading" if present. (By default loading class was present
      document.body.style.backgroundImage =
        "url('https://unsplash.com/s/photos/landscape')"; //changing the background image according to the city name entered, images are from unplash
    },
    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);     //search function calls fetchWeather function and passes the value entered as a parameter to city
    },
  };
  
//adding event listener to the search button when clicked will call the search function
  document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
  
//similarly, adding event listener to keyboard keys, if enter is pressed the call the search function
  document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });
  
//by default we fetch the weather of Ranchi
  weather.fetchWeather("Ranchi");
