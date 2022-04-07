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

 
module.exports.sender = (req,res)=>{
    if(data.length <49){
        res.json({"status":"success","id":data.length,"message":"data received"});
        console.log(req.query,data.length);
        const newId = data.length;
        var newData = Object.assign({id:newId}, req.query);
        data.push(newData);
        fs.writeFile(`./json/sender.json`,JSON.stringify(data),error => console.log(error));
    } else if(data.length >=49){
        res.json({"status":"error","id":data.length,"message":"limit reached"});
        var error_report = {"status":"error","ip":ip,"id":data.length,"message":"limit reached"};
        error_data.push(error_report);
        fs.writeFile(`./json/errors.json`,JSON.stringify(data),error => console.log(error));
    }
   
}
