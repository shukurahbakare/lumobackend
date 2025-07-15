const User = require('../models/user.model');

exports.signup = async (req, res) => {
  try {
    const { name, email, phone, buildingType, appliances, totalPower, energyHours } = req.body;

    if (!name || !email || !phone || !buildingType || !appliances || !totalPower || !energyHours) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists.' });
    }

    const existingPhone = await User.findOne({ phone });
    if (existingPhone) {
      return res.status(400).json({ message: 'User with this phone number already exists.' });
    }

    //calaculating total power based on appliances {for when its ever needed}
    // let totalPower = 0;

    // for (const appliance of appliances) {
    //   const applianceDoc = await Appliance.findOne({
    //     applianceName: appliance.name
    //   }).select('powerRating');


    //   if (!applianceDoc) {
    //     continue;
    //   }

    //   totalPower += appliance.count * applianceDoc.powerRating;
    // }

    const newUser = new User({
      name,
      email,
      phone,
      buildingType,
      appliances,
      totalPower,
      energyHours,
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: newUser,
      redirectUrl: `/api/v1/recommendations/${newUser._id}`
     });

  } catch (error) {
    console.log('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user'});
  }
};


