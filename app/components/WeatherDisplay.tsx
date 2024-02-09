import React from "react";
import { Weather } from "../types/WeatherTypes";

interface WeatherDisplayProps {
  weather: Weather;
}

export const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weather }) => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold">Weather</h1>
      <ul>
        <li>
          <strong>Date:</strong> {weather.forecast.forecastday[0].date}
        </li>
        <li>
          <strong>Max Temperature:</strong> {weather.forecast.forecastday[0].day.maxtemp_c}°C (
          {weather.forecast.forecastday[0].day.maxtemp_f}°F)
        </li>
        <li>
          <strong>Min Temperature:</strong> {weather.forecast.forecastday[0].day.mintemp_c}°C (
          {weather.forecast.forecastday[0].day.mintemp_f}°F)
        </li>
        <li>
          <strong>Average Temperature:</strong> {weather.forecast.forecastday[0].day.avgtemp_c}°C (
          {weather.forecast.forecastday[0].day.avgtemp_f}°F)
        </li>
        <li>
          <strong>Condition:</strong> {weather.forecast.forecastday[0].day.condition.text}
        </li>
        <li>
          <strong>Max Wind Speed:</strong> {weather.forecast.forecastday[0].day.maxwind_mph} mph (
          {weather.forecast.forecastday[0].day.maxwind_kph} kph)
        </li>
        <li>
          <strong>Total Precipitation:</strong> {weather.forecast.forecastday[0].day.totalprecip_mm} mm (
          {weather.forecast.forecastday[0].day.totalprecip_in} in)
        </li>
        <li>
          <strong>Average Visibility:</strong> {weather.forecast.forecastday[0].day.avgvis_km} km (
          {weather.forecast.forecastday[0].day.avgvis_miles} miles)
        </li>
        <li>
          <strong>Average Humidity:</strong> {weather.forecast.forecastday[0].day.avghumidity}%
        </li>
        <li>
          <strong>UV Index:</strong> {weather.forecast.forecastday[0].day.uv}
        </li>
      </ul>
    </div>
  );
};
