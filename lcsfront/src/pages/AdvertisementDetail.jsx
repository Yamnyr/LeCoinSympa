import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAdvertisementById } from '../Services/api'; // Fonction pour récupérer une annonce par ID

const AdvertisementDetail = () => {
    const { id } = useParams(); // Récupère l'ID depuis l'URL
    const [advertisement, setAdvertisement] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadAdvertisement = async () => {
            try {
                const advertisementData = await fetchAdvertisementById(id);
                setAdvertisement(advertisementData);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadAdvertisement();
    }, [id]);

    if (loading) {
        return <p className="loading-text">Chargement...</p>;
    }

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    if (!advertisement) {
        return <p className="error-message">Annonce non trouvée</p>;
    }

    return (
        <div className="advertisement-detail-container">
            <div className="advertisement-detail-card">
                <h1 className="advertisement-title">{advertisement.title}</h1>
                <p className="advertisement-description">{advertisement.description}</p>
                <p className="advertisement-price">Prix : <span>{advertisement.price} €</span></p>
                <p className="advertisement-category">Catégorie : <span>{advertisement.category.name}</span></p>
                <p className="advertisement-author">Publié par : <span>{advertisement.author.email}</span></p>
            </div>
        </div>
    );
};

export default AdvertisementDetail;
