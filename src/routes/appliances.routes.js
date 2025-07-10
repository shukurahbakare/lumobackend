const express = require ('express');
const router = express.Router();
const appliancesController = require('../controllers/appliances.controller');


router.post('/upload-appliance', appliancesController.uploadAppliance);
router.post('/upload-packages', appliancesController.uploadPackages); 

module.exports = router;
