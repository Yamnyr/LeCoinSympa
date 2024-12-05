const express = require("express");
const advertisementController = require('../controllers/advertisementController');
const authMiddleware = require('../middleware/authMiddleware');
const categoryController = require('../controllers/categoryController');

const router = express.Router();
const {
    Register,
    Login,
    updateUser,
    deleteUser,
    getUsers,
} = require("../Controllers/userController");


router.post("/register", Register);
router.post("/login", Login);
router.put("/user/:id", authMiddleware, updateUser);
router.delete("/user/:id", authMiddleware, deleteUser);
router.get("/users", authMiddleware, getUsers);


router.post('/', authMiddleware, advertisementController.createAdvertisement);
router.get('/', advertisementController.getAllAdvertisements);
router.get('/:id', advertisementController.getAdvertisementById);
router.put('/:id', authMiddleware, advertisementController.updateAdvertisement);
router.delete('/:id', authMiddleware, advertisementController.deleteAdvertisement);


module.exports = router;
