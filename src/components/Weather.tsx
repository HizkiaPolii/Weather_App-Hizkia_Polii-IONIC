import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Weather.css";

// Interface untuk mendefinisikan tipe data dari API
interface WeatherData {
  location: {
    name: string;
    country: string;
  };
  current: {
    temp_c: number;
    humidity: number;
    wind_kph: number;
    condition: {
      text: string;
    };
  };
}

const Weather = () => {
  const [location, setLocation] = useState("Manado");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const apiKey = "24d52950a0f4485b8f7163954240610"; // Ganti dengan API key yang benar

  const fetchWeatherData = async (city: string) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
      );
      setWeatherData(response.data);
      setError(""); // Reset error jika berhasil
    } catch (err: any) {
      // Tambahkan `any` untuk penanganan error
      if (err.response) {
        setError(err.response.data.error.message); // Tampilkan pesan error dari API
      } else {
        setError("Failed to fetch weather data");
      }
    } finally {
      setLoading(false);
    }
  };

  // Panggil fungsi untuk fetch data cuaca saat komponen dimuat
  useEffect(() => {
    fetchWeatherData(location);
  }, []); // Hanya panggil saat komponen pertama kali dimuat

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  const handleSearch = () => {
    if (location.trim() !== "") {
      // Validasi input
      fetchWeatherData(location);
    } else {
      setError("Please enter a valid city name."); // Pesan error jika input kosong
    }
  };

  const weatherImages: { [key: string]: string } = {
    Clear: "../assets/img/sun.png",
    Sunny: "../assets/img/sun.png",
    "Partly cloudy": "../assets/img/cloudy-day.png",
    "Partly Cloudy": "../assets/img/cloudy-day.png",
    Cloud: "../assets/img/cloud.png",
    Overcast: "../assets/img/overcast.png",
    Mist: "../assets/img/fog.png",
    "Patchy rain nearby": "../assets/img/day-rain.png",
    "Patchy light drizzle": "../assets/img/day-rain.png",
    "Light rain": "../assets/img/rainy.png",
    "Light rain shower": "../assets/img/rainy.png",
    "Moderate rain": "../assets/img/rainy.png",
    "Heavy Rain": "../assets/img/heavy-rain.png",
    "Night Rain": "../assets/img/night-rain.png",
    Rainy: "../assets/img/rainy.png",
    Sleet: "../assets/img/sleet.png", // Sleet
    Snow: "../assets/img/snow.png", // Snow
    Snowy: "../assets/img/snowy.png", // Snowy
    Storm: "../assets/img/storm.png", // Storm
    "Patchy snow possible": "../assets/img/snow.png", // Patchy snow possible
    "Patchy light snow": "../assets/img/snow.png", // Patchy light snow
    "Heavy snow": "../assets/img/snowy.png", // Heavy snow
    "Blowing snow": "../assets/img/snowy.png", // Blowing snow
    Blizzard: "../assets/img/blizzard.png", // Blizzard
    "Light freezing rain": "../assets/img/freezing-rain.png", // Light freezing rain
    "Moderate freezing rain": "../assets/img/freezing-rain.png", // Moderate freezing rain
    "Ice pellets": "../assets/img/precipation.png", // Ice pellets
    "Light showers of ice pellets": "../assets/img/precipation.png", // Light showers of ice pellets
    "Moderate or heavy showers of ice pellets": "../assets/img/precipation.png", // Moderate or heavy showers of ice pellets
    "Patchy sleet possible": "../assets/img/precipation.png", // Patchy sleet possible
    "Patchy heavy snow": "../assets/img/snowy.png", // Patchy heavy snow
    "Heavy freezing rain": "../assets/img/freezing-rain.png", // Heavy freezing rain
    "Moderate or heavy rain with thunder": "../assets/img/storm.png", // Moderate or heavy rain with thunder
    Sunrise: "../assets/img/sunrise.png", // Sunrise
    Sunset: "../assets/img/sunset.png", // Sunset
    Fog: "../assets/img/fog.png", // Fog
    "Light drizzle": "../assets/img/partlyrain.png", // Light drizzle
    "Moderate or heavy rain shower": "../assets/img/heavy-rain.png", // Moderate or heavy rain shower
    "Patchy light rain": "../assets/img/rainy.png", // Patchy light rain
    "Light snow": "../assets/img/snow.png", // Light snow
    "Moderate snow": "../assets/img/snow.png", // Moderate snow
    "Light sleet": "../assets/img/sleet.png", // Light sleet
    "Moderate or heavy sleet": "../assets/img/sleet.png", // Moderate or heavy sleet
    "Moderate or heavy freezing rain": "../assets/img/freezing-rain.png", // Moderate or heavy freezing rain
    "Heavy rain shower": "../assets/img/heavy-rain.png", // Heavy rain shower
  };

  return (
    <div className="weather-container">
      <div className="search-box">
        <input
          type="text"
          value={location}
          onChange={handleCityChange}
          placeholder="Enter city"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {weatherData && (
        <div className="weather-info">
          <h3>
            {weatherData.location.name}, {weatherData.location.country}
          </h3>
          <img
            src={
              weatherImages[weatherData.current.condition.text] ||
              "../assets/img/default.png"
            }
            alt={weatherData.current.condition.text}
          />
          <p>{weatherData.current.condition.text}</p>
          <div className="weather-cards">
            <div className="weather-card">
              <p>Temperature</p>
              <img src="../assets/img/temperature.png"></img>
              <h3>{weatherData.current.temp_c} °C</h3>
            </div>
            <div className="weather-card">
              <p>Humidity</p>
              <img src="../assets/img/humidity.png"></img>
              <h3>{weatherData.current.humidity} %</h3>
            </div>
            <div className="weather-card">
              <p>Wind Speed</p>
              <img src="../assets/img/winds.png"></img>
              <h3>{weatherData.current.wind_kph} kph</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
