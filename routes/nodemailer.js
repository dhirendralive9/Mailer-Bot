const nodemailer = require("nodemailer");

const errors = require('./error');    //central error files 
const status = require('./status');   //central status files 

// async..await is not allowed in global scope, must use a wrapper
  async function main (user,pass,email,template){
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
   // let testAccount = await nodemailer.createTestAccount();
  
    // create reusable transporter object using the default SMTP transport
     try {
      let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com', // hostname
        secureConnection: false, // use SSL
        port: 587, // port for secure SMTP
        auth: {
            user: user,
            pass: pass
        },
        tls:{
            ciphers:'SSLv3'
        }
      });
        
          // send mail with defined transport object
          let info = await transporter.sendMail({
            from: `${template.name} <${user}>`,  // sender address
            to: `${email}`, // list of receivers
            subject: template.subject, // Subject line
            text: template.text, // plain text body
            html: template.template, // html body
          });
        
          console.log("Message sent: %s", info.messageId);
          // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
          status.writeStatus(`Message sent: %s : ${info.messageId},Preview URL: %s : ${nodemailer.getTestMessageUrl(info)}`);
      
          // Preview only available when sending through an Ethereal account
          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      
          // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...  
    } catch (error) {
        console.error
        errors.write(`error: ${error}`);
    }
    
  
  }

  module.exports.main = main;
  
  


