const mongoose = require('mongoose');

const SuperlikeSchema = mongoose.Schema({

    super_liked_by: {
        type: String,
        required: true,
    },
    super_liker: {
        type: String,
        required: true,
        trim: true
    }
},
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = mongoose.model('superlike', SuperlikeSchema);