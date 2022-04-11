const fs = require('fs');
const axios = require('axios');
var templateCount = 0;
// const data = JSON.parse(fs.readFileSync(`${__dirname}/json/sender.json`));
const data = JSON.parse(fs.readFileSync(`./json/templates.json`));
const errors = require('./error');
const status = require('./status');



templateFetch = (req,res)=> {
       
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
                 data.push(x);
               
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
          status.write("Template List data received");
        } else {
          res.json({"code":0,"message":"Template List data missing"});
        } 
           fs.writeFile(`./json/templates.json`,JSON.stringify(data),error => console.log(error));
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

module.exports.copy = (req,res)=>{
    if(data.length <4){
       templateFetch(req,res)
    } else if(data.length >=4){
        res.json({"code":0,"message":"Required Template data is already recieved"});
    }
   
}
