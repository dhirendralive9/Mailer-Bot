const fs = require('fs');
const axios = require('axios');
var ip;

const statusData = JSON.parse(fs.readFileSync(`./json/status.json`));

const process = require('./process');

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


   




logSender = (logData)=>{
  if(process.pData){
    if(process.pData.status == 'active' && process.pData.link ){
      console.log(`Log data will be send on this address ${process.pData.link}`)
      axios.get(`${process.pData.link}/logger?id=${logData.id}&ip=${logData.ip}&status=${logData.status}&message=${logData.message}`)
           .then((res)=>{
             console.log(res.json());
           })
           .catch((error)=>{
             console.log(error);
             //error handling 
           })
           .then(()=>{
            //  always execute
           })
     //  here we will implement a axios to send the logs data 
    }
  }
}


module.exports.writeStatus = (dta)=>{
   var id = statusData.length;
   var newStatus = {"id":id,"server":ip,"status":"info","message":dta};
   console.log(newStatus);
   statusData.push(newStatus);
   fs.writeFile(`./json/status.json`,JSON.stringify(statusData),error => console.log(error));
}


module.exports.check = (req,res)=>{
    res.json(statusData);
}