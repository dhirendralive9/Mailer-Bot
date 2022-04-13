const dataJS = require('./data');


 module.exports.queueCheck = (req,res)=>{
     res.json({status:"ok",message:"Mailer Bot is active Now"})
     console.log("Mailer Bot is active Now");
     dataJS.mailAddressSender();
 }