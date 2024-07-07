import React, { useEffect, useRef, useState } from "react";

import Search from "../Assets/search.png";
import Clear from "../Assets/clear.png";
import Cloud from "../Assets/cloud.png";
import Drizzle from "../Assets/drizzle.png";
import Humidity from "../Assets/humidity.png";
import Rain from "../Assets/rain.png";
import Snow from "../Assets/snow.png";
import Wind from "../Assets/wind.png";

import "./weather.css";
const Weather = () => {
  const useInput = useRef();
  const [weatherData, setWeatherdata] = useState(false);
  const allIcons = {
    "01n": Clear,
    "01d": Clear,
    "02d": Cloud,
    "02n": Cloud,
    "03d": Cloud,
    "03n": Cloud,
    "04d": Drizzle,
    "04n": Drizzle,
    "09d": Rain,
    "09n": Rain,
    "10d": Rain,
    "10n": Rain,
    "13d": Snow,
    "13n": Snow,
  };
  const search_api = async (city) => {
    if(city===""){
      alert("Enter the city name!");
      return;
    }
    try {
      const apiKey = "d6e844906a8eebc550ab38909e3a961f";
      const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
      const response = await fetch(URL);
      const data = await response.json();
      console.log(data);
      const icon = allIcons[data.weather[0].icon] || Clear;
      setWeatherdata({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {}
  };
  useEffect(() => {
    search_api("Delhi");
  }, []);
  return (
    
    <div className="weather">
      {weatherData?<>
      <div className="search-bar">
        <input type="text" placeholder="Search" ref={useInput} />
        <img
          src={Search}
          alt="Search"
          onClick={() => search_api(useInput.current.value)}
        />
      </div>
      <img src={weatherData.icon} alt="clear" className="weather-icon" />
      <p className="temperature">{weatherData.temperature}°C</p>
      <p className="location">{weatherData.location}</p>
      <div className="weather-data">
        <div className="col">
          <img src={Humidity} alt="humidity" />
          <div>
            <p>{weatherData.humidity} %</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="col">
          <img src={Wind} alt="wind" />
          <div>
            <p>{weatherData.windSpeed} km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
      </>:<>
       <h1>Loading...</h1>
      </>}
      
    </div>
  );
};

export default Weather;
