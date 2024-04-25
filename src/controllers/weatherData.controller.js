
import axios from 'axios';
import WeatherData from '../models/weatherData.model.js';
import configurations from "../configs/index.js";
import asyncWrapper from "../middlewares/async.js";
import Location from '../models/location.model.js'
export const fetchWeatherData = asyncWrapper(async (locations) => {
    console.log("Locations:", locations); 

    const weatherDataPromises = locations.map(async (locationId) => {
        try {
            // Fetch the location document based on the ID to get the name
            const location = await Location.findById(locationId);
            console.log("Location:", location); // Log the fetched location document

            // Check if the location exists and has a name
            if (location && location.cityName) {
                console.log("City name:", location.cityName); // Log the city name

                // Make the weather API call using the location name
                const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${configurations.WEATHER_API}&q=${location.cityName}`);
                
                console.log("Response:", response.data); // Log the response from the weather API
                const { weather_condition, temp_c, humidity, wind_kph } = response.data.current;
                
                return {
                    location: location.cityName, // Use location name instead of ID
                    weatherCondition: weather_condition,
                    temperature: temp_c,
                    humidity,
                    windSpeed: wind_kph
                };
            } else {
                console.log(`No location found for ID ${locationId}`);
                return null;
            }
        } catch (error) {
            console.error("Error fetching weather data:", error);
            return null;
        }
    });

    const weatherData = await Promise.all(weatherDataPromises);
    console.log("Weather data:", weatherData); // Log the weather data before filtering
    const filteredWeatherData = weatherData.filter(data => data !== null);
    console.log("Filtered weather data:", filteredWeatherData); // Log the filtered weather data
    return filteredWeatherData;
});


// Function to store weather data in the database
export const storeWeatherData = asyncWrapper(async (weatherData) => {
    await WeatherData.insertMany(weatherData);
});

// Function to retrieve weather data for a specific location
export const retrieveWeatherData = asyncWrapper(async (location) => {
    const weatherData = await WeatherData.find({ location });
    return weatherData;
});
