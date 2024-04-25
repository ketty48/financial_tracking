import UserModel from '../models/user.model.js';
import { sendWeatherUpdateEmail } from '../utils/sendEmail.js';
import asyncWrapper from "../middlewares/async.js";
import { BadRequestError } from "../errors/index.js";
import { fetchWeatherDataForLocations } from '../services/weatherService.js'; // Assuming you have a function to fetch weather data

// Controller function to handle weather update requests
export const handleWeatherUpdateRequest = asyncWrapper(async (req, res, next) => {
    const userId = req.user.id;
    const user = await UserModel.findById(userId);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const userPreferredLocations = user.preferredLocations;

    try {
        const weatherData = await fetchWeatherDataForLocations(userPreferredLocations);

        for (const locationWeatherData of weatherData) {
            await sendWeatherUpdateEmail(user.email, locationWeatherData);
        }

        res.status(200).json({ message: 'Weather updates sent successfully' });
    } catch (error) {
        console.error('Error sending weather update emails:', error);
        res.status(500).json({ error: 'Failed to send weather update emails' });
    }
});
