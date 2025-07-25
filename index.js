const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDb = require('./src/config/db'); 
const userRoutes = require('./src/routes/user.routes');
const appliancesRoutes = require('./src/routes/appliances.routes');
const paymentRoutes = require('./src/routes/payment.routes');


const app = express();
dotenv.config();
const PORT = process.env.PORT;


app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/appliances', appliancesRoutes);
app.use('/api/v1/payment', paymentRoutes); 


app.listen(PORT, () => {
  connectDb();
  console.log(`LumoGrid API is running on port ${PORT}`);
});


