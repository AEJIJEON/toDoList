const weather = document.querySelector(".js-weather");

const API_KEY = "72e12c9a7e134b8da73f0862f712df50";
const COORDS = 'coords';
let WEATHERIMGNUM = 0

function getWeather(lat, lng){

    fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric&lang=kr`
    ).then(function(response){
        return response.json();
    }
    ).then(function(json){
        
        const temperature = json.main.temp;
        const place = json.name;
        const weatherMain = json.weather[0].main;
        weather.innerText = `${temperature}°C ${weatherMain.toLowerCase()}`;
        
        
        
        if (weatherMain === "Clear"){
            WEATHERIMGNUM = 1
        } else if (weatherMain === "Clouds"){
            WEATHERIMGNUM = 2
        } else if (weatherMain === "Rain"){
            WEATHERIMGNUM = 3
        } else if (weatherMain === "Snow"){
            WEATHERIMGNUM = 4
        }
        if (WEATHERIMGNUM !== 0){
            const icon = document.createElement("img");
            icon.src = `images/weather_${WEATHERIMGNUM}.jpg`
            weather.parentNode.append(icon);
            icon.classList.add("weatherImage");
        }
        

    })
}

function saveCoords(coordsObj){
    
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    }

    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(){
    console.error("getCurrentPosistion failed.");
}

function askForCoords(){
        navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords == null){
        askForCoords();
    }
    else{
        const parsedCoords = JSON.parse(localStorage.getItem(COORDS));
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }

}

function init(){
    loadCoords();

}

init();


