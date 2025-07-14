
const User = require('../models/user.model');


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

