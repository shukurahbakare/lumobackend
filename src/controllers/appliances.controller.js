const Appliance = require('../models/appliances.model');
const SolarPackage = require('../models/solarpackages.model');


exports.uploadAppliance = async (req, res) => {
  try {
    const { applianceName, powerRating } = req.body;

    if (!applianceName || !powerRating) {
      return res.status(400).json({ message: 'Appliance name and power rating are required.' });
    }

    const existing = await Appliance.findOne({ applianceName: { $regex: new RegExp(`^${applianceName}$`, 'i') } });
                                                                  // Used regex to make search case-insensitive
    if (existing) { 
      return res.status(400).json({ message: 'Appliance with this name already exists.' });
    }

    const newAppliance = new Appliance({ applianceName, powerRating });
    await newAppliance.save();
    res.status(201).json({message: 'New Appliance Added Successfully', appliance: newAppliance});
  } catch (error) {
    console.log('Error uploading appliance:', error);
    res.status(500).json({ message: 'Error uploading appliance' });
  }
};


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

exports.getAppliances = async (req, res) => {
  try {
    const appliances = await Appliance.find();
    res.status(200).json(appliances);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appliances', error });
  }
};


