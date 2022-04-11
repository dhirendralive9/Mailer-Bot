const fs = require('fs');

const senderData = JSON.parse(fs.readFileSync(`./json/sender.json`)); 
const emailData =  JSON.parse(fs.readFileSync(`./json/list.json`));
const templateData = JSON.parse(fs.readFileSync(`./json/templates.json`));
const statusData = JSON.parse(fs.readFileSync(`./json/status.json`));
const errorData = JSON.parse(fs.readFileSync(`./json/errors.json`));

var senderL = senderData.length>0?'ok':'no senders';
var emailL = emailData.length>0?'ok':'no email list';
var templateL = templateData.length>0?'ok':'no Template Data';
var resultSET; var text; 

    if(senderData.length>0 && emailData.length>0 && templateData.length>0){
        text = "Email Bot can begin";
        resultSET = 'ok';
    } else {
        text = "all info not available";
        resultSET = 'error';
    }


console.log("Eamil data:",emailData.length);

statcheck =(req,res)=>{
    console.log(req.query.mailer);
    if(req.query.mailer == 'active'){

        console.log("activate the mailer");
         if(resultSET== 'ok'){
            var response = {"senders":senderL,"email-List":emailL,"Template List":templateL,"status":resultSET,"message":"Mailer Bot will start Shortly"}
            res.json(response)
 
         }else {
            var response = {"senders":senderL,"email-List":emailL,"Template List":templateL,"status":resultSET,"message":text}
            res.json(response)
              
         }
    
    }else {
        var response = {"senders":senderL,"email-List":emailL,"Template List":templateL,"status":resultSET,"message":text}
        res.json(response)
    }
     
   
}



module.exports.process = (req,res)=>{
    statcheck(req,res);
}