var currentLatitude;
var currentLongitude;

async function getData(api_url) { // leest antwoord in en wacht voor json response
    const response = await fetch(api_url);
    const data = await response.json();
    return new Promise(resolve => setTimeout(() => resolve(data), 100));
}

function getLocation() { // maakt een geolocation aan
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(extractCoords);
    } else { 
        console.log("4, not working");
    }
}

function WriteWeatherVariablesToText(jsonWeatherReply) { // maakt json variables en schrijft ze naar de html
    const avgHumidity = jsonWeatherReply["forecast"]["forecastday"][0]["day"]["avghumidity"];
    const avgTemp = jsonWeatherReply["forecast"]["forecastday"][0]["day"]["avgtemp_c"];
    const rain_chance = jsonWeatherReply["forecast"]["forecastday"][0]["day"]["daily_chance_of_rain"];
    const max_temp = jsonWeatherReply["forecast"]["forecastday"][0]["day"]["maxtemp_c"];
    const max_wind = jsonWeatherReply["forecast"]["forecastday"][0]["day"]["maxwind_kph"];
    const min_temp = jsonWeatherReply["forecast"]["forecastday"][0]["day"]["mintemp_c"];
    const rain = jsonWeatherReply["forecast"]["forecastday"][0]["day"]["totalprecip_mm"];

    document.getElementById("textRainChance").innerHTML = rain_chance.toString();
    document.getElementById("textRainFall").innerHTML = rain.toString();
    document.getElementById("textWindSpeed").innerHTML = max_wind.toString();
    document.getElementById("textMinTemp").innerHTML = min_temp.toString();
    document.getElementById("textMaxTemp").innerHTML = max_temp.toString();
}

async function extractCoords(position) { // gebruikt de geolocation en getData functie voor waarden en meer
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;


    const baseUrlWeather = "https://api.weatherapi.com/v1/forecast.json";
    const weatherKey = "a5e5b58ca02f405c915110838240406";
    const weatherRest = "&days=1&aqi=no&alerts=no";
    const weatherRequest = baseUrlWeather + "?key=" + weatherKey + "&q=" + latitude + "," + longitude + weatherRest;

    jsonWeatherReply = await getData(weatherRequest);
    
    setCookie("jsonWeatherReply", jsonWeatherReply) // hier nog een datum
    WriteWeatherVariablesToText(jsonWeatherReply)    
}

function setCookie(cname, cvalue) { // maakt een cookie aan voor een dag
    const now = new Date();
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    console.log(endOfDay)
    const expires = "expires=" + endOfDay.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


function getCookie(cname) { // zoekt mijn cookies
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}


jsonWeatherReply = getCookie("jsonWeatherReply")
if (jsonWeatherReply != "") {
    console.log("uses cookie");
    console.log("returned cookie:", jsonWeatherReply)
    WriteWeatherVariablesToText(jsonWeatherReply);
} else {
    console.log("uses api");
    getLocation();
    console.log("returned api:", jsonWeatherReply)
}