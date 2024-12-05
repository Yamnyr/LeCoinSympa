import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import AdvertisementForm from "../Components/AdvertisementForm";
import DeleteModal from "../Components/DeleteModal";
import AdvertisementCard from "../Components/AdvertisementCard";

import {
    fetchCategories,
    fetchAdvertisements,
    createAdvertisement,
    updateAdvertisement,
    deleteAdvertisement
} from "../Services/api";

const Home = () => {
    const [advertisements, setAdvertisements] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newAdvertisement, setNewAdvertisement] = useState({
        title: "",
        description: "",
        price: "",
        category: ""
    });
    const [selectedAdvertisement, setSelectedAdvertisement] = useState(null);
    const [modalType, setModalType] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(""); // Pour gérer la catégorie sélectionnée

    useEffect(() => {
        const loadData = async () => {
            try {
                const categoriesData = await fetchCategories();
                setCategories(categoriesData);

                // Charger les annonces avec ou sans filtrage
                const advertisementsData = await fetchAdvertisements(selectedCategory);
                setAdvertisements(advertisementsData);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [selectedCategory]); // Recharger les données quand la catégorie change

    const openCreateModal = () => {
        setModalType("create");
        setNewAdvertisement({
            title: "",
            description: "",
            price: "",
            category: ""
        });
    };

    const openUpdateModal = (advertisement) => {
        setSelectedAdvertisement(advertisement);
        setModalType("update");
        setNewAdvertisement({
            title: advertisement.title,
            description: advertisement.description,
            price: advertisement.price,
            category: advertisement.category._id
        });
    };

    const openDeleteModal = (advertisement) => {
        setSelectedAdvertisement(advertisement);
        setModalType("delete");
    };

    const handleCreateAdvertisement = async (e) => {
        e.preventDefault();
        try {
            await createAdvertisement(newAdvertisement);
            setModalType(null);
            setNewAdvertisement({
                title: "",
                description: "",
                price: "",
                category: ""
            });
            // Recharger les annonces après création
            const advertisementsData = await fetchAdvertisements(selectedCategory);
            setAdvertisements(advertisementsData);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleUpdateAdvertisement = async (e) => {
        e.preventDefault();
        try {
            await updateAdvertisement(selectedAdvertisement._id, newAdvertisement);
            setModalType(null);
            setSelectedAdvertisement(null);
            // Recharger les annonces après mise à jour
            const advertisementsData = await fetchAdvertisements(selectedCategory);
            setAdvertisements(advertisementsData);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeleteAdvertisement = async () => {
        try {
            await deleteAdvertisement(selectedAdvertisement._id);
            setModalType(null);
            setSelectedAdvertisement(null);
            // Recharger les annonces après suppression
            const advertisementsData = await fetchAdvertisements(selectedCategory);
            setAdvertisements(advertisementsData);
        } catch (err) {
            setError(err.message);
        }
    };

    const closeModal = () => {
        setModalType(null);
        setSelectedAdvertisement(null);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    return (
        <div className="home-container">
            <h1>Liste des Annonces</h1>


            <button className="create-btn" onClick={openCreateModal}>Créer une nouvelle annonce</button>

            <select
                onChange={handleCategoryChange}
                value={selectedCategory}
                className="custom-select"
            >
                <option value="">Toutes les catégories</option>
                {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                        {category.name}
                    </option>
                ))}
            </select>

            {loading ? (
                <p>Chargement...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className="advertisements-list">
                    {advertisements.length > 0 ? (
                        advertisements.map((advertisement) => (
                            <AdvertisementCard
                                key={advertisement._id}
                                advertisement={advertisement}
                                openUpdateModal={openUpdateModal}
                                openDeleteModal={openDeleteModal}
                            />
                        ))
                    ) : (
                        <p>Aucune annonce disponible</p>
                    )}
                </div>
            )}

            {/* Modal for Create / Update Advertisement */}
            <ReactModal isOpen={modalType === "create" || modalType === "update"} onRequestClose={closeModal}>
                <AdvertisementForm
                    modalType={modalType}
                    advertisement={newAdvertisement}
                    categories={categories}
                    onSubmit={modalType === "create" ? handleCreateAdvertisement : handleUpdateAdvertisement}
                    onChange={(newData) => setNewAdvertisement(newData)}
                />
                {/*<button onClick={closeModal}>Fermer</button>*/}
            </ReactModal>

            <ReactModal isOpen={modalType === "delete"} onRequestClose={closeModal}>
                <DeleteModal onDelete={handleDeleteAdvertisement} onCancel={closeModal} />
            </ReactModal>
        </div>
    );
};

export default Home;
