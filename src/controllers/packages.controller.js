const SolarPackage = require('../models/solarpackages.model');

exports.uploadPackages = async (req, res) => {
  try {
    const { packageName, packageDescription, amount, buildingType, maxPower, fullChargeHours } = req.body;

    if (!packageName || !packageDescription || !amount || !buildingType || !maxPower || !fullChargeHours) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newPackage = new SolarPackage({ 
      packageName, 
      packageDescription, 
      amount, 
      buildingType, 
      maxPower, 
      fullChargeHours
     });

    await newPackage.save();
    res.status(201).json({ message: 'New Solar Package Added Successfully', package: newPackage });
  } catch (error) {
    console.log('Error uploading solar package:', error);
    res.status(500).json({ message: 'Error uploading solar package' });
  }
};


