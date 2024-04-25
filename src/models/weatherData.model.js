import { model, Schema } from "mongoose";

const WeatherDataSchema = new Schema({
    location: {
        type: Schema.Types.ObjectId,
        ref: 'locations',
        required: true
    },
    weatherCondition: {
        type: String,
        required: true,
    },
    temperature: {
        type: Number,
        required: false,
    },
    humidity: {
        type: Number,
        required: false,
    },
    windSpeed: {
        type: Number,
        required: false,
    }
}, { timestamps: true }); // Moved timestamps option outside the schema definition object

const WeatherData = model("WeatherData", WeatherDataSchema);
export default WeatherData;
