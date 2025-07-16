const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    userID: {type: String},
    packageName: {type: String}, 
    amountPaid: {type: String}, 
    status: {type: String, enum :['success', 'initiated', 'failed']},
    txRef: {type: String, unique: true, sparse: true}

})

module.exports = mongoose.model('payment', paymentSchema)