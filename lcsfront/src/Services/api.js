import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080",
});

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        Authorization: `Bearer ${token}`,
    };
};

export const fetchCategories = async () => {
    try {
        const response = await api.get("/category/getall", { headers: getAuthHeaders() });
        return response.data;
    } catch (error) {
        throw new Error("Erreur lors de la récupération des catégories");
    }
};

export const fetchAdvertisements = async (category) => {
    try {
        const url = category ? `http://localhost:8080/advertisement/getall?category=${category}` : 'http://localhost:8080/advertisement/getall';
        const response = await fetch(url);
        if (!response.ok) throw new Error('Impossible de récupérer les annonces');
        return await response.json();
    } catch (error) {
        throw new Error(error.message);
    }
};
export const createAdvertisement = async (advertisement) => {
    try {
        const response = await api.post("/advertisement/create", advertisement, {
            headers: getAuthHeaders(),
        });
        return response.data;
    } catch (error) {
        throw new Error("Erreur lors de la création de l'annonce");
    }
};

export const updateAdvertisement = async (id, advertisement) => {
    try {
        const response = await api.put(`/advertisement/update/${id}`, advertisement, {
            headers: getAuthHeaders(),
        });
        return response.data;
    } catch (error) {
        throw new Error("Erreur lors de la mise à jour de l'annonce");
    }
};

export const deleteAdvertisement = async (id) => {
    try {
        const response = await api.delete(`/advertisement/delete/${id}`, {
            headers: getAuthHeaders(),
        });
        return response.data;
    } catch (error) {
        throw new Error("Erreur lors de la suppression de l'annonce");
    }
};

export const fetchAdvertisementById = async (id) => {
    try {
        const response = await fetch(`http://localhost:8080/advertisement/getone/${id}`);
        if (!response.ok) {
            throw new Error("Erreur lors de la récupération de l'annonce");
        }
        return await response.json();
    } catch (error) {
        throw new Error(error.message);
    }
};
