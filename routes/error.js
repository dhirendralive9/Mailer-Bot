const fs = require('fs');
const axios = require('axios');
var ip;
const errorData = JSON.parse(fs.readFileSync(`./json/errors.json`));

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

module.exports.sender = (req,res)=>{
    res.json({...errorData});
}



module.exports.write = (err)=>{
   var id = errorData.length;
   var newError = {"id":id,"server":ip,"status":"error","error":err};
   errorData.push(newError);
   fs.writeFile(`./json/errors.json`,JSON.stringify(errorData),error => console.log(error));
}