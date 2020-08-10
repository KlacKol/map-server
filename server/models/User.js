const {model, Schema} = require('mongoose');

export const schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: 20,
        minlength: 3,
    }
});

export const UserSchema = model('user', schema);