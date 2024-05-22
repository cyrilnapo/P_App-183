const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const isAdmin = require('../middleware/isAdmin');

router.get('/admin/',isAdmin, adminController.adminPage);

router.get('/admin/search',isAdmin, adminController.searchUsers);

module.exports = router;
