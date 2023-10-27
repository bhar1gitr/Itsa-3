const Events = require('../models/eventsSchema');
const IndustryCollab = require('../models/industrycollab');
const nodemailer = require('nodemailer');

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    service: 'Gmail', // Use the email service you prefer (e.g., Gmail, Yahoo, etc.)
    auth: {
      user: 'bharatsharma98971@gmail.com', // Your email address
      pass: 'yvnk mzsy btiz ucdj', 
    },
  });

const getIndustryCollab = async(req,res)=>{
    const data = await IndustryCollab.find({});
    res.send(data);
}

const contact = async(req,res)=>{
  const mailOptions = {
    from: 'bharatsharma232@apsit.edu.in', // Sender's email address
    to: req.body.email, // Recipient's email address
    subject: 'APSIT', // Email subject
    text: req.body.message, // Email body in plain text
  };
try {
  // Send the email
  await transporter.sendMail(mailOptions);
  setTimeout(() => {
          res.status(200).json({ message: 'Form submitted successfully!' });
        }, 2000); // Simulate a 2-second delay to mimic processing
} catch (error) {
  console.error('Error sending email:', error);
  res.status(500).json({ error: 'Failed to send email' });
  setTimeout(() => {
          res.status(500).json({ error: 'An error occurred while sending the email.' });
        }, 2000); // Simulate a 2-second delay to mimic processing
}
}

const getEvents = async (req,res)=>{
  const events = await Events.find({});
  res.send(events);
}

module.exports = { getIndustryCollab,contact,getEvents } 