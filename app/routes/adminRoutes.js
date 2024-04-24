const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Route pour la recherche d'utilisateurs dans la page d'administration
router.get('/search', adminController.searchUsers);

module.exports = router;
