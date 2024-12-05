
const transporter = require("../config/email.config");
async function sendOrderCompletionOTP(email,order) {
    const mailData = {
        from: 'bookmyservice@noreply.com',  // sender address
        to: email,   // list of receivers
        subject: 'OTP for service completion',
        text: 'OTP for service completion kindly submit it to our employee',
        html: `<html>
          <div>
              <ul>
                  <li>Service Name : ${order.name}</li>
                  <li>Start Time : ${order.startTime}</li>
                  <li>Amount To Pay : ${order.price}</li>
                  <li>OTP : ${order.otp}</li>
              </ul>
          </div>
        </html>`,
    };

    transporter.sendMail(mailData, function (err, info) {
        if (err)
            return "error";
        else
            return "ok";
    });
}
async function sendAccVerOTP(email,otp) {
    const mailData = {
        from: 'bookmyservice@noreply.com',  // sender address
        to: email,   // list of receivers
        subject: 'OTP for Account Verification',
        text: 'OTP for Account Verification Don\' Share',
        html: `<html>
          <div>
              <p style = "color : red"> Don't Share OTP </p>
              <p> OTP : ${otp}</p
          </div>
        </html>`,
    };

    transporter.sendMail(mailData, function (err, info) {
        if (err)
            return "error";
        else
            return "ok";
    });
}
module.exports = {sendOrderCompletionOTP,sendAccVerOTP};