const fs = require('fs');
const axios = require('axios');

const data = JSON.parse(fs.readFileSync(`./json/list.json`));

emailFetch = (req,res)=> {
    console.log(req.query.data,req.query.src);
    axios.get(req.query.src)
    .then(function (response) {
      // handle success
      data.push(response.data);
      fs.writeFile(`./json/list.json`,JSON.stringify(data),error => console.log(error));
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
     
    });
    res.json({"code":1,"message":"Email Data has been recieved"});
  }

module.exports.email = (req,res)=>{
    if(data.length <1999){
        emailFetch(req,res)
    } else if(data.length >=1999){
        res.json({"code":0,"message":"Required Email data is already recieved"});
    }
   
}

