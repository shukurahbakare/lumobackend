const mongoose = require('mongoose');

const solarPackageSchema = new mongoose.Schema({
    packageName: { type: String, required: true, unique: true },
    packageDescription: { type: String, required: true }, 
    buildingType: { type: String, required: true, enum: ['Apartment', 'Bungalow', 'Villa', 'Mansion', 'Duplex', 'Studio Apartment'] },
    maxPower: { type: Number, required: true },
    amount: { type: Number, required: true },
    fullChargeHours: { type: Number, required: true },
    batteryCapacity: {type: String },
    panelCount: {type: Number },
    inverterSize: {type: String },
    
    }, 

    { timestamps: true } 
);

module.exports = mongoose.model('SolarPackage', solarPackageSchema);

