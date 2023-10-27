const express = require('express');
const conn = require('./connection/conn');
const dotenv = require('dotenv'); 
const nodemailer = require('nodemailer');
const cloudinary = require("cloudinary").v2;
const cors = require('cors');
const app = express();
const port = 4000;
// Importing Models
const Events = require('./models/eventsSchema');

//--------------- Middlewares--------------- //
// Environment Variables
dotenv.config({ path: './config/.env' });
conn();
// Cloudinary
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_SECRET 
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({credentials: true,origin:[ 'http://localhost:3000'] }));

// Routes
app.use('/api/v1',require('./routes/userRoutes'));

// Admin Routes 
app.use('/api/v1',require('./routes/adminRoutes'));

// Student Login
app.use('/api/v1',require('./routes/studentRoutes'));

app.get('/', async(req, res) => {
  res.send("huii")
});

// listen to port
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
