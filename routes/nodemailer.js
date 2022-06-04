const nodemailer = require("nodemailer");
const axios = require('axios');
const errors = require('./error');    //central error files 
const status = require('./status');   //central status files 
const newDate = new Date(Date.now);
var temp;
var phone;
var pNum = 0;
var orderno = () => {
  return Math.floor(Math.random() * 99999999);
}


 async function sender(user,pass,fname,lname,email,template,temp){

  try {


    let transporter = nodemailer.createTransport({
      host: "smtp.mail.yahoo.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: user, // generated ethereal user
        pass: pass, // generated ethereal password
      },
    });
    

    // let transporter = nodemailer.createTransport({
    //   host: 'smtp.gmail.com',
    //   secureConnection: false,
    //   port: 587, 
    //   auth: {
    //       user: user,
    //       pass: pass
    //   },
    //   tls:{
    //       ciphers:'SSLv3'
    //   }
    // });    
       
    // let transporter = nodemailer.createTransport({
    //   host: "smtp.ethereal.email",
    //   port: 587,
    //   secure: false, 
    //   auth: {
    //     user: user,
    //     pass: pass, 
    //   },
    // });
   
    
  

      
        // send mail with defined transport object
        let info = await transporter.sendMail({
          from: `${template.name} <${user}>`,  // sender address
          to: `${email}`, // list of receivers
          subject:`Hi ${fname} ${lname}, ${template.subject}`, // Subject line
          text: `${temp}`, // plain text body
          html: `${temp}`,  // html body
        });
      
        // console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        status.writeStatus(`Message sent: %s : ${info.messageId},Preview URL: %s : ${nodemailer.getTestMessageUrl(info)} ,user: ${user},email: ${email},template:${template.subject}`);
    
        // Preview only available when sending through an Ethereal account
        // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info),"user:",user,"email:",email,"template:",template.subject);
    
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...  
  } catch (error) {
      // console.error
      errors.write(`error: ${error} ,email:${user}, password: ${pass}`);
  }
 }
 







  async function main (user,pass,fname,lname,email,template){
    
    axios.get('http://postal.webtobuzz.com:5000/json/phone.json')
    .then( (response) =>{
      // handle success 
      var tData = response.data;
      
    if(tData.length == 1){
      phone = response.data[pNum][pNum];
    }else if(tData.length ==2){
      if(pNum !=1){
        phone = response.data[pNum][pNum];
        pNum =1
      }else if(pNum == 1) {
        phone = response.data[pNum][pNum];
        pNum =0;
      }
    }else if (tData.length >2){
        if(pNum == 0){
            phone = response.data[pNum][pNum];
            pNum++;
        }else if(pNum >=1 && pNum <=(tData.length-1)){
            phone = response.data[pNum][pNum];
            pNum++;
        }else if(pNum == tData.length){
            pNum = 0;
            phone = response.data[pNum][pNum];
        }
    }
     
      
    })
    .catch((error)=> {
      // handle error
      console.log(error);
    })
    .then( ()=> {
      // always executed 
      console.log(phone);
    });
  



    axios
    .get(`${template.template}`)
    .then(res => {
      let name = `${fname} ${lname}`;
      temp = res.data.toString().replace(/#name/g,name).replace(/#orderno/g,`${orderno()}`).replace(/#orderno/g,`${orderno()}`).replace(/#date/g,`05/26/2022`).replace(/#phone/g,phone);
      sender(user,pass,fname,lname,email,template,temp);
    })
    .catch(error => {
      console.error(error)
    })
  
      


     
    
  
  }

  module.exports.main = main;
  
  


