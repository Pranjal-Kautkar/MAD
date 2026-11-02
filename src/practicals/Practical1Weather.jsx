// Practical 1: Weather App
// Shows current temperature and wind speed using Open-Meteo API
import React, { useState } from 'react';
import { Cloud, Wind, Thermometer, Search, MapPin, AlertCircle, RefreshCw } from 'lucide-react';

export default function Practical1Weather({ onToast }) {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Exact algorithm implementation as specified in the practical manual
  const getWeather = async (targetCity) => {
    const queryCity = typeof targetCity === 'string' ? targetCity : city;
    
    if (queryCity.trim() === '') {
      setMessage('Please enter a city');
      setWeather(null);
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      // Step 7: Call the geocoding API to get latitude and longitude
      const geoRes = await fetch(
        'https://geocoding-api.open-meteo.com/v1/search?name=' + encodeURIComponent(queryCity.trim()) + '&count=1'
      );
      const geo = await geoRes.json();

      // Step 8: If no city is found, show message and stop
      if (!geo.results || geo.results.length === 0) {
        setMessage('City not found');
        setWeather(null);
        setLoading(false);
        return;
      }

      // Step 9: Take the first result
      const place = geo.results[0];

      // Step 10: Call the forecast API with latitude and longitude
      const forecastRes = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=' +
          place.latitude +
          '&longitude=' +
          place.longitude +
          '&current_weather=true'
      );
      const w = await forecastRes.json();

      // Step 11: Store the city name, temperature and wind speed
      setWeather({
        name: place.name + (place.country ? `, ${place.country}` : ''),
        temp: w.current_weather.temperature,
        wind: w.current_weather.windspeed,
        weathercode: w.current_weather.weathercode,
        time: w.current_weather.time
      });

      // Step 12: Clear the message
      setMessage('');
      if (onToast) onToast(`Loaded weather for ${place.name}!`, 'success');
    } catch (err) {
      // Step 6: Catch block sets network error
      console.error(err);
      setMessage('Network error');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handlePreset = (presetName) => {
    setCity(presetName);
    getWeather(presetName);
  };

  return (
    <div className="rn-mobile-screen">
      {/* React Native Heading */}
      <div className="rn-header-area">
        <div className="rn-badge">Practical 1</div>
        <h2 className="rn-heading">Weather App</h2>
        <p className="rn-subheading">Open-Meteo Live API Weather Forecast</p>
      </div>

      {/* Input & Action */}
      <div className="rn-input-group">
        <label className="rn-label">Enter City Name:</label>
        <div className="rn-search-box">
          <MapPin size={18} className="rn-input-icon" />
          <input
            type="text"
            className="rn-text-input"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && getWeather()}
            placeholder="Enter city (e.g. Nagpur)"
          />
        </div>
      </div>

      {/* Preset Quick Chips */}
      <div className="rn-chips-container">
        <span className="rn-chips-label">Quick samples:</span>
        {['Nagpur', 'Mumbai', 'Delhi', 'London', 'Tokyo'].map((p) => (
          <button
            key={p}
            type="button"
            className={`rn-chip ${city === p ? 'active' : ''}`}
            onClick={() => handlePreset(p)}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Button Title="Get Weather" */}
      <button
        type="button"
        className="rn-button rn-button-primary"
        onClick={() => getWeather()}
        disabled={loading}
      >
        {loading ? (
          <>
            <RefreshCw size={16} className="spin" />
            <span>Fetching Weather...</span>
          </>
        ) : (
          <>
            <Search size={16} />
            <span>Get Weather</span>
          </>
        )}
      </button>

      {/* Message Output */}
      {message && (
        <div className="rn-message-box error">
          <AlertCircle size={18} />
          <span>{message}</span>
        </div>
      )}

      {/* Weather Result Display */}
      {weather && (
        <div className="rn-weather-card">
          <div className="rn-weather-header">
            <div>
              <span className="rn-weather-city-label">Current Forecast</span>
              <h3 className="rn-weather-city">{weather.name}</h3>
            </div>
            <div className="rn-weather-badge-live">
              <span className="live-dot"></span> Live
            </div>
          </div>

          <div className="rn-weather-metrics">
            <div className="rn-metric-box">
              <Thermometer size={26} className="temp-icon" />
              <div className="rn-metric-data">
                <span className="rn-metric-val">{weather.temp}°C</span>
                <span className="rn-metric-desc">Temperature</span>
              </div>
            </div>

            <div className="rn-metric-box">
              <Wind size={26} className="wind-icon" />
              <div className="rn-metric-data">
                <span className="rn-metric-val">{weather.wind} km/h</span>
                <span className="rn-metric-desc">Wind Speed</span>
              </div>
            </div>
          </div>

          <div className="rn-weather-footer">
            <Cloud size={16} />
            <span>Tested as specified in Practical 1 record book</span>
          </div>
        </div>
      )}
    </div>
  );
}
