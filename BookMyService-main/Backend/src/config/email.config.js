
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    port: 465,               // true for 465, false for other ports
    host: "smtp.gmail.com",
    auth: {
        user: 'bookmyservices.one@gmail.com',
        pass: 'dpxtivjexdkxucvq',
    },
    secure: true,
});
module.exports = transporter;