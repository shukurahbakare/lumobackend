const express = require('express'); 
const router = express.Router(); 
const paymentController = require('../controllers/payment.controller')

router.post('/:userID', paymentController.payment); 
router.post('/flutterwave/webhook', paymentController.handleFlutterwaveWebhook); 


module.exports = router; 