const fs = require('fs');
const axios = require('axios');

var senderCount = 0;
var templateCount = 0;
var listCount = 0;
var dataQueueCount = 0;


const regex = new RegExp('@gmail.com');  
// const data = JSON.parse(fs.readFileSync(`${__dirname}/json/sender.json`));

const data = JSON.parse(fs.readFileSync(`./json/sender.json`));   //sender json file 
const templateData = JSON.parse(fs.readFileSync(`./json/templates.json`));  //template file
var emailData = JSON.parse(fs.readFileSync(`./json/list.json`));  //email list
var dataQueue = JSON.parse(fs.readFileSync(`./json/dataQueue.json`));




const errors = require('./error');    //central error files 
const status = require('./status');   //central status file
const node = require('./nodemailer') //it will start mailing


exports.data = data;   //exporting the sender data 
exports.templateData = templateData;
exports.emailData = emailData;


//This module is used to fetch and store sender information
module.exports.senderFetch = (req,res)=> {
 
    if(!req.query.data || !req.query.src){
      
      res.json({"code":0,"message":"data or src params are not set"});
    }else {
      console.log(req.query.data,req.query.src);
      axios.get(req.query.src)
      .then(function (response) {
        // handle success 
         const dataLog = response.data;
             try {
              dataLog.forEach((x) =>{
                if(x.user && x.password){
                  if((x.user)){
                    senderCount++
                  
                   data.push(x);
                   fs.writeFile(`./json/sender.json`,JSON.stringify(data),error => console.log(error));
                  }else {
                    // console.log(x.user,'is not a gmail id');
                  }
               }else {
                //  console.log(i,"user id or password is empty");
               }
              });
            
             } catch (error) {
               console.log("Error occured while reading json data, check again")
               errors.write("Error occured while reading Sender json data, check again");
             }

            
          if(senderCount>0){
            res.json({"code":1,"message":"sender data received"});
            status.writeStatus("sender data received");
          } else {
            res.json({"code":0,"message":"sender data missing"})
          } 
            
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
        
      });
      
    }


}


// Template Fetch 

