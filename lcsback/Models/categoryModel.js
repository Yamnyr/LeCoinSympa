const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 2,
        maxlength: 50
    },
    description: {
        type: String,
        trim: true,
        maxlength: 250
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Utiliser `mongoose.models` pour éviter les erreurs de redéclaration dans un environnement de développement
const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);

module.exports = Category;
