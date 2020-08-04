const {model, Schema} = require('mongoose');

export const schema = new Schema({
    lat: Number,
    lng: Number,
    description: String,
    date: Date,
});

export const MapSchema = model('geo', schema);