const fs = require('fs');

const data = JSON.parse(fs.readFileSync(`./json/status.json`));


module.exports.check = (req,res)=>{
    res.json(...data);
}