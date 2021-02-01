const mongoose = require('mongoose');

const VisiterSchema = mongoose.Schema({

    visited_by: {
        type: String,
        required: true,
    },
    visited_on_profile: {
        type: String,
        required: true,
    }
},
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = mongoose.model('visiters', VisiterSchema);