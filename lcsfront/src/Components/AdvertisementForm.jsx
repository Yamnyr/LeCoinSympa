import React from "react";

const AdvertisementForm = ({ modalType, advertisement, categories, onSubmit, onChange }) => {
    return (
        <div>
            <h2>{modalType === 'create' ? "Créer une annonce" : "Modifier l'annonce"}</h2>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Titre"
                    value={advertisement.title}
                    onChange={(e) => onChange({...advertisement, title: e.target.value})}
                    required
                />
                <textarea
                    placeholder="Description"
                    value={advertisement.description}
                    onChange={(e) => onChange({...advertisement, description: e.target.value})}
                    required
                />
                <input
                    type="number"
                    placeholder="Prix"
                    value={advertisement.price}
                    onChange={(e) => onChange({...advertisement, price: e.target.value})}
                    required
                    min="0"
                />
                <select
                    value={advertisement.category}
                    onChange={(e) => onChange({...advertisement, category: e.target.value})}
                    required
                >
                    <option value="">Sélectionnez une catégorie</option>
                    {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                {/* Nouveau champ pour l'URL de l'image */}
                <input
                    type="text"
                    placeholder="URL de l'image"
                    value={advertisement.images || ""}
                    onChange={(e) => onChange({...advertisement, images: e.target.value})}
                />
                <button type="submit">{modalType === 'create' ? "Créer" : "Mettre à jour"}</button>
            </form>
        </div>
    );
};

export default AdvertisementForm;
