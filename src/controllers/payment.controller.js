
const User = require('../models/user.model');
const Payment = require('../models/payment.model'); 
const SolarPackage = require('../models/solarpackages.model'); 
const { generatePaymentLink } = require('../services/flutterwave')


exports.payment = async (req, res) => {
  try {
    const { userID } = req.params;
    const { packageID } = req.body;

    console.log(req.body); 

    if (!userID) {
      return res.status(400).json({ message: 'User ID is required.' });
    }

    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const selectedPackage = await SolarPackage.findById(packageID );

    const txRef = `TX_${user._id}_${Date.now()}`
    const getPayment = new Payment ({  // Create new payment 
        userID: user._id,
        packageName: selectedPackage.packageName,
        status: 'initiated',
        txRef: txRef
    }); 
    await getPayment.save();

    const paymentLink = await generatePaymentLink(user.email, selectedPackage.packageName); 
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
    //const payload = JSON.parse(req.body.toString());

    if (payload.event === 'charge.completed') {
      const txRef = payload.data.tx_ref;
      const status = payload.data.status;
      const amount = payload.data.amount;
      const email = payload.data.customer.email;

      console.log("Flutterwave Webhook hit!", payload)

        if (status === 'successful') {

            const payingUser = await Payment.findOneAndUpdate({ txRef }); 
                if (!payingUser) {
                    return res.status(404).send('User not found');
                }

            payingUser.status = 'success';
            payingUser.amountPaid = amount
            await payingUser.save();

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

