const fs = require('fs');

const data = [];

module.exports.installer = (req,res)=>{
    res.json({"status":"all json files created."});
    fs.writeFile(`./json/sender.json`,JSON.stringify(data),error => console.log(error));
    fs.writeFile(`./json/list.json`,JSON.stringify(data),error => console.log(error));
    fs.writeFile(`./json/templates.json`,JSON.stringify(data),error => console.log(error));
    fs.writeFile(`./json/status.json`,JSON.stringify(data),error => console.log(error));
    fs.writeFile(`./json/errors.json`,JSON.stringify(data),error => console.log(error));
}