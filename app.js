//API -- open weather map

//Capturara los elementos del DOM

let container = document.getElementById("container");
let searchForm = document.getElementById("search_submit");
let searchInput = document.getElementById("search_input");
let temperatureDegrees = document.getElementById("degreeNumber");
let weatherIcon = document.getElementById("weatherIcon");
let temperatureDescription = document.getElementById("description");
let timezone = document.getElementById("timezone");
let date = document.getElementById("date");
let min = document.getElementById("min");
let max = document.getElementById("max");

const key = "e4e1b76683df5f925eef10c0f2ee4128"

const backgroundImage = (obj) =>{
    
    //capturara la fecha actual 
    let currentDate = new Date(obj.dt * 1000).toLocaleString("es-ES",{
        timeStyle: "short",
        dateStyle: "long"
    })

    //obtener la hora actual
    const hour = new Date(obj.dt * 1000).getHours();
    console.log(currentDate)
    console.log(hour)

    //cambiando la fecha en el DOM
    date.textContent = `${currentDate}`
    
    //condicion del background en el dom
    if(hour > 6 && hour < 18 ){
        container.classList.remove("night"); 
        container.classList.add("day"); 
    }else{
        container.classList.remove("day"); 
        container.classList.add("night"); 
    }    
}

const displayData = (obj) =>{
    temperatureDegrees.textContent = Math.floor(obj.main.temp)
    timezone.textContent = `${obj.name}, ${obj.sys.country}`
    const icon = obj.weather[0].icon
    console.log(icon)
    weatherIcon.innerHTML = `<img src='icons/${icon}.png'>`
    temperatureDescription.textContent = obj.weather[0].description.charAt(0).toUpperCase() + obj.weather[0].description.slice(1)
    min.textContent = Math.floor(obj.main.temp_min)
    max.textContent = Math.floor(obj.main.temp_max)
   
}

const getWeatherData = async (city)=>{

    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric&lang=sp`);
    const data = await res.json();
    backgroundImage(data);
    console.log(data)
    displayData(data)
}

searchForm.addEventListener("submit", e =>{
    e.preventDefault()
    console.log(searchInput.value)
    getWeatherData(searchInput.value)
})

//Inicio
window.onload = () =>{
    getWeatherData("Cartagena");
}