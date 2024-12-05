const transporter = require("../config/email.config");

async function empAccCreationEmail(employee){
    const mailData = {
        from: 'bookmyservice@noreply.com',  // sender address
        to: employee.email,   // list of receivers
        subject: 'Welcome To BookMyServices',
        text: 'Please login using given password and change it',
        html: `<html>

          <div style = "background-color : #89cff0; padding:20px; border : solid 2px black;">
          <div style = "background-color : #faebd7; padding:20px;">
              <ul style = "padding:20px;">
                  <li>Email : ${employee.email}</li>
                  <li>Password : ${employee.password}</li>
                  <li style ="color:red; background-color : #FBF719;">Note: *  Please Don\'t Share Password With Anyone</li>
              </ul>
              </div>      
          <p style= "text-align:right";> -Team BookMyServices<p>
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

module.exports = empAccCreationEmail