import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactModal from "react-modal";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [newUser, setNewUser] = useState({ username: "", email: "", password: "" });
    const [error, setError] = useState("");
    const [modalType, setModalType] = useState(null);

    // Fetch users from the API
    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:8080/user/getall", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsers(response.data);
        } catch (err) {
            setError("Erreur lors de la récupération des utilisateurs");
        }
    };

    // Fetch users when the component mounts
    useEffect(() => {
        fetchUsers();
    }, []);

    // Open modal to create a new user
    const openCreateModal = () => {
        setModalType("create");
        setNewUser({ username: "", email: "", password: "" });
    };

    // Open modal to update user
    const openUpdateModal = (user) => {
        setSelectedUser(user);
        setModalType("update");
        setNewUser({ username: user.username, email: user.email, password: "" });
    };

    // Open modal to confirm deletion of a user
    const openDeleteModal = (user) => {
        setSelectedUser(user);
        setModalType("delete");
    };

    // Create a new user
    const handleCreateUser = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await axios.post("http://localhost:8080/user/register", newUser, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setModalType(null);
            setNewUser({ username: "", email: "", password: "" });
            fetchUsers();
        } catch (err) {
            setError("Erreur lors de la création de l'utilisateur");
        }
    };

    // Update an existing user
    const handleUpdateUser = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await axios.put(`http://localhost:8080/user/update/${selectedUser._id}`, newUser, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setModalType(null);
            setSelectedUser(null);
            fetchUsers();
        } catch (err) {
            setError("Erreur lors de la mise à jour de l'utilisateur");
        }
    };

    // Delete a user
    const handleDeleteUser = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:8080/user/delete/${selectedUser._id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setModalType(null);
            setSelectedUser(null);
            fetchUsers();
        } catch (err) {
            setError("Erreur lors de la suppression de l'utilisateur");
        }
    };

    // Close modal
    const closeModal = () => {
        setModalType(null);
        setSelectedUser(null);
    };

    return (
        <div className="home-container">
            <h1>Liste des Utilisateurs</h1>
            {error && <p className="error-message">{error}</p>}
            <button className="create-btn" onClick={openCreateModal}>Créer un utilisateur</button>
            <table className="user-table">
                <thead>
                <tr>
                    <th>Nom d'utilisateur</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user._id}>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>
                            <button className="action-button" onClick={() => openUpdateModal(user)}>Modifier</button>
                            <button className="action-button delete-button" onClick={() => openDeleteModal(user)}>Supprimer</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Modal for Create / Update User */}
            <ReactModal
                isOpen={modalType === "create" || modalType === "update"}
                onRequestClose={closeModal}
                // className="modal-content"
                // overlayClassName="modal-overlay"
            >
                <h2>{modalType === "create" ? "Créer un utilisateur" : "Modifier l'utilisateur"}</h2>
                <form onSubmit={modalType === "create" ? handleCreateUser : handleUpdateUser}>
                    <input
                        type="text"
                        placeholder="Nom d'utilisateur"
                        value={newUser.username}
                        onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                        className="input-field"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                        className="input-field"
                    />
                    <input
                        type="password"
                        placeholder="Mot de passe"
                        value={newUser.password}
                        onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                        className="input-field"
                    />
                    <button type="submit">{modalType === "create" ? "Créer" : "Mettre à jour"}</button>
                </form>
            </ReactModal>

            {/* Modal for Delete Confirmation */}
            <ReactModal
                isOpen={modalType === "delete"}
                onRequestClose={closeModal}
                // className="modal-content"
                // overlayClassName="modal-overlay"
            >
                <h2>Êtes-vous sûr de vouloir supprimer cet utilisateur ?</h2>
                <button className="submit-button" onClick={handleDeleteUser}>Supprimer</button>
                <button className="cancel-button" onClick={closeModal}>Annuler</button>
            </ReactModal>
        </div>
    );
};

export default UserList;
