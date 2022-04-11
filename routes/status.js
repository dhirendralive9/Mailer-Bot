const fs = require('fs');
const axios = require('axios');
var ip;

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
    
  });


const statusData = JSON.parse(fs.readFileSync(`./json/status.json`));

module.exports.writeStatus = (dta)=>{
   var id = statusData.length;
   var newStatus = {"id":id,"server":ip,"status":"info","message":dta};
   statusData.push(newStatus);
   fs.writeFile(`./json/status.json`,JSON.stringify(statusData),error => console.log(error));
}


module.exports.check = (req,res)=>{
    res.json(...statusData);
}