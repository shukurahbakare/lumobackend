const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDb = require('./config/db');
const { connect } = require('mongoose');


const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.listen(PORT, () => {
  connectDb();
  console.log(`LumoGrid API is running on port ${PORT}`);
});


