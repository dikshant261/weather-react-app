import React, { useEffect, useRef, useState } from "react";
import SearchIcon from "../Assets/search.png";
import ClearIcon from "../Assets/clear.png";
import CloudIcon from "../Assets/cloud.png";
import DrizzleIcon from "../Assets/drizzle.png";
import HumidityIcon from "../Assets/humidity.png";
import RainIcon from "../Assets/rain.png";
import SnowIcon from "../Assets/snow.png";
import WindIcon from "../Assets/wind.png";
import "./weather.css";


const Weather = () => {
  const useInput = useRef();
  const [weatherData, setWeatherdata] = useState(null);
  const [message, setMessage] = useState("");

  const allIcons = {
    "01n": ClearIcon,
    "01d": ClearIcon,
    "02d": CloudIcon,
    "02n": CloudIcon,
    "03d": CloudIcon,
    "03n": CloudIcon,
    "04d": DrizzleIcon,
    "04n": DrizzleIcon,
    "09d": RainIcon,
    "09n": RainIcon,
    "10d": RainIcon,
    "10n": RainIcon,
    "13d": SnowIcon,
    "13n": SnowIcon,
  };
   
  const search_api = async (city) => {
    if (city.trim() === "") {
      alert("Enter the city name!");
      return;
    }
    try {
      const apiKey=process.env.REACT_APP_WEATHER_API_KEY;
      const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
      const response = await fetch(URL);
      const data = await response.json();

      if (data.cod !== 200) {
        setMessage("City not found! Please enter a valid city name or check Spelling.");
        setWeatherdata(null);
        return;
      }

      const icon = allIcons[data.weather[0].icon] || ClearIcon;
      setMessage("");
      setWeatherdata({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
      setWeatherdata(null);
    }
  };

  useEffect(() => {
    search_api("Delhi");
  }, []);

  return (
    <div className="weather">
      <h1 className="app-heading">Weather App</h1>

      {/* Search Bar */}
      <div className="search-bar">
        <input type="text" placeholder="Search for a city..." ref={useInput} />
        <img src={SearchIcon} alt="Search" onClick={() => search_api(useInput.current.value)} />
      </div>

      {/* Show Error Message if present */}
      {message && <p className="error-message">{message}</p>}

      {/* Show Weather Data only if there's no error */}
      {!message && weatherData && (
        <>
          <div className="weather-info">
            <img src={weatherData.icon} alt="weather icon" className="weather-icon" />
            <p className="temperature">{weatherData.temperature}°C</p>
            <p className="location">{weatherData.location}</p>
          </div>

          <div className="weather-data">
            <div className="col">
              <img src={HumidityIcon} alt="humidity" />
              <p>{weatherData.humidity}%</p>
              <span>Humidity</span>
            </div>
            <div className="col">
              <img src={WindIcon} alt="wind" />
              <p>{weatherData.windSpeed} km/h</p>
              <span>Wind Speed</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
