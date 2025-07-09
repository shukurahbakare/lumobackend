const mongoose = require('mongoose');

const ratedApplianceSchema = new mongoose.Schema({
  applianceName: { type: String, required: true, unique: true },
  powerRating: { type: Number, required: true }
},

{ versionKey: false }

);

module.exports = mongoose.model('Appliance', ratedApplianceSchema);
