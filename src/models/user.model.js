const mongoose = require('mongoose');

const ApplianceSchema = new mongoose.Schema({
  applianceName: { type: String, required: true },
  count: { type: Number, required: true, min: 0 }
}, 

{ _id: false }

);

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true, unique: true },
  email: { type: String, required: true, trim: true, unique: true },
  password: { type: String },
  buildingType: { type: String, required: true,
     enum: ['Apartment', 'Bungalow', 'Villa', 'Mansion', 'Duplex', 'Studio Apartment'] },
  energyHours: { type: Number, required: true },
  appliances: { type: [ApplianceSchema], default: [] },
  totalPower: { type: Number, default: 0 }
}, 

{ timestamps: true }

);

module.exports = mongoose.model('User', UserSchema);
