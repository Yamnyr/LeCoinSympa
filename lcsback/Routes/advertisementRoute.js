
const express = require('express');
const router = express.Router();
const authMiddleware = require("../Middleware/authMiddleware");
const advertisementController = require("../Controllers/advertisementController");

router.post('/create', authMiddleware, advertisementController.createAdvertisement);
router.get('/getall', advertisementController.getAllAdvertisements);
router.get('/getone/:id', advertisementController.getAdvertisementById);
router.put('/update/:id', authMiddleware, advertisementController.updateAdvertisement);
router.delete('/delete/:id', authMiddleware, advertisementController.deleteAdvertisement);


module.exports = router;