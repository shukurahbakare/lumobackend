const User = require('../models/user.model');
const Appliance = require('../models/appliances.model');
const SolarPackage = require('../models/solarpackages.model');
const { generatePaymentLink } = require('../services/flutterwave');



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


exports.payment = async (req, res) => {
  try {
    const { userID } = req.params;
    const { packageID } = req.body;

    if (!userID) {
      return res.status(400).json({ message: 'User ID is required.' });
    }

    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const selectedPackage = await SolarPackage.findById(packageID);

    const paymentLink = await generatePaymentLink(user.email, selectedPackage._id); 
    user.paymentStatus = 'pending'; // Update payment status to pending 
    await user.save();

    res.status(200).json({ message: 'Payment initiated successfully', paymentLink }); 
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ message: 'Error processing payment' });
  }
}; 


exports.handleFlutterwaveWebhook = async (req, res) => {
  try {
    const signature = req.headers['verif-hash'];  
    // Flutterwave sends raw body. We must access raw buffer for signature verification

    if (!signature || signature !== process.env.FLW_WEBHOOK_SECRET) {
        return res.status(401).send('Unauthorized - Invalid signature');
    }

    const payload = req.body;

    if (payload.event === 'charge.completed') {
      const txRef = payload.data.tx_ref;
      //const userID = tx_Ref.split('_')[1]; 
      //const user = await User.findById(userID); 
      const status = payload.data.status;
      const amount = payload.data.amount;
      const email = payload.data.customer.email;

        if (status === 'successful') {
            const user = await User.findOne({ email });
                if (!user) {
                    return res.status(404).send('User not found');
                }

            user.paymentStatus = 'success';
            user.paymentRef = txRef;
            await user.save();

          console.log(`Payment verified and recorded for ${email}, amount paid: ${amount}`);
          return res.status(200).json({ success: true });
        }
    }
  } catch (error) {
  console.log('Error processing webhook:', error);
  return res.status(500).send('Internal server error');
  }
  return res.status(200).send('Webhook received');

}; 

