const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'omimanmaybe@gmail.com',
    pass: 'vwoa ytdo paiu xtol'
  },
  tls: { rejectUnauthorized: false }
});

transporter.verify(function(error, success) {
  if (error) {
    console.log('ERROR:', error);
  } else {
    console.log('Server is ready to take our messages');
  }
});
