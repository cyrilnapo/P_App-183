const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/users/:username', userController.getUserProfile);
router.post('/login', userController.loginUser);
router.post('/signup', userController.signupUser);
router.get('/home', userController.homePage);


module.exports = router;
