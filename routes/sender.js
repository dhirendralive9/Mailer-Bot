const fs = require('fs');
const axios = require('axios');
var ip;
// const data = JSON.parse(fs.readFileSync(`${__dirname}/json/sender.json`));
const data = JSON.parse(fs.readFileSync(`./json/sender.json`));
const error_data = JSON.parse(fs.readFileSync(`./json/errors.json`));

axios.get('https://api.ipify.org?format=json')
  .then(function (response) {
    // handle success
    
    ip = response.data.ip;
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
    console.log(`Ip address is ${ip}`)
  });

senderFetch = (req,res)=> {
  console.log(req.query.data,req.query.src);
  axios.get(req.query.src)
  .then(function (response) {
    // handle success 
    
    data.push(response.data);
    fs.writeFile(`./json/sender.json`,JSON.stringify(data),error => console.log(error));
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
    console.log(`Ip address is ${ip}`)
  });
  res.json({"code":1,"message":"Sender Data has been recieved"});
}


 
module.exports.sender = (req,res)=>{
    if(data.length <49){
       senderFetch(req,res)
    } else if(data.length >=49){
      res.json({"code":0,"message":"Required Sender data is already recieved"});
    }
   
}
