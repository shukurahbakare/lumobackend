const User = require('../models/user.model');
const SolarPackage = require('../models/solarpackages.model');

exports.getRecommendations = async (req, res) => {
    const { userID } = req.params;
  try {
    if (!req.params.userID) {
      return res.status(400).json({ message: 'Signup to get recommendations.', url: '/api/v1/user/signup' });
    }                                                                           //update before deploying

    const user = await User.findById(userID);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const solarPackages = await SolarPackage.find();

    const solarPackageRecommendations = solarPackages.filter(package => 
        package.buildingType.toLowerCase() === user.buildingType.toLowerCase() &&
        package.maxPower >= user.totalPower &&
        package.fullChargeHours >= user.energyHours); 

    if (solarPackageRecommendations.length > 3) {
      solarPackageRecommendations.sort((a, b) => a.maxPower - b.maxPower);
      solarPackageRecommendations.length = 3; 
    }

    
    //     //if less than 3 packages match, find extras
    // if (solarPackageRecommendations.length < 3) { 
    //   const extras = solarPackages
    //     .filter(package => !solarPackageRecommendations.includes(package)) // exclude already included packages
    //     .sort((a, b) => {              
    //       // Closest power range to user.totalPower
    //       const diffA = Math.abs(user.totalPower - a.maxPower);
    //       const diffB = Math.abs(user.totalPower - b.maxPower);
    //       return diffA - diffB;
    //     })
    //     .slice(0, 3 - solarPackageRecommendations.length); // only take what's needed

    //   solarPackageRecommendations = [...solarPackageRecommendations, ...extras];
    // }

    res.status(200).json({ solarPackageRecommendations, message: 'Recommendations fetched successfully' });
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    res.status(500).json({ message: 'Error fetching recommendations' });
  }
}