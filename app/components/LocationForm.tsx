"use client";
import React, { useState } from "react";

interface LocationFormProps {
  onSubmit: ({ location }: { location: string }) => void;
}

const LocationForm: React.FC<LocationFormProps> = ({ onSubmit }) => {
  const [location, setLocation] = useState("");

  // TODO: Type event with proper event type
  const handleSubmit = (e: any, location: string) => {
    e.preventDefault();
    onSubmit({ location: location });
  };

  const disabled = !location;

  return (
    <form onSubmit={(e) => handleSubmit(e, location)} className="space-y-5">
      <div className="flex flex-col">
        <label>Enter a location:</label>
        <input type="text" className="dark:text-black" value={location} onChange={(e) => setLocation(e.target.value)} />
      </div>
      <button disabled={disabled} type="submit" className="p-2 bg-blue-400 rounded text-white float-end">
        Submit
      </button>
    </form>
  );
};

export default LocationForm;
