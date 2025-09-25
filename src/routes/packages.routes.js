const express = require ('express');
const router = express.Router();
const packagesController = require('../controllers/packages.controller');

router.post('/upload-packages', packagesController.uploadPackages); 

module.exports = router;
