//fetch weather and time
function fetchWeather(city) {
    const apiKey_city = "API KEY";
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + apiKey_city).then(response => {
        return response.json();
    }).then(data => {
        console.log(data);
        showingWeather(data);
    }).catch(error => {
        console.error(error);
    });

    const apiKey_time = "API KEY";
    fetch("https://timezone.abstractapi.com/v1/current_time/?api_key=" + apiKey_time + "&location=" + city).then(response => {
        return response.json();
    }).then(data => {
        console.log(data);
        showingTime(data);
    }).catch(error => {
        console.error(error);
    });
};

//get the weather
function showingWeather(data) {
    const city = data.name;
    console.log(city);
    const temp = data.main.temp;
    console.log(temp);
    const descr = data.weather[0].description;
    const icon = data.weather[0].icon;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

    document.querySelector(".place").innerHTML = "Weather in " + city;
    document.querySelector(".temp").innerHTML = temp + "°C";
    document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".descr").innerHTML = descr;
    document.querySelector(".hum").innerHTML = "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerHTML = "Wind Speed: " + windSpeed + " km/h";
    document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + city + "')";
};
//get the time
function showingTime(data) {
    const time = data.datetime;
    const timezone = data.timezone_location;

    document.querySelector(".date").innerHTML = "Date: " + time;
    document.querySelector(".timezone").innerHTML = "Timezone: " + timezone;
};

//button clicked
function searchCity() {
    const name = document.querySelector(".search_bar").value;
    if(name.length <= 0) {
        alert("Please enter a city name!");
    };
    fetchWeather(name);
};
//press enter
document.querySelector(".search").addEventListener("click", function () {
    searchCity();
    document.querySelector(".search_bar").value = "";
});
document.querySelector(".search_bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        searchCity();
        document.querySelector(".search_bar").value = "";
    };
});

fetchWeather("tokyo");