var currentLatitude;
var currentLongitude;

async function getData(api_url) {
    const response = await fetch(api_url);
    const data = await response.json();
    return new Promise(resolve => setTimeout(() => resolve(data), 100));
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(requestWeather);
    } else { 
        console.log("4, not working");
    }
}

async function requestWeather(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    console.log(longitude, latitude);

    const baseUrlWeather = "https://api.weatherapi.com/v1/forecast.json";
    const weatherKey = "a5e5b58ca02f405c915110838240406";
    const weatherRest = "&days=1&aqi=no&alerts=no";
    const weatherRequest = baseUrlWeather + "?key=" + weatherKey + "&q=" + latitude + "," + longitude + weatherRest;

    const jsonWeatherReply = await getData(weatherRequest);
    
    const avgHumidity = jsonWeatherReply["forecast"]["forecastday"][0]["day"]["avghumidity"];
    const avgTemp = jsonWeatherReply["forecast"]["forecastday"][0]["day"]["avgtemp_c"];
    const rain_chance = jsonWeatherReply["forecast"]["forecastday"][0]["day"]["daily_chance_of_rain"];
    const max_temp = jsonWeatherReply["forecast"]["forecastday"][0]["day"]["maxtemp_c"];
    const max_wind = jsonWeatherReply["forecast"]["forecastday"][0]["day"]["maxwind_kph"];
    const min_temp = jsonWeatherReply["forecast"]["forecastday"][0]["day"]["mintemp_c"];
    const rain = jsonWeatherReply["forecast"]["forecastday"][0]["day"]["totalprecip_mm"];

    console.log(rain_chance)
    document.getElementById("textRainChance").innerHTML = rain_chance.toString();
    document.getElementById("textRainFall").innerHTML = rain.toString();
    document.getElementById("textWindSpeed").innerHTML = max_wind.toString();
    document.getElementById("textMinTemp").innerHTML = min_temp.toString();
    document.getElementById("textMaxTemp").innerHTML = max_temp.toString();
}

getLocation();
