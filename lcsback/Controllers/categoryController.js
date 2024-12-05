// controllers/categoryController.js
// const { Category } = require('../models/categoryModel');
const Advertisement = require('../models/advertisementModel');
const mongoose = require('mongoose');
const Category = require('../models/categoryModel');

exports.createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        // Vérifier si la catégorie existe déjà
        const existingCategory = await Category.findOne({ name });

        if (existingCategory) {
            return res.status(400).json({ message: 'Cette catégorie existe déjà' });
        }

        const newCategory = new Category({ name, description });
        const savedCategory = await newCategory.save();

        res.status(201).json(savedCategory);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de la catégorie', error: error.message });
    }
};


// Obtenir toutes les catégories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find(); // Récupère toutes les catégories
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des catégories', error: error.message });
    }
};

// Mettre à jour une catégorie
exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            { name, description },
            { new: true, runValidators: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({ message: 'Catégorie non trouvée' });
        }

        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la mise à jour de la catégorie', error: error.message });
    }
};

// Supprimer une catégorie
exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedCategory = await Category.findByIdAndDelete(id);

        if (!deletedCategory) {
            return res.status(404).json({ message: 'Catégorie non trouvée' });
        }

        res.status(200).json({ message: 'Catégorie supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression de la catégorie', error: error.message });
    }
};
