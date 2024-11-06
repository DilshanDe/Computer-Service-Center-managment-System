const nodemailer = require('nodemailer');

//  email sending function
const sendEmail = async (to, subject, text,htmls) => {
    try {
      // Create a transporter
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'beezcomputers@gmail.com', // Your email address
          pass: 'bltt rtmh wimm bick' // Your email password from google app passwords
        }
      });
  
      // Define mail options
      const mailOptions = {
        from: 'beezcomputers@gmail.com',  // Sender's email
        to,                           // Receiver's email passed as argument
        subject,                      // Subject passed as argument
        text,                          // Email body passed as argument
        html: htmls
      };
  
      // Send email
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };
  
  module.exports = sendEmail;