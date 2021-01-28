const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({

    msg_to_id: {
        type: String,
        required: true,
        trim: true
    },
    msg_by_id: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    }
},
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = mongoose.model('chat', chatSchema);