const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    userID: {type: String},
    packageName: {type: String}, 
    status: {type: String, enum :['success', 'initiated', 'failed']},
    txRef: {type: String, unique: true}

})

module.exports = mongoose.model('payment', paymentSchema)