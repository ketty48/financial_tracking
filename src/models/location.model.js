import { model, Schema } from "mongoose";

const LocationSchema = new Schema({
    cityName: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: false,
    },
    latitude: {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true
    },
   
});

const Location = model("Locations", LocationSchema);
export default Location;