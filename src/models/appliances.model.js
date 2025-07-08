const mongoose = require('mongoose');

const applianceSchema = new mongoose.Schema({
  applianceName: { type: String, required: true },
  powerRating: { type: Number, required: true }
});

module.exports = mongoose.model('Appliance', applianceSchema);
