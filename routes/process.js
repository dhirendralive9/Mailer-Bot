const fs = require('fs');

const senderData = JSON.parse(fs.readFileSync(`./json/sender.json`)); 
const emailData =  JSON.parse(fs.readFileSync(`./json/list.json`));
const error_data = JSON.parse(fs.readFileSync(`./json/errors.json`));
const template = JSON.parse(fs.readFileSync(`./json/templates.json`));
const statusData = JSON.parse(fs.readFileSync(`./json/status.json`));

module.exports.queueCheck = (req,res)=>{
    console.log("Data Acquired");
    console.log("Email Data:",emailData.length);
    console.log("Sender Data:",senderData.length);
    console.log("Email can be sent:",(senderData.length*50))
    res.json({"Info":"Data Acquired","Email Data":emailData.length,"Sender Data":senderData.length,"Email can be sent":(senderData.length*50)});
 }
 

 module.exports.startBot = ()=>{
     console.log("Mailer Bot is active Now");
 }