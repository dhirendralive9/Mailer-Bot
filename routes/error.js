const fs = require('fs');

const data = JSON.parse(fs.readFileSync(`./json/errors.json`));


module.exports.sender = (req,res)=>{
    res.json({...data});
}
