import axios from "axios";
import { ApiClass } from "./ApiClass";
import { Geolocation } from "../types/GeolocationTypes";
class WeatherApi extends ApiClass {
  constructor(apiUrl: string, apiKey: string) {
    //@ts-ignore - the key is set to .env
    super(apiUrl, apiKey); //TODO: fix type error since the key can technically be undefined
  }

  async getCurrentLocationWeather(location: Geolocation, days: number = 1) {
    const locationQueryParam = `${location.latitude},${location.longitude}`;
    const url = `${this.apiUrl}/forecast.json?key=${this.apiKey}&days=${days}&q=${locationQueryParam}`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async getCustomLocationWeather(location: string, days: number = 1) {
    const url = `${this.apiUrl}/forecast.json?key=${this.apiKey}&days=${days}&q=${location}`;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (err: any) {
      throw new Error(err);
    }
  }
}

export const weatherApi = new WeatherApi(
  "https://api.weatherapi.com/v1",
  process.env.NEXT_PUBLIC_WEATHER_API_KEY as string,
); // TODO: Fix type so there is no casting needed
