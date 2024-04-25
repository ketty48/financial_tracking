import express from 'express';
const weatherDataRouter = express.Router();
import { fetchWeatherData, storeWeatherData, retrieveWeatherData} from '../controllers/weatherData.controller.js';
import { addweatherDataValidation } from '../utils/validation.js';

weatherDataRouter.post('/add', storeWeatherData);
weatherDataRouter.get('/list', fetchWeatherData);
// weatherDataRouter.put('/update', updateweatherData);
weatherDataRouter.get('/findById', retrieveWeatherData);
// weatherDataRouter.delete('/delete', deleteweatherData);

export default weatherDataRouter;