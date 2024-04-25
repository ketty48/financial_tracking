import dotenv from "dotenv";
dotenv.config();

const Configs = {
    MONGODB_CONNECTION_STRING: process.env.MONGO_DB,
    CLIENT_APP: process.env.CLIENT_APP || 'http://localhost:5173',
    PORT: process.env.PORT,
    JWT_SECRET_KEY: process.env.SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN,
    JWT_REFRESH_COOKIE_NAME: process.env.JWT_REFRESH_COOKIE_NAME,
    WEATHER_API: process.env.OPENWEATHERMAP_API_KEY
}

export default Configs;