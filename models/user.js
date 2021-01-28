const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({

    email: {
        type: String,
        trim: true
    },
    username: {
        type: String,
        trim: true
    },
    phone: {
        type: Number,

    },
    gender: {
        type: String,

    },
    dob: {
        type: String,
        trim: true
    },
    interest_gender: {
        type: String,

    },
    interest_in: {
        type: String,

    },
    about: {
        type: String,

    },
    education: {
        type: String,

    },
    job: {
        type: String,
    },
    company: {
        type: String,
    },
    height: {
        type: String,
    },
    drinking: {
        type: String,
    },
    smoking: {
        type: String,
    },
    language: {
        type: String,
    },
    relationship_status: {
        type: String,
    },
    sexuality: {
        type: String,
    },
    active_status: {
        type: String,
    },
    blocked_status: {
        type: String,
    },
    moods: {
        type: String
    },
},
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = mongoose.model('users', UserSchema);