module.exports.templateFetch = (req,res)=> {
       
    if(!req.query.data || !req.query.src){
      res.json({"code":0,"message":"data or src params are not set"});
    }
    else {
      console.log(req.query.data,req.query.src);
      axios.get(req.query.src)
      .then(function (response) {
        // handle success 
         const dataLog = response.data;
             try {
              dataLog.forEach((x) =>{
                if(x.template){
                   templateCount++;
                   templateData.push(x);
                   fs.writeFile(`./json/templates.json`,JSON.stringify(templateData),error => console.log(error));
               }else {
                //  console.log(i,"user id or password is empty");
               }
              });
            
             } catch (error) {
               console.log("Error occured while reading json data, check again");
               errors.write("Error occured while reading Sender json data, check again");
             }
  
            
          if(templateCount>0){
            res.json({"code":1,"message":"Template List data received"});
            status.writeStatus("Template List data received");
          } else {
            res.json({"code":0,"message":"Template List data missing"});
          } 
           
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
       
      });
  
    }
  
    }
  
    //Email List fetch 

    module.exports.emailFetch = (req,res)=> {
        if(!req.query.data || !req.query.src){
          res.json({"code":0,"message":"data or src params are not set"});
        }else {
          console.log(req.query.data,req.query.src);
          axios.get(req.query.src)
          .then(function (response) {
            // handle success 
             const dataLog = response.data;
      
                 try {
                       dataLog.forEach(x=>{

                           if(x.fname && x.lname && x.email){
                          
                            listCount++;
                           
                             var newEmail = {'email':x.email,'fname':x.fname,'lname':x.lname};

                              emailData.push(newEmail);
                           }
                           
                       })
                 } catch (error) {
                   console.log(error);
                   console.log("Error occured while reading EmailList json data, check again");
                   errors.write("Error occured while reading EmailList json data, check again");
                 }
                 fs.writeFile(`./json/list.json`,JSON.stringify(emailData),error => console.log(error));
                
              if(listCount>0){
                res.json({"code":1,"message":"Email List data received"});
                status.writeStatus("Email List data received");
                listCount =0;
              } else {
                res.json({"code":0,"message":"Email List data missing"});
              } 
                
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
          .then(function () {
            // always executed
           
          });
      
        }
      }
    
      // this will trigger from start.js
      module.exports.statcheck =(req,res)=>{
        var senderL = data.length>0?'ok':'no senders';
        var emailL = emailData.length>0?'ok':'no email list';
        var templateL = templateData.length>0?'ok':'no Template Data';
        var resultSET; var text; 
         
        console.log("Eamil data:",emailData.length);


    if(data.length>0 && emailData.length>0 && templateData.length>0){
        text = "Email Bot can begin";
        resultSET = 'ok';
    } else {
        text = "all info not available";
        resultSET = 'error';
    }


console.log("Eamil data:",emailData.length);
        console.log(req.query.mailer);
        if(req.query.mailer == 'active'){
    
            console.log("activate the mailer");
             if(resultSET== 'ok'){
                var response = {"senders":senderL,"email-List":emailL,"Template List":templateL,"status":resultSET,"message":"Mailer Bot will start Shortly"};
                startMailer2();
                res.json(response)
     
             }else {
                var response = {"senders":senderL,"email-List":emailL,"Template List":templateL,"status":resultSET,"message":text};
                emailData.forEach(x => console.log(x[fname]));
                res.json(response)
                  
             }
        
        }else {
            var response = {"senders":senderL,"email-List":emailL,"Template List":templateL,"status":resultSET,"message":text};
            emailData.forEach(x => console.log(x['fname'],x['lname'],x['email']));
            res.json(response)
        }
         
       
    }     

    //start.js functions to start mailing
    var senderDataLenght = data.length;
    var templateDataLength = templateData.length;
    var emailDataLength = emailData.length;
    var tcount = 0;
    var randomTemplate = () => {
       if(templateData.length == 1){
         tcount+1;
       }else if(templateData.length==2){
           if(tcount !=1){
             tcount =1;
           }else if(tcount == 1){
             tcount = 2;
           }
       }else if(templateData.length >2){
        if(tcount <1){
          tcount++;
          
        }else if(tcount>=1 && tcount<=(templateData.length-1)){
            tcount++;
            
        }else if(tcount == templateData.length){
            tcount = 1;
            
        }
       }
       return tcount-1;
    }
    

  module.exports.mailAddressSender = ()=>{
           
             
            console.log("Senders :",senderDataLenght,"Template:",templateDataLength,"Email Data Length:",emailDataLength,"Random Template:",randomTemplate);
           
            
    }

    var min_mail = 0;
    var max_mail = 49;
    var i =0;
    var j = 0;
    var vv = 0;

     function startMailer1(data,xyz){
      setTimeout(()=>{
        
        //console.log(data[xyz].sender,data[xyz].pass,data[xyz].fname,data[xyz].lname,data[xyz].email,templateData[randomTemplate()]);
        node.main(data[xyz].sender,data[xyz].pass,data[xyz].fname,data[xyz].lname,data[xyz].email,templateData[randomTemplate()]);
        // console.log("Tempate Data:",templateData[randomTemplate()]);
        if(data[xyz+1]){
          startMailer1(data,xyz+1)
        }else {
          status.writeStatus(`All Message delivered. please check status for more information`);
        }
      },5000)
       
     } 




    function startMailer2 (){
        
        data.forEach(x=>{
            for(j=min_mail;j<=max_mail;j++){
              let sender = x.user;
              let pass = x.password;
              let currEmail = emailData[vv]?emailData[vv]:"";
              let fname = currEmail['fname']?currEmail['fname']:"Amber";
              let lname = currEmail['lname']?currEmail['lname']:"McDermott"; 
              let email = currEmail['email']?currEmail['email']:"amber.mcdermott95@ethereal.email"; 
              var newQueue = {"sender":sender,"pass":pass,"fname":fname,"lname":lname,"email":email};
              dataQueue.push(newQueue);
              vv++;
            } 
        })
        fs.writeFile(`./json/dataQueue.json`,JSON.stringify(dataQueue),error => console.log(error));
        startMailer1(dataQueue,0);
    }
     

   