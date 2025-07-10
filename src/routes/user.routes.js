const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const recommendationsController = require('../controllers/recommendation.controller');

router.post('/signup', userController.signup);
router.get('/recommendations/:userID', recommendationsController.getRecommendations);

module.exports = router;