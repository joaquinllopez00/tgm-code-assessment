"use client";
import LocationForm from "./components/LocationForm";
import UseCurrentLocationButton from "./components/UseCurrentLocation";
import React, { useState } from "react";
import { Geolocation } from "./types/GeolocationTypes";
import { weatherApi } from "./api/WeatherApi";
import { WeatherDisplay } from "./components/WeatherDisplay";
import { Weather } from "./types/WeatherTypes";

export default function Home() {
  const [currentLocation, setCurrentLocation] = useState<Geolocation | null>(null);
  const [customLocation, setCustomLocation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [weather, setWeather] = useState<Weather | null>(null); // TODO: Fix type to be the actual response type from the API

  // Function for handling the custom location request
  const handleCustomLocationRequest = async ({ location }: { location: string }) => {
    setIsLoading(true);
    // Clear weather state:
    setWeather(null);
    setCustomLocation(location);
    try {
      const response = await weatherApi.getCustomLocationWeather(location);
      setWeather(response);
    } catch (error) {
      console.error("Error getting weather:", error);
    }
    setIsLoading(false);
  };

  // Function for handling the weather request for the current location
  const handleWeatherCurrentLocationRequest = async ({ location }: { location: Geolocation }) => {
    // We do not set the loading state, or clear the weather state in this function since getting the users browser location is async. We trigger that state manually in the UseCurrentLocationButton component

    setCurrentLocation(location);
    try {
      const response = await weatherApi.getCurrentLocationWeather(location);
      setWeather(response);
    } catch (error) {
      console.error("Error getting weather:", error);
    }
    setIsLoading(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24 space-y-5">
      {weather && <WeatherDisplay weather={weather} />}
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <h1 className="text-3xl font-bold">Enter a location</h1>
          <UseCurrentLocationButton
            onLocationResolved={handleWeatherCurrentLocationRequest}
            setIsLoading={setIsLoading}
            setWeather={setWeather}
          />
          <p className="my-2"> - or -</p>
          <LocationForm onSubmit={handleCustomLocationRequest} />
        </>
      )}
    </main>
  );
}
