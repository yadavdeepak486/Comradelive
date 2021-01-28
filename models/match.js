const mongoose = require('mongoose');

const likeSchema = mongoose.Schema({

    liked_by: {
        type: String,
        required: true,
    },
    liker: {
        type: String,
        required: true,
        trim: true
    }
},
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = mongoose.model('match', likeSchema);