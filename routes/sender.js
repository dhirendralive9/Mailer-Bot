const fs = require('fs');
const axios = require('axios');

var senderCount = 0;
const regex = new RegExp('@gmail.com');
// const data = JSON.parse(fs.readFileSync(`${__dirname}/json/sender.json`));
const data = JSON.parse(fs.readFileSync(`./json/sender.json`));
const errors = require('./error');



senderFetch = (req,res)=> {
 
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
          } else {
            res.json({"code":0,"message":"sender data missing"})
          } 
             fs.writeFile(`./json/sender.json`,JSON.stringify(data),error => console.log(error));
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


 
module.exports.sender = (req,res)=>{
    if(data.length <49){
       senderFetch(req,res)
    } else if(data.length >=49){
      res.json({"code":0,"message":"Required Sender data is already recieved"});
    }
   
}
