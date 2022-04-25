const nodemailer = require("nodemailer");
const axios = require('axios');
const errors = require('./error');    //central error files 
const status = require('./status');   //central status files 
var temp;


 async function sender(user,pass,email,template,temp){

  try {
    

    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secureConnection: false,
      port: 587, 
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
          text: `${temp}`, // plain text body
          html: `${temp}`, // html body
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
 







  async function main (user,pass,email,template){
    
    axios
    .get(`${template.template}`)
    .then(res => {
      temp = res.data.toString();
      sender(user,pass,email,template,temp);
    })
    .catch(error => {
      console.error(error)
    })
  
      


     
    
  
  }

  module.exports.main = main;
  
  


