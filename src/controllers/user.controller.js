const User = require('../models/user.model');
const Appliance = require('../models/appliances.model');



exports.signup = async (req, res) => {
  try {
    const { name, email, phone, buildingType, appliances, energyHours } = req.body;

    if (!name || !email || !phone || !buildingType || !appliances || !energyHours) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    let totalPower = 0;

    for (const appliance of appliances) {
      const applianceDoc = await Appliance.findOne({
        applianceName: appliance.name
      }).select('powerRating');


      if (!applianceDoc) {
        continue;
      }

      totalPower += appliance.count * applianceDoc.powerRating;
    }

    const newUser = new User({
      name,
      email,
      phone,
      buildingType,
      energyHours,
      appliances,
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: newUser, totalPower });
  } catch (error) {
    console.log('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user'});
  }
};