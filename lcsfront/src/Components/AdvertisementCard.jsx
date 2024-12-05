import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdvertisementCard = ({ advertisement, openUpdateModal, openDeleteModal }) => {
    const navigate = useNavigate();  // Hook pour rediriger vers une autre page

    const handleCardClick = () => {
        navigate(`/advertisement/${advertisement._id}`);  // Redirige vers la page des détails de l'annonce
    };

    return (
        <div className="advertisement-card" onClick={handleCardClick}>
            <h3>{advertisement.title}</h3>
            <p>{advertisement.description}</p>
            <p>{advertisement.price} €</p>
            <button onClick={(e) => {e.stopPropagation(); openUpdateModal(advertisement);}}>Modifier</button>
            <button onClick={(e) => {e.stopPropagation(); openDeleteModal(advertisement);}}>Supprimer</button>
        </div>
    );
};

export default AdvertisementCard;
