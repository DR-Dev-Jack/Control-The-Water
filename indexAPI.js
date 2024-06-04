var currentLatitude;
var currentLongitude;

async function getData(api_url) {
    console.log("start data fetch")
    const response = await fetch(api_url);
    const data = await response.json(); 
    console.log("data:", data);
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getCoordinates);
    } else { 
        console.log("4, not working")
    }
}

function getCoordinates(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    console.log(longitude, latitude)
    const baseUrlWeather = "https://api.weatherapi.com/v1/forecast.json";
    const weatherKey = "a5e5b58ca02f405c915110838240406"
    const weatherRest = "&days=1&aqi=no&alerts=no"
    const weatherRequest = baseUrlWeather+"?key="+weatherKey+"&q="+latitude+","+longitude+weatherRest;
    console.log("try url:", weatherRequest)
    getData(weatherRequest)
}

getLocation();