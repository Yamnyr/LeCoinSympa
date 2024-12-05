const Advertisement = require('../models/advertisementModel');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Category = require('../models/categoryModel');
// Créer une nouvelle annonce
exports.createAdvertisement = async (req, res) => {
    try {
        const { title, description, price, category } = req.body;

        // Récupérer l'ID de l'utilisateur depuis le token JWT
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const authorId = decoded.id; // Utilisez `id` au lieu de `userId`

        const newAdvertisement = new Advertisement({
            title,
            description,
            price,
            category,
            author: authorId
        });

        const savedAdvertisement = await newAdvertisement.save();

        // Populate pour renvoyer les détails complets
        await savedAdvertisement.populate('category author', 'name email');

        res.status(201).json(savedAdvertisement);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de l\'annonce', error: error.message });
    }
};

// Obtenir toutes les annonces avec filtrage par catégorie
exports.getAllAdvertisements = async (req, res) => {
    try {
        const { category } = req.query;

        let query = {};
        if (category) {
            query.category = category;
        }

        const advertisements = await Advertisement.find(query)
            .populate('category', 'name')
            .populate('author', 'email');

        res.status(200).json(advertisements);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des annonces', error: error.message });
    }
};

// Obtenir une annonce par son ID
// Dans votre contrôleur, ajoutez une validation de l'ID
exports.getAdvertisementById = async (req, res) => {
    try {
        const { id } = req.params;

        // Vérifiez si l'ID est un ObjectId valide
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID de l\'annonce invalide' });
        }

        const advertisement = await Advertisement.findById(id)
            .populate('category', 'name')
            .populate('author', 'email');

        if (!advertisement) {
            return res.status(404).json({ message: 'Annonce non trouvée' });
        }

        res.status(200).json(advertisement);
    } catch (error) {
        res.status(500).json({
            message: 'Erreur lors de la récupération de l\'annonce',
            error: error.message
        });
    }
};

// Mettre à jour une annonce
exports.updateAdvertisement = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, price, category, status } = req.body;

        const updatedAdvertisement = await Advertisement.findByIdAndUpdate(
            id,
            { title, description, price, category, status },
            { new: true, runValidators: true }
        ).populate('category author', 'name email');

        if (!updatedAdvertisement) {
            return res.status(404).json({ message: 'Annonce non trouvée' });
        }

        res.status(200).json(updatedAdvertisement);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'annonce', error: error.message });
    }
};

// Supprimer une annonce
exports.deleteAdvertisement = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedAdvertisement = await Advertisement.findByIdAndDelete(id);

        if (!deletedAdvertisement) {
            return res.status(404).json({ message: 'Annonce non trouvée' });
        }

        res.status(200).json({ message: 'Annonce supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de l\'annonce', error: error.message });
    }
};

