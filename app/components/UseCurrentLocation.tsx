"use client";
import React, { useState } from "react";
import { Geolocation } from "../types/GeolocationTypes";

interface UseCurrentLocationButtonProps {
  onLocationResolved: ({ location }: { location: Geolocation }) => void;
  setIsLoading: (isLoading: boolean) => void;
  setWeather: (weather: any) => void;
}

const UseCurrentLocationButton: React.FC<UseCurrentLocationButtonProps> = ({
  onLocationResolved,
  setIsLoading,
  setWeather,
}) => {
  const [location, setLocation] = useState<Geolocation | null>(null);

  const handleGetCurrentLocation = () => {
    // Clear parent components loading and weather state
    setIsLoading(true);
    setWeather(null);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };

          setLocation(location);

          onLocationResolved({
            location,
          });
        },
        (error) => {
          console.error("Error getting current location:", error); // TODO: Handle error gracefully
          setIsLoading(false);
        },
      );
    } else {
      console.error("Geolocation is not supported by this browser."); // TODO: Handle error gracefully
    }
  };

  return (
    <button onClick={handleGetCurrentLocation} className="p-2 bg-blue-400 rounded text-white">
      Use Current Location
    </button>
  );
};

export default UseCurrentLocationButton;
