    let weatherApiKey = "a9fba3e11debe6e17e885bca31345069";
    let form = document.querySelector('form');
    let temp = document.getElementById("temperature");
    let humidity = document.getElementById("humidity");
    let wind = document.getElementById("wind");
    let cloud = document.getElementById("cloud");
    let cityInput = document.getElementById("search_value"); // Reference to the input field
    let search = document.querySelector(".search");
    let coordinates = document.getElementById("lat-long");
    let cityName = document.getElementById("city");
    let description = document.querySelector(".description");
    // onclick event when fetch weather by city
    form.addEventListener('submit', (event) =>{
        event.preventDefault();
        let city = cityInput.value; // Get the city value inside the event listener
        if (city == "") {
          alert("Enter a city name!");
        } 
        //cal function here 
        var reqObj = {'type' : 'by-city',
          'city' : city,
        }
        getWeather(reqObj);
    })

    //onclick your location geo coordinates (lat and long)
    coordinates.addEventListener("click", function(){
      getCurrentPosition();
    });
    
    //fetch coordinates lat and long
    function getCurrentPosition(){
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var lat = position.coords.latitude;
          var long = position.coords.longitude;
          var reqObj = {'type' : 'by-lat-long',
          'lat' : lat,
          'long' : long,
          }
          getWeather(reqObj);
          });
        }
    }

    function getWeather(obj) {
      if(obj.type == 'by-city') {
        let cityValue = obj.city;
        var url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${weatherApiKey}`
      } else{
        let latValue = obj.lat
        let longValue = obj.long
         url = `https://api.openweathermap.org/data/2.5/weather?lat=${latValue}&lon=${longValue}&appid=${weatherApiKey}`
      }

      console.log(obj)
      console.log(weatherApiKey)
      
      console.log(url)
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log("Weather :", data);
          let temperatureValue = data.main.temp - 273.15;  // Convert from Kelvin to Celsius
          let temperatureFixed = temperatureValue.toFixed(2); // Fix to two decimal places
          console.log(temperatureFixed);  // Example: 25.45

          let humidityValue = data.main.humidity;
          let windValue = data.wind.speed;

            cityName.querySelector("figcaption").innerText = data.name ;
            cityName.querySelector("img").src = 'https://flagsapi.com/'+ data.sys.country+'/shiny/32.png';
            temperature.querySelector("img").src = 'https://openweathermap.org/img/wn/'+ data.weather[0].icon +'@4x.png';
            temperature.querySelector("figcaption span").innerText = temperatureFixed;
            description.innerText = data.weather[0].description;
          humidity.innerHTML = `${humidityValue}%`;
          wind.innerHTML = `${windValue} m/s`;
          cloud.innerText = data.clouds.all+'%';
          // temperature.append(temperatureFixed);
        })
        .catch((error) => console.error("Error fetching IP address:", error));
    }