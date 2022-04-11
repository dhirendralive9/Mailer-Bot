const fs = require('fs');
const axios = require('axios');
var listCount = 0;
const errors = require('./error');
const status = require('./status');

const emailData = JSON.parse(fs.readFileSync(`./json/list.json`));

emailFetch = (req,res)=> {
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
              if(x.Email){
                if(regex.test(x.Email)){
                  listCount++ ;
                
                  emailData.push(x);
                }else {
                  // console.log(x.user,'is not a gmail id');
                }
             }else {
              //  console.log(i,"user id or password is empty");
             }
            });
          
           } catch (error) {
             console.log("Error occured while reading EmailList json data, check again");
             errors.write("Error occured while reading EmailList json data, check again");
           }

          
        if(listCount>0){
          res.json({"code":1,"message":"Email List data received"});
          status.write("Email List data received");
        } else {
          res.json({"code":0,"message":"Email List data missing"});
        } 
           fs.writeFile(`./json/list.json`,JSON.stringify(emailData),error => console.log(error));
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

module.exports.email = (req,res)=> {
    if(emailData.length>=1999){
        res.json({"code":0,"message":"Required Sender data is already recieved"})
    }else {
        emailFetch(req,res);
    }
}