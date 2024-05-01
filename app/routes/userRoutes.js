const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/users/:username', userController.getUserProfile);
router.post('/login', userController.loginUser);
router.get('/admin', userController.searchUsers);
router.post('/signup', userController.signupUser);

module.exports = router;
