const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  buildingType: { type: String, required: true,
     enum: ['Apartment', 'Bungalow', 'Villa', 'Mansion', 'Duplex', 'Studio Apartment'] },
  energyHours: { type: Number, required: true },
  appliances: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appliance' }]

});

module.exports = mongoose.model('User', userSchema);
