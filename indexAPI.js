var currentLatitude;
var currentLongitude;

async function getData(api_url) {
    console.log("step 2/start data fetch");
    const response = await fetch(api_url);
    const data = await response.json();
    console.log("step 3/data:", data);
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
    console.log("step 1/try url:", weatherRequest);

    const jsonWeatherReply = await getData(weatherRequest);
    
    console.log("step 4/json reply:", jsonWeatherReply);
    const avg_temp = jsonWeatherReply["forecast"]["forecastday"][0]["day"]["avgtemp_c"];
    console.log("step 5/temperature:", avg_temp);
}

getLocation();
