const mongoose = require('mongoose');

const UserImgSchema = mongoose.Schema({


    image_user_id: {
        type: String,
    },
    avatar: {
        type: String
    },
    public_id: {
        type: String
    }
});

module.exports = mongoose.model('UserImg', UserImgSchema);