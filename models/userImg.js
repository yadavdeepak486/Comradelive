const mongoose = require('mongoose');

const UserImgSchema = mongoose.Schema({


    image_user_id: {
        type: String,
    },
    avatar: {
        type: String
    },
    cloudinary_id: {
        type: String
    }
},
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = mongoose.model('UserImg', UserImgSchema);