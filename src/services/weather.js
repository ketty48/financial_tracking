// services/weatherService.js
import configurations from "./configs/index.js";
import axios from 'axios';

export const getWeatherDataFromAPI = async (city) => {
    const apiKey =  configurations.WEATHER_API;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await axios.get(apiUrl);
        const weatherData = {
            city: response.data.name,
            weatherCondition: response.data.weather[0].description,
            temperature: response.data.main.temp,
            humidity: response.data.main.humidity,
            // Add more data fields as needed
        };
        return weatherData;
    } catch (error) {
        throw new Error('Failed to fetch weather data from the API');
    }
};
