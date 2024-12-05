import React from "react";

const DeleteModal = ({ onDelete, onCancel }) => {
    return (
        <div>
            <h2>Êtes-vous sûr de vouloir supprimer cette annonce ?</h2>
            <button onClick={onDelete}>Supprimer</button>
            <button onClick={onCancel}>Annuler</button>
        </div>
    );
};

export default DeleteModal;
