const axios = require('axios');
const nodemailer = require('nodemailer');

const url = 'https://uiverse.io/'; // Replace with the website URL you want to check
const interval = 3000; // Check every 5000 milliseconds (5 seconds)

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'optionsalone4@gmail.com', // Replace with your email
    pass: 'hgvleH@123', // Replace with your email password or app password
  },
});

const mailOptions = {
  from: 'optionsalone4@gmail.com', // Replace with your email
  to: 'optionsalone4@gmail.com', // Replace with recipient email
  subject: 'Website Status Alert',
  text: `${url} is reachable`,
};

const checkWebsite = async (url) => {
  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      console.log(`${new Date().toLocaleString()}: ${url} is reachable`);
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } else {
      console.log(
        `${new Date().toLocaleString()}: ${url} returned status code ${
          response.status
        }`
      );
    }
  } catch (error) {
    console.log(
      `${new Date().toLocaleString()}: ${url} is not reachable. Error: ${
        error.message
      }`
    );
  }
};

setInterval(() => {
  checkWebsite(url);
}, interval);
