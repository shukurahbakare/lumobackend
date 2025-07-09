const express = require ('express');
const router = express.Router();
const appliancesController = require('../controllers/appliances.controller');

router.post('/upload', appliancesController.uploadAppliance);

module.exports = router;
