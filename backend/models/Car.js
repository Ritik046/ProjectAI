const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    tags: [String],
    images: [{
        type: String, 
    }],
}, { timestamps: true });

module.exports = mongoose.model('Car', CarSchema);