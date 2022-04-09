const fs = require('fs');
const axios = require('axios');

// const data = JSON.parse(fs.readFileSync(`${__dirname}/json/sender.json`));
const data = JSON.parse(fs.readFileSync(`./json/templates.json`));

templateFetch = (req,res)=> {
    console.log(req.query.data,req.query.src);
    axios.get(req.query.src)
    .then(function (response) {
      // handle success
      data.push(response.data);
      fs.writeFile(`./json/templates.json`,JSON.stringify(data),error => console.log(error));
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
     
    });
    res.json({"code":1,"message":"Template2 Data has been recieved"});
  }

module.exports.copy = (req,res)=>{
    if(data.length <4){
       templateFetch(req,res)
    } else if(data.length >=4){
        res.json({"code":0,"message":"Required Template data is already recieved"});
    }
   
}
