const mongoose = require('mongoose');

const AdvertisementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 1000
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // La référence correcte du modèle Category
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['active', 'sold', 'archived'],
        default: 'active'
    },
    images: [{
        type: String,
        trim: true
    }]
});

AdvertisementSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Advertisement = mongoose.models.Advertisement || mongoose.model('Advertisement', AdvertisementSchema);

module.exports = Advertisement; // Export uniquement Advertisement
