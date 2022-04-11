const fs = require('fs');
const axios = require('axios');

var senderCount = 0;
var templateCount = 0;
var listCount = 0;



const regex = new RegExp('@gmail.com');  
// const data = JSON.parse(fs.readFileSync(`${__dirname}/json/sender.json`));

const data = JSON.parse(fs.readFileSync(`./json/sender.json`));   //sender json file 
const templateData = JSON.parse(fs.readFileSync(`./json/templates.json`));  //template file
var emailData = JSON.parse(fs.readFileSync(`./json/list.json`));  //email list





const errors = require('./error');    //central error files 
const status = require('./status');   //central status file

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
                  if(regex.test(x.user)){
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
                         console.log(x.email);
                             listCount++;
                            
                              var newEmail = {'email':x.email};
                               emailData.push(newEmail);
                            
                             
                        //  }
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
      