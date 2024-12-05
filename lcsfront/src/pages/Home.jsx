import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
    const [advertisements, setAdvertisements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fonction pour récupérer les annonces
    const fetchAdvertisements = async () => {
        try {
            const response = await axios.get("http://localhost:8080/advertisement/getall");
            setAdvertisements(response.data);
            setLoading(false);
        } catch (error) {
            setError("Erreur lors de la récupération des annonces");
            setLoading(false);
        }
    };

    // Utilisation de useEffect pour récupérer les annonces lors du chargement du composant
    useEffect(() => {
        fetchAdvertisements();
    }, []);

    return (
        <div className="home-container">
            <h1>Liste des Annonces</h1>

            {loading ? (
                <p>Chargement...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className="advertisements-list">
                    {advertisements.length > 0 ? (
                        advertisements.map((advertisement) => (
                            <div className="advertisement-card" key={advertisement._id}>
                                <h3>{advertisement.title}</h3>
                                <p>{advertisement.description}</p>
                                <p><strong>Prix: </strong>{advertisement.price}€</p>
                                <p><strong>Catégorie: </strong>{advertisement.category.name}</p>
                                <p><strong>Auteur: </strong>{advertisement.author.email}</p>
                                <Link to={`/advertisement/${advertisement._id}`} className="view-details-link">
                                    Voir les détails
                                </Link>
                            </div>
                        ))
                    ) : (
                        <p>Aucune annonce disponible</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Home;
