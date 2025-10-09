import React from "react";
import { useWeather } from "../hooks/useWeather";
import { DateTime } from "luxon";

const Weather = () => {
  const { weatherData, tempType } = useWeather();
  
  
  console.log('Weather Component Rendered');
  console.log('weatherData:', weatherData);
  console.log('tempType:', tempType);
  
  if (!weatherData) {
    console.log('No weather data available');
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 mt-10">
        <p>No weather data available</p>
      </div>
    );
  }
  
  console.log('weatherData.weather:', weatherData.weather);
  console.log('weatherData.clouds:', weatherData.clouds);
  
  const timestamp = weatherData.dt;
  const dateTime = DateTime.fromSeconds(timestamp);
  const formattedDate = dateTime.toFormat("dd MMMM yyyy");
  const formattedTime = dateTime.toFormat("hh:mm a");
  const day = dateTime.toFormat("cccc");
  const clouds = weatherData.clouds.all;
  const weather = weatherData.weather[0];
  
  const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@4x.png`;
  console.log('Icon URL:', iconUrl);
  
  const tempCel = Math.trunc(weatherData.main.temp - 273.15);
  const tempFah = Math.trunc((weatherData.main.temp - 273.15) * 1.8 + 32);
  const tempFeelCel = Math.trunc(weatherData.main.feels_like - 273.15);
  const tempFeelFah = Math.trunc(
    (weatherData.main.feels_like - 273.15) * 1.8 + 32
  );

  return (
    <div className="flex flex-col items-center py-4">
      <div className="w-48 h-48 bg-gray-200 dark:bg-slate-800 rounded-3xl flex items-center justify-center mb-4 shadow-lg">
        <img 
          src={iconUrl} 
          alt={weather.description} 
          className="w-full h-full object-contain p-2"
          onLoad={() => console.log('✅ Icon loaded successfully:', iconUrl)}
          onError={(e) => {
            console.error('❌ Icon failed to load:', iconUrl);
            console.error('Error:', e);
          }}
        />
      </div>

      <h1 className="text-7xl font-bold mb-2 dark:text-white">
        {tempType ? `${tempCel}°C` : `${tempFah}°F`}
      </h1>

      <p className="text-xl font-semibold mb-3 dark:text-gray-300">
        Feels Like: {tempType ? `${tempFeelCel}°C` : `${tempFeelFah}°F`}
      </p>

      <div className="flex items-center text-xl font-semibold gap-x-2 mb-3 capitalize dark:text-white">
        <p>{weather.description}</p>
        <img 
          src={iconUrl} 
          alt={weather.description} 
          className="w-10 h-10 bg-gray-100 dark:bg-slate-700 rounded-lg p-1"
        />
      </div>

      <p className="text-xl font-semibold mb-6 dark:text-white">
        Clouds: {clouds}%
      </p>

      <p className="text-lg font-medium dark:text-gray-300">
        {weatherData?.name || "No Data"}, {weatherData?.sys.country || "No Data"}
      </p>

      <p className="text-base dark:text-gray-400">
        {day}, {formattedTime}
      </p>
      <p className="text-base dark:text-gray-400">{formattedDate}</p>
    </div>
  );
};

export default Weather;