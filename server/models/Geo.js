const {model, Schema} = require('mongoose');

export const schema = new Schema({
    lat: {
        type: Number,
        required: true,
        min: -90,
        max: 90,
    },
    lng: {
        type: Number,
        required: true,
        min: -180,
        max: 180,
    },
    description: {
        type: String,
        required: true,
        minlength: 20,
        maxlength: 100,
        trim: true
    },
    date: {
        type: Date,
        required: true,
        max: new Date(),
    },
    userId: {
        type: String,
        required: true,
    }
});

export const MapSchema = model('geo', schema);