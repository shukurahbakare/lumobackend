const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDb = require('./src/config/db'); 
const userRoutes = require('./src/routes/user.routes');
const packagesRoutes = require('./src/routes/packages.routes');
const paymentRoutes = require('./src/routes/payment.routes');
const helmet = require('helmet'); 


const app = express();
dotenv.config();
app.use(helmet()); 

const PORT = process.env.PORT;


app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/appliances', packagesRoutes);
app.use('/api/v1/payment', paymentRoutes); 


app.listen(PORT, () => {
  connectDb();
  console.log(`LumoGrid API is running on port ${PORT}`);
});




