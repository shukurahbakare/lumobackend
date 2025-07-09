const Appliance = require('../models/appliances.model');


exports.uploadAppliance = async (req, res) => {
  try {
    const { applianceName, powerRating } = req.body;

    if (!applianceName || !powerRating) {
      return res.status(400).json({ message: 'Appliance name and power rating are required.' });
    }

    const existing = await Appliance.findOne({ applianceName: { $regex: new RegExp(`^${applianceName}$`, 'i') } });
                                                                  // Used regex to make search case-insensitive
    if (existing) { 
      return res.status(409).json({ message: 'Appliance with this name already exists.' });
    }

    const newAppliance = new Appliance({ applianceName, powerRating });
    await newAppliance.save();
    res.status(201).json({message: 'New Appliance Added Successfully', appliance: newAppliance});
  } catch (error) {
    console.log('Error uploading appliance:', error);
    res.status(500).json({ message: 'Error uploading appliance' });
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